package com.mobilegaming.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;
@MappedSuperclass
abstract class IdEntity {
 @Id
 public UUID id=UUID.randomUUID();
}
@Entity
@Table(name="users")
class User extends IdEntity {
 public String username;
 public String email;
 @JsonIgnore
 @Column(name="password_hash")
 public String passwordHash;
 @Enumerated(EnumType.STRING)
 public Role role=Role.PLAYER;
 @Column(name="first_name")
 public String firstName;
 @Column(name="last_name")
 public String lastName;
 @Column(name="date_of_birth")
 public LocalDate dateOfBirth;
 public String country;
 @Column(name="parental_consent")
 public boolean parentalConsent;
 @Column(name="privacy_consent")
 public boolean privacyConsent;
 @Column(name="marketing_consent")
 public boolean marketingConsent;
 @Column(name="created_date")
 public Instant createdDate=Instant.now();
 @Column(name="last_login")
 public Instant lastLogin;
 @Column(name="is_active")
 public boolean active=true;
 @Column(name="is_banned")
 public boolean banned;
}
@Entity
@Table(name="games")
class Game extends IdEntity {
 @Column(name="game_name")
 public String gameName;
 @Column(name="game_type")
 public String gameType;
 @Column(columnDefinition="text")
 public String description;
 public String version;
 @Column(name="build_number")
 public int buildNumber;
 @Column(name="release_date")
 public Instant releaseDate;
 @Enumerated(EnumType.STRING)
 public GameStatus status;
 @Column(name="developer_id")
 public UUID developerId;
 @Column(columnDefinition="text")
 public String configuration;
 @Column(name="minimum_age")
 public int minimumAge;
 @Column(name="created_date")
 public Instant createdDate=Instant.now();
}
@Entity
@Table(name="players")
class Player extends IdEntity {
 @Column(name="user_id")
 public UUID userId;
 @Column(name="game_id")
 public UUID gameId;
 @Column(name="player_level")
 public int playerLevel=1;
 @Column(name="experience_points")
 public long experiencePoints;
 @Column(name="virtual_currency",columnDefinition="text")
 public String virtualCurrency="{}";
 @Column(name="first_play_date")
 public Instant firstPlayDate=Instant.now();
 @Column(name="last_play_date")
 public Instant lastPlayDate;
 @Column(name="total_play_time")
 public long totalPlayTime;
 @Column(name="total_sessions")
 public int totalSessions;
 @Column(name="is_active")
 public boolean active=true;
 @Column(name="player_segment")
 public String playerSegment;
 @Column(name="retention_day")
 public int retentionDay;
}
@Entity
@Table(name="game_sessions")
class GameSession extends IdEntity {
 @Column(name="player_id")
 public UUID playerId;
 @Column(name="game_id")
 public UUID gameId;
 @Column(name="session_start")
 public Instant sessionStart=Instant.now();
 @Column(name="session_end")
 public Instant sessionEnd;
 @Column(name="duration_seconds")
 public Integer durationSeconds;
 @Column(name="actions_performed")
 public int actionsPerformed;
 @Column(name="score_achieved")
 public long scoreAchieved;
 @Column(name="levels_completed")
 public int levelsCompleted;
 @Column(name="device_type")
 public String deviceType;
 @Column(name="device_os")
 public String deviceOs;
 @Column(name="app_version")
 public String appVersion;
}
@Entity
@Table(name="in_app_purchases")
class Purchase extends IdEntity {
 @Column(name="player_id")
 public UUID playerId;
 @Column(name="game_id")
 public UUID gameId;
 @Column(name="product_id")
 public String productId;
 @Column(name="product_name")
 public String productName;
 @Column(name="purchase_amount")
 public BigDecimal purchaseAmount;
 public String currency;
 @Column(name="transaction_id")
 public String transactionId;
 @Enumerated(EnumType.STRING)
 public Platform platform;
 @Column(name="transaction_date")
 public Instant transactionDate=Instant.now();
 @Enumerated(EnumType.STRING)
 public PurchaseStatus status=PurchaseStatus.PENDING;
 @Column(name="receipt_data",columnDefinition="text")
 public String receiptData;
}
@Entity
@Table(name="achievements")
class Achievement extends IdEntity {
 @Column(name="game_id")
 public UUID gameId;
 @Column(name="achievement_name")
 public String achievementName;
 @Column(columnDefinition="text")
 public String description;
 @Column(columnDefinition="text")
 public String conditions;
 @Column(name="reward_type")
 public String rewardType;
 @Column(name="reward_value")
 public long rewardValue;
}
@Entity
@Table(name="player_achievements")
class PlayerAchievement extends IdEntity {
 @Column(name="player_id")
 public UUID playerId;
 @Column(name="achievement_id")
 public UUID achievementId;
 @Column(name="unlocked_date")
 public Instant unlockedDate;
 public int progress;
}
@Entity
@Table(name="live_events")
class LiveEvent extends IdEntity {
 @Column(name="game_id")
 public UUID gameId;
 @Column(name="event_name")
 public String eventName;
 @Column(name="start_date")
 public Instant startDate;
 @Column(name="end_date")
 public Instant endDate;
 @Column(name="event_type")
 public String eventType;
 @Column(columnDefinition="text")
 public String configuration;
 @Column(name="is_active")
 public boolean active=true;
}
@Entity
@Table(name="game_content")
class GameContent extends IdEntity {
 @Column(name="game_id")
 public UUID gameId;
 @Column(name="content_type")
 public String contentType;
 @Column(name="content_data",columnDefinition="text")
 public String contentData;
 public String version;
 @Column(name="release_date")
 public Instant releaseDate;
 @Column(name="is_active")
 public boolean active;
}
@Entity
@Table(name="notifications")
class Notification extends IdEntity {
 @Column(name="user_id")
 public UUID userId;
 @Column(name="game_id")
 public UUID gameId;
 @Column(columnDefinition="text")
 public String message;
 public String type;
 @Column(name="is_read")
 public boolean read;
 @Column(name="created_date")
 public Instant createdDate=Instant.now();
 public String priority="NORMAL";
}
@Entity
@Table(name="social_connections")
class SocialConnection extends IdEntity {
 @Column(name="player_id")
 public UUID playerId;
 @Column(name="friend_id")
 public UUID friendId;
 @Column(name="connection_type")
 public String connectionType="FRIEND";
 @Column(name="connection_date")
 public Instant connectionDate=Instant.now();
 public String status="PENDING";
}
@Entity
@Table(name="leaderboards")
class Leaderboard extends IdEntity {
 @Column(name="game_id")
 public UUID gameId;
 @Column(name="leaderboard_type")
 public String leaderboardType;
 public String timeframe;
 @Column(name="player_rankings",columnDefinition="text")
 public String playerRankings="[]";
 @Column(name="last_updated")
 public Instant lastUpdated=Instant.now();
}
@Entity
@Table(name="refresh_tokens")
class RefreshToken extends IdEntity {
 @Column(name="user_id")
 public UUID userId;
 @Column(length=500)
 public String token;
 @Column(name="expiry_date")
 public Instant expiryDate;
 @Column(name="is_active")
 public boolean active=true;
 @Column(name="device_info")
 public String deviceInfo;
 @Column(name="created_date")
 public Instant createdDate=Instant.now();
}
@Entity
@Table(name="audit_logs")
class AuditLog extends IdEntity {
 @Column(name="user_id")
 public UUID userId;
 public String action;
 @Column(name="entity_type")
 public String entityType;
 @Column(name="entity_id")
 public UUID entityId;
 @Column(name="old_value",columnDefinition="text")
 public String oldValue;
 @Column(name="new_value",columnDefinition="text")
 public String newValue;
 public Instant timestamp=Instant.now();
 @Column(name="game_id")
 public UUID gameId;
}