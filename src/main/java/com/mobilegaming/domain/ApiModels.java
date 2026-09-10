package com.mobilegaming.domain;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;
record RegisterRequest(@NotBlank @Pattern(regexp="^[A-Za-z0-9_]{3,20}$") String username,@NotBlank @Email String email,@NotBlank @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$") String password,@NotNull @Past LocalDate dateOfBirth,String country,boolean parentalConsent,boolean privacyConsent,boolean marketingConsent,String firstName,String lastName) {}
record LoginRequest(@NotBlank String credential,@NotBlank String password,String deviceInfo) {}
record TokenResponse(String accessToken,String refreshToken,String tokenType,Role role) {}
record RefreshRequest(@NotBlank String refreshToken) {}
record PasswordResetRequest(@NotBlank String email,@NotBlank @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$") String newPassword) {}
record GameRequest(@NotBlank @Size(min=3,max=100) String gameName,@NotBlank String gameType,String description,@NotBlank String version,@PositiveOrZero int buildNumber,GameStatus status,String configuration,@PositiveOrZero int minimumAge) {}
record ProgressRequest(@Positive int playerLevel,@PositiveOrZero long experiencePoints,String virtualCurrency,String playerSegment) {}
record SessionStartRequest(@NotNull UUID gameId,String deviceType,String deviceOs,String appVersion) {}
record SessionUpdateRequest(@PositiveOrZero int actionsPerformed,@PositiveOrZero long scoreAchieved,@PositiveOrZero int levelsCompleted) {}
record PurchaseRequest(@NotNull UUID gameId,@NotBlank String productId,@NotBlank String productName,@NotNull @DecimalMin("0.01") BigDecimal purchaseAmount,@NotBlank @Pattern(regexp="^[A-Z]{3}$") String currency,@NotNull Platform platform,String receiptData) {}
record EventRequest(@NotNull UUID gameId,@NotBlank String eventName,@NotNull Instant startDate,@NotNull Instant endDate,@NotBlank String eventType,String configuration,boolean active) {}
record NotificationRequest(UUID userId,UUID gameId,@NotBlank String message,@NotBlank String type,String priority) {}
record ContentRequest(@NotBlank String contentType,@NotBlank String contentData,@NotBlank String version,Instant releaseDate,boolean active) {}
record AchievementRequest(@NotBlank String achievementName,String description,String conditions,String rewardType,@PositiveOrZero long rewardValue) {}
record SocialRequest(@NotNull UUID friendId,String connectionType,String status) {}