CREATE TABLE users (
 id UUID PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, email VARCHAR(100) NOT NULL UNIQUE, password_hash VARCHAR(255) NOT NULL,
 role VARCHAR(30) NOT NULL DEFAULT 'PLAYER', first_name VARCHAR(50), last_name VARCHAR(50), date_of_birth DATE NOT NULL,
 country VARCHAR(50), parental_consent BOOLEAN NOT NULL DEFAULT FALSE, privacy_consent BOOLEAN NOT NULL DEFAULT FALSE,
 marketing_consent BOOLEAN NOT NULL DEFAULT FALSE, created_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
 last_login TIMESTAMPTZ, is_active BOOLEAN NOT NULL DEFAULT TRUE, is_banned BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE games (
 id UUID PRIMARY KEY, game_name VARCHAR(100) NOT NULL UNIQUE, game_type VARCHAR(30) NOT NULL, description TEXT, version VARCHAR(20) NOT NULL,
 build_number INT NOT NULL, release_date TIMESTAMPTZ, status VARCHAR(30) NOT NULL, developer_id UUID REFERENCES users(id), configuration TEXT,
 minimum_age INT NOT NULL DEFAULT 0, created_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE players (
 id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES users(id), game_id UUID NOT NULL REFERENCES games(id), player_level INT NOT NULL DEFAULT 1,
 experience_points BIGINT NOT NULL DEFAULT 0, virtual_currency TEXT, first_play_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
 last_play_date TIMESTAMPTZ, total_play_time BIGINT NOT NULL DEFAULT 0, total_sessions INT NOT NULL DEFAULT 0, is_active BOOLEAN NOT NULL DEFAULT TRUE,
 player_segment VARCHAR(50), retention_day INT NOT NULL DEFAULT 0, UNIQUE(user_id, game_id)
);
CREATE TABLE game_sessions (id UUID PRIMARY KEY, player_id UUID NOT NULL REFERENCES players(id), game_id UUID NOT NULL REFERENCES games(id), session_start TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, session_end TIMESTAMPTZ, duration_seconds INT, actions_performed INT NOT NULL DEFAULT 0, score_achieved BIGINT NOT NULL DEFAULT 0, levels_completed INT NOT NULL DEFAULT 0, device_type VARCHAR(50), device_os VARCHAR(50), app_version VARCHAR(20));
CREATE TABLE in_app_purchases (id UUID PRIMARY KEY, player_id UUID NOT NULL REFERENCES players(id), game_id UUID NOT NULL REFERENCES games(id), product_id VARCHAR(100) NOT NULL, product_name VARCHAR(200) NOT NULL, purchase_amount NUMERIC(10,2) NOT NULL, currency VARCHAR(3) NOT NULL, transaction_id VARCHAR(100) NOT NULL UNIQUE, platform VARCHAR(30) NOT NULL, transaction_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, status VARCHAR(30) NOT NULL, receipt_data TEXT);
CREATE TABLE achievements (id UUID PRIMARY KEY, game_id UUID NOT NULL REFERENCES games(id), achievement_name VARCHAR(150) NOT NULL, description TEXT, conditions TEXT, reward_type VARCHAR(50), reward_value BIGINT NOT NULL DEFAULT 0, UNIQUE(game_id, achievement_name));
CREATE TABLE player_achievements (id UUID PRIMARY KEY, player_id UUID NOT NULL REFERENCES players(id), achievement_id UUID NOT NULL REFERENCES achievements(id), unlocked_date TIMESTAMPTZ, progress INT NOT NULL DEFAULT 0, UNIQUE(player_id,achievement_id));
CREATE TABLE live_events (id UUID PRIMARY KEY, game_id UUID NOT NULL REFERENCES games(id), event_name VARCHAR(150) NOT NULL, start_date TIMESTAMPTZ NOT NULL, end_date TIMESTAMPTZ NOT NULL, event_type VARCHAR(50) NOT NULL, configuration TEXT, is_active BOOLEAN NOT NULL DEFAULT TRUE);
CREATE TABLE game_content (id UUID PRIMARY KEY, game_id UUID NOT NULL REFERENCES games(id), content_type VARCHAR(50) NOT NULL, content_data TEXT NOT NULL, version VARCHAR(20) NOT NULL, release_date TIMESTAMPTZ, is_active BOOLEAN NOT NULL DEFAULT FALSE);
CREATE TABLE notifications (id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES users(id), game_id UUID REFERENCES games(id), message TEXT NOT NULL, type VARCHAR(50) NOT NULL, is_read BOOLEAN NOT NULL DEFAULT FALSE, created_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, priority VARCHAR(20) NOT NULL DEFAULT 'NORMAL');
CREATE TABLE social_connections (id UUID PRIMARY KEY, player_id UUID NOT NULL REFERENCES players(id), friend_id UUID NOT NULL REFERENCES players(id), connection_type VARCHAR(30) NOT NULL, connection_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, status VARCHAR(30) NOT NULL, UNIQUE(player_id,friend_id));
CREATE TABLE leaderboards (id UUID PRIMARY KEY, game_id UUID NOT NULL REFERENCES games(id), leaderboard_type VARCHAR(50) NOT NULL, timeframe VARCHAR(30) NOT NULL, player_rankings TEXT NOT NULL, last_updated TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE refresh_tokens (id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES users(id), token VARCHAR(500) NOT NULL UNIQUE, expiry_date TIMESTAMPTZ NOT NULL, is_active BOOLEAN NOT NULL DEFAULT TRUE, device_info VARCHAR(250), created_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE audit_logs (id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), action VARCHAR(100) NOT NULL, entity_type VARCHAR(100) NOT NULL, entity_id UUID, old_value TEXT, new_value TEXT, timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, game_id UUID REFERENCES games(id));
CREATE INDEX idx_players_game ON players(game_id); CREATE INDEX idx_sessions_player ON game_sessions(player_id); CREATE INDEX idx_purchases_game ON in_app_purchases(game_id); CREATE INDEX idx_events_active ON live_events(game_id, is_active); CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
