package com.mobilegaming.domain;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.stream.*;
@RestControllerAdvice
class ApiErrors {
 @ExceptionHandler(NoSuchElementException.class)
 ResponseEntity<Map<String,String>> notFound(NoSuchElementException e){
  return ResponseEntity.status(404).body(Map.of("error",e.getMessage()));
 }
 @ExceptionHandler(IllegalArgumentException.class)
 ResponseEntity<Map<String,String>> bad(IllegalArgumentException e){
  return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));
 }
 @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
 ResponseEntity<Map<String,String>> handleValidation(org.springframework.web.bind.MethodArgumentNotValidException e){
  String msg = e.getBindingResult().getFieldErrors().stream()
          .map(f -> {
           if ("password".equals(f.getField())) {
            return "Password must be at least 8 characters and include uppercase, lowercase, a digit, and a special character (e.g. Mukesh@2026).";
           }
           if ("username".equals(f.getField())) {
            return "Username must be 3-20 alphanumeric characters or underscores.";
           }
           return f.getField() + ": " + (f.getDefaultMessage() != null ? f.getDefaultMessage() : "invalid");
          })
          .collect(Collectors.joining("; "));
  return ResponseEntity.badRequest().body(Map.of("error", msg.isEmpty() ? "Validation failed" : msg));
 }
}
@RestController
@RequestMapping("/auth")
class AuthController {
 private final UserRepository users;
 private final RefreshTokenRepository tokens;
 private final PasswordEncoder encoder;
 private final JwtService jwt;
 private final AuditRepository audits;
 AuthController(UserRepository u,RefreshTokenRepository t,PasswordEncoder e,JwtService j,AuditRepository a){
  users=u;
  tokens=t;
  encoder=e;
  jwt=j;
  audits=a;
 }
 @PostMapping("/register")
 @Transactional
 ResponseEntity register(@Valid @RequestBody RegisterRequest r){
  if(users.existsByUsername(r.username())||users.existsByEmail(r.email())) throw new IllegalArgumentException("Username or email already exists");
  if(Period.between(r.dateOfBirth(),LocalDate.now()).getYears()<13&&!r.parentalConsent()) throw new IllegalArgumentException("Players under 13 require parental consent");
  User u=new User();
  u.username=r.username();
  u.email=r.email().toLowerCase();
  u.passwordHash=encoder.encode(r.password());
  u.dateOfBirth=r.dateOfBirth();
  u.country=r.country();
  u.parentalConsent=r.parentalConsent();
  u.privacyConsent=r.privacyConsent();
  u.marketingConsent=r.marketingConsent();
  u.firstName=r.firstName();
  u.lastName=r.lastName();
  users.save(u);
  audit(u.id,"REGISTER","USER",u.id,null);
  return ResponseEntity.status(201).body(issue(u,null));
 }
 @PostMapping("/login")
 @Transactional
 TokenResponse login(@Valid @RequestBody LoginRequest r){
  User u=users.findByUsernameOrEmail(r.credential(),r.credential()).orElseThrow(()->new IllegalArgumentException("Invalid credentials"));
  if(!u.active||u.banned||!encoder.matches(r.password(),u.passwordHash)) throw new IllegalArgumentException("Invalid credentials");
  u.lastLogin=Instant.now();
  users.save(u);
  audit(u.id,"LOGIN","USER",u.id,null);
  return issue(u,r.deviceInfo());
 }
 @PostMapping("/refresh")
 TokenResponse refresh(@Valid @RequestBody RefreshRequest r){
  RefreshToken t=tokens.findByTokenAndActiveTrue(r.refreshToken()).orElseThrow(()->new IllegalArgumentException("Invalid refresh token"));
  if(t.expiryDate.isBefore(Instant.now())) throw new IllegalArgumentException("Refresh token expired");
  return issue(users.findById(t.userId).orElseThrow(),t.deviceInfo);
 }
 @PostMapping("/logout")
 @ResponseStatus(HttpStatus.NO_CONTENT)
 void logout(@Valid @RequestBody RefreshRequest r){
  tokens.findByTokenAndActiveTrue(r.refreshToken()).ifPresent(t->{t.active=false;tokens.save(t);});
 }
 @PutMapping("/password-reset")
 @ResponseStatus(HttpStatus.NO_CONTENT)
 void reset(@Valid @RequestBody PasswordResetRequest r){
  User u=users.findByUsernameOrEmail(r.email(),r.email()).orElseThrow(()->new IllegalArgumentException("Account not found"));
  u.passwordHash=encoder.encode(r.newPassword());
  users.save(u);
 }
 private TokenResponse issue(User u,String device){
  RefreshToken t=new RefreshToken();
  t.userId=u.id;
  t.token=UUID.randomUUID()+"."+UUID.randomUUID();
  t.deviceInfo=device;
  t.expiryDate=Instant.now().plus(u.role==Role.PLAYER?7:30,java.time.temporal.ChronoUnit.DAYS);
  tokens.save(t);
  return new TokenResponse(jwt.create(u),t.token,"Bearer",u.role);
 }
 private void audit(UUID uid,String action,String type,UUID id,String val){
  AuditLog a=new AuditLog();
  a.userId=uid;
  a.action=action;
  a.entityType=type;
  a.entityId=id;
  a.newValue=val;
  audits.save(a);
 }
}
@RestController
@RequestMapping("/users")
class UserController {
 private final UserRepository users;
 private final NotificationRepository notes;
 UserController(UserRepository u,NotificationRepository n){
  users=u;
  notes=n;
 }
 private User me(){
  return users.findById(UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName())).orElseThrow(()->new NoSuchElementException("User not found"));
 }
 @GetMapping("/profile")
 User profile(){
  return me();
 }
 @PutMapping("/profile")
 User update(@RequestBody Map<String,Object> body){
  User u=me();
  Optional.ofNullable((String)body.get("firstName")).ifPresent(v->u.firstName=v);
  Optional.ofNullable((String)body.get("lastName")).ifPresent(v->u.lastName=v);
  Optional.ofNullable((String)body.get("country")).ifPresent(v->u.country=v);
  if(body.containsKey("privacyConsent"))u.privacyConsent=(Boolean)body.get("privacyConsent");
  if(body.containsKey("marketingConsent"))u.marketingConsent=(Boolean)body.get("marketingConsent");
  return users.save(u);
 }
 @GetMapping("/me/export")
 Map<String,Object> export(){
  User u=me();
  return Map.of("user",u,"notifications",notes.findByUserIdOrderByCreatedDateDesc(u.id));
 }
 @DeleteMapping("/me")
 @ResponseStatus(HttpStatus.NO_CONTENT)
 void erase(){
  User u=me();
  u.active=false;
  u.email="deleted-"+u.id+"@privacy.invalid";
  u.username="deleted_"+u.id.toString().substring(0,8);
  users.save(u);
 }
}
@RestController
@RequestMapping("/games")
class GameController {
 private final GameRepository games;
 private final ContentRepository content;
 GameController(GameRepository g,ContentRepository c){
  games=g;
  content=c;
 }
 @GetMapping
 List list(){
  return games.findAll();
 }
 @GetMapping("/{id}")
 Game one(@PathVariable UUID id){
  return games.findById(id).orElseThrow(()->new NoSuchElementException("Game not found"));
 }
 @PostMapping
 @PreAuthorize("hasAnyRole('GAME_DEVELOPER','ADMIN')")
 ResponseEntity create(@Valid @RequestBody GameRequest r){
  Game g=map(new Game(),r);
  return ResponseEntity.status(201).body(games.save(g));
 }
 @PutMapping("/{id}")
 @PreAuthorize("hasAnyRole('GAME_DEVELOPER','ADMIN')")
 Game update(@PathVariable UUID id,@Valid @RequestBody GameRequest r){
  return games.save(map(one(id),r));
 }
 @PostMapping("/{id}/version")
 @PreAuthorize("hasAnyRole('GAME_DEVELOPER','LIVE_OPS_MANAGER','ADMIN')")
 Game version(@PathVariable UUID id,@RequestBody Map<String,Object> b){
  Game g=one(id);
  g.version=(String)b.get("version");
  g.buildNumber=(Integer)b.getOrDefault("buildNumber",g.buildNumber);
  g.releaseDate=Instant.now();
  return games.save(g);
 }
 @GetMapping("/{id}/analytics")
 @PreAuthorize("hasAnyRole('DATA_ANALYST','GAME_DEVELOPER','LIVE_OPS_MANAGER','ADMIN')")
 Map<String,Object> analytics(@PathVariable UUID id){
  return Map.of("game",one(id),"contentCount",content.findByGameId(id).size());
 }
 @GetMapping("/{id}/content")
 List<GameContent> contents(@PathVariable UUID id){
  return content.findByGameId(id);
 }
 @PostMapping("/{id}/content")
 @PreAuthorize("hasAnyRole('GAME_DEVELOPER','LIVE_OPS_MANAGER','ADMIN')")
 GameContent addContent(@PathVariable UUID id,@Valid @RequestBody ContentRequest r){
  GameContent c=new GameContent();
  c.gameId=id;
  c.contentType=r.contentType();
  c.contentData=r.contentData();
  c.version=r.version();
  c.releaseDate=r.releaseDate();
  c.active=r.active();
  return content.save(c);
 }
 @PutMapping("/content/{contentId}")
 @PreAuthorize("hasAnyRole('GAME_DEVELOPER','LIVE_OPS_MANAGER','ADMIN')")
 GameContent updateContent(@PathVariable UUID contentId,@Valid @RequestBody ContentRequest r){
  GameContent c=content.findById(contentId).orElseThrow(()->new NoSuchElementException("Content not found"));
  c.contentType=r.contentType();
  c.contentData=r.contentData();
  c.version=r.version();
  c.active=r.active();
  return content.save(c);
 }
 private Game map(Game g,GameRequest r){
  g.gameName=r.gameName();
  g.gameType=r.gameType();
  g.description=r.description();
  g.version=r.version();
  g.buildNumber=r.buildNumber();
  g.status=r.status();
  g.configuration=r.configuration();
  g.minimumAge=r.minimumAge();
  return g;
 }
}