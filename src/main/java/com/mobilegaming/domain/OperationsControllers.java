package com.mobilegaming.domain;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;
import java.util.stream.*;
@RestController
@RequestMapping("/notifications")
class NotificationController {
    final NotificationRepository notes;
    final UserRepository users;
    NotificationController(NotificationRepository n,UserRepository u){
        notes=n;
        users=u;
    }
    @GetMapping
    List<Notification> mine(){
        UUID id=UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
        return notes.findByUserIdOrderByCreatedDateDesc(id);
    }
    @PostMapping("/broadcast")
    @PreAuthorize("hasAnyRole('COMMUNITY_MANAGER','LIVE_OPS_MANAGER','ADMIN')")
    List<Notification> broadcast(@Valid @RequestBody NotificationRequest r){
        return users.findAll().stream().filter(u->u.active&&!u.banned).map(u->{
            Notification n=new Notification();
            n.userId=r.userId()==null?u.id:r.userId();
            n.gameId=r.gameId();
            n.message=r.message();
            n.type=r.type();
            n.priority=r.priority()==null?"NORMAL":r.priority();
            return notes.save(n);
        }).toList();
    }
    @PatchMapping("/{id}/read")
    Notification read(@PathVariable UUID id){
        Notification n=notes.findById(id).orElseThrow(()->new NoSuchElementException("Notification not found"));
        n.read=true;
        return notes.save(n);
    }
}
@RestController
@RequestMapping("/social")
class SocialController extends CurrentUser {
    final PlayerRepository players;
    final SocialRepository social;
    SocialController(UserRepository u,PlayerRepository p,SocialRepository s){
        super(u);
        players=p;
        social=s;
    }
    @PostMapping
    ResponseEntity<SocialConnection> connect(@RequestParam UUID gameId,@Valid @RequestBody SocialRequest r){
        Player p=players.findByUserIdAndGameId(me().id,gameId).orElseThrow(()->new IllegalArgumentException("Player profile required"));
        SocialConnection s=new SocialConnection();
        s.playerId=p.id;
        s.friendId=r.friendId();
        s.connectionType=r.connectionType()==null?"FRIEND":r.connectionType();
        s.status=r.status()==null?"PENDING":r.status();
        return ResponseEntity.status(201).body(social.save(s));
    }
    @PatchMapping("/{id}")
    SocialConnection update(@PathVariable UUID id,@RequestParam String status){
        SocialConnection s=social.findById(id).orElseThrow(()->new NoSuchElementException("Connection not found"));
        s.status=status;
        return social.save(s);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void remove(@PathVariable UUID id){
        social.deleteById(id);
    }
}
@RestController
@RequestMapping("/leaderboards")
class LeaderboardController {
    final LeaderboardRepository boards;
    LeaderboardController(LeaderboardRepository b){
        boards=b;
    }
    @GetMapping("/{gameId}")
    List<Leaderboard> byGame(@PathVariable UUID gameId){
        return boards.findByGameId(gameId);
    }
    @PostMapping
    @PreAuthorize("hasAnyRole('GAME_DEVELOPER','LIVE_OPS_MANAGER','ADMIN')")
    ResponseEntity<Leaderboard> create(@RequestBody Leaderboard b){
        b.id=UUID.randomUUID();
        b.lastUpdated=Instant.now();
        return ResponseEntity.status(201).body(boards.save(b));
    }
}
@RestController
@RequestMapping("/games/{gameId}/achievements")
class AchievementController {
    final AchievementRepository achievements;
    AchievementController(AchievementRepository a){
        achievements=a;
    }
    @GetMapping
    List<Achievement> list(@PathVariable UUID gameId){
        return achievements.findByGameId(gameId);
    }
    @PostMapping
    @PreAuthorize("hasAnyRole('GAME_DEVELOPER','LIVE_OPS_MANAGER','ADMIN')")
    ResponseEntity<Achievement> create(@PathVariable UUID gameId,@Valid @RequestBody AchievementRequest r){
        Achievement a=new Achievement();
        a.gameId=gameId;
        a.achievementName=r.achievementName();
        a.description=r.description();
        a.conditions=r.conditions();
        a.rewardType=r.rewardType();
        a.rewardValue=r.rewardValue();
        return ResponseEntity.status(201).body(achievements.save(a));
    }
}
@RestController
@RequestMapping("/analytics")
class AnalyticsController {
    final PlayerRepository players;
    final PurchaseRepository purchases;
    final GameRepository games;
    AnalyticsController(PlayerRepository p,PurchaseRepository q,GameRepository g){
        players=p;
        purchases=q;
        games=g;
    }
    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('DATA_ANALYST','GAME_DEVELOPER','LIVE_OPS_MANAGER','ADMIN')")
    Map<String,Object> dashboard(){
        return Map.of("games",games.count(),"players",players.count(),"purchases",purchases.count(),"generatedAt",Instant.now());
    }
    @GetMapping("/players/{gameId}")
    @PreAuthorize("hasAnyRole('DATA_ANALYST','GAME_DEVELOPER','LIVE_OPS_MANAGER','ADMIN')")
    Map<String,Object> playerAnalytics(@PathVariable UUID gameId){
        List<Player> p=players.findByGameId(gameId);
        return Map.of("gameId",gameId,"players",p.size(),"averageLevel",p.stream().mapToInt(x->x.playerLevel).average().orElse(0),"totalPlaySeconds",p.stream().mapToLong(x->x.totalPlayTime).sum());
    }
    @GetMapping("/revenue/{gameId}")
    @PreAuthorize("hasAnyRole('DATA_ANALYST','LIVE_OPS_MANAGER','ADMIN')")
    Map<String,Object> revenue(@PathVariable UUID gameId){
        List<Purchase> p=purchases.findByGameId(gameId);
        BigDecimal total=p.stream().filter(x->x.status==PurchaseStatus.COMPLETED).map(x->x.purchaseAmount).reduce(BigDecimal.ZERO,BigDecimal::add);
        return Map.of("gameId",gameId,"transactions",p.size(),"completedRevenue",total);
    }
    @PostMapping("/custom-report")
    @PreAuthorize("hasAnyRole('DATA_ANALYST','ADMIN')")
    Map<String,Object> custom(@RequestBody Map<String,Object> spec){
        return Map.of("specification",spec,"status","QUEUED","generatedAt",Instant.now());
    }
}
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
class AdminController {
    final UserRepository users;
    final AuditRepository audits;
    AdminController(UserRepository u,AuditRepository a){
        users=u;
        audits=a;
    }
    @GetMapping("/users")
    List<User> users(){
        return users.findAll();
    }
    @PatchMapping("/users/{id}/role")
    User role(@PathVariable UUID id,@RequestParam Role role){
        User u=users.findById(id).orElseThrow(()->new NoSuchElementException("User not found"));
        u.role=role;
        return users.save(u);
    }
    @PatchMapping("/users/{id}/ban")
    User ban(@PathVariable UUID id,@RequestParam boolean banned){
        User u=users.findById(id).orElseThrow(()->new NoSuchElementException("User not found"));
        u.banned=banned;
        return users.save(u);
    }
    @GetMapping("/audit-logs")
    List<AuditLog> audit(){
        return audits.findAll();
    }
}
