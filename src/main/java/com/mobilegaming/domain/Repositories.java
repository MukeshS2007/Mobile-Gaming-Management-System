package com.mobilegaming.domain;
import org.springframework.data.jpa.repository.*;
import java.util.*;
interface UserRepository extends JpaRepository<User,UUID> {
    Optional<User> findByUsernameOrEmail(String username,String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
interface GameRepository extends JpaRepository<Game,UUID> {
}
interface PlayerRepository extends JpaRepository<Player,UUID> {
    Optional<Player> findByUserIdAndGameId(UUID userId,UUID gameId);
    List<Player> findByGameId(UUID gameId);
}
interface SessionRepository extends JpaRepository<GameSession,UUID> {
    List<GameSession> findByPlayerIdOrderBySessionStartDesc(UUID playerId);
}
interface PurchaseRepository extends JpaRepository<Purchase,UUID> {
    List<Purchase> findByPlayerIdOrderByTransactionDateDesc(UUID playerId);
    List<Purchase> findByGameId(UUID gameId);
}
interface AchievementRepository extends JpaRepository<Achievement,UUID> {
    List<Achievement> findByGameId(UUID gameId);
}
interface PlayerAchievementRepository extends JpaRepository<PlayerAchievement,UUID> {
    List<PlayerAchievement> findByPlayerId(UUID playerId);
    Optional<PlayerAchievement> findByPlayerIdAndAchievementId(UUID playerId,UUID achievementId);
}
interface EventRepository extends JpaRepository<LiveEvent,UUID> {
    List<LiveEvent> findByActiveTrue();
}
interface ContentRepository extends JpaRepository<GameContent,UUID> {
    List<GameContent> findByGameId(UUID gameId);
}
interface NotificationRepository extends JpaRepository<Notification,UUID> {
    List<Notification> findByUserIdOrderByCreatedDateDesc(UUID userId);
}
interface SocialRepository extends JpaRepository<SocialConnection,UUID> {
    List<SocialConnection> findByPlayerId(UUID playerId);
}
interface LeaderboardRepository extends JpaRepository<Leaderboard,UUID> {
    List<Leaderboard> findByGameId(UUID gameId);
}
interface RefreshTokenRepository extends JpaRepository<RefreshToken,UUID> {
    Optional<RefreshToken> findByTokenAndActiveTrue(String token);
}
interface AuditRepository extends JpaRepository<AuditLog,UUID> {
}
