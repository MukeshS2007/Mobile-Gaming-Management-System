# API request examples

Base URL: `http://localhost:8080/api/v1`. All non-public routes require `Authorization: Bearer <accessToken>`.

## Register

```json
POST /auth/register
{
  "username": "player_one",
  "email": "player@example.com",
  "password": "StrongPass#2026",
  "dateOfBirth": "2000-01-01",
  "country": "IN",
  "privacyConsent": true
}
```

## Create a game (Game Developer or Admin)

```json
POST /games
{
  "gameName": "Sky Legends",
  "gameType": "RPG",
  "description": "A mobile RPG",
  "version": "1.0.0",
  "buildNumber": 1,
  "status": "DEVELOPMENT",
  "configuration": "{\"maxLevel\":100}",
  "minimumAge": 13
}
```

## Start a session and initiate purchase

```json
POST /sessions/start
{ "gameId": "<game-uuid>", "deviceType": "Android", "deviceOs": "Android 16", "appVersion": "1.0.0" }

POST /purchases/initiate
{ "gameId": "<game-uuid>", "productId": "gems_100", "productName": "100 Gems", "purchaseAmount": 1.99, "currency": "USD", "platform": "GOOGLE_PLAY", "receiptData": "store-receipt" }
```

Payment validation is deliberately a backend workflow endpoint; production must connect it to Google Play / App Store server-side receipt verification before marking purchases complete.
