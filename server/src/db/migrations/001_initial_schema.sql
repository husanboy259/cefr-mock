-- =============================================================
-- Spiko Language Learning Platform — Initial Schema
-- =============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUMS ─────────────────────────────────────────────────────
CREATE TYPE cefr_level        AS ENUM ('A1','A2','B1','B2','C1','C2');
CREATE TYPE exercise_type     AS ENUM ('reading','writing','listening','speaking');
CREATE TYPE difficulty        AS ENUM ('easy','medium','hard');
CREATE TYPE submission_status AS ENUM ('pending','auto_graded','manual_review','graded','rejected');

-- ── USERS ─────────────────────────────────────────────────────
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(150),
    avatar_url    VARCHAR(500),
    is_active     BOOLEAN NOT NULL DEFAULT TRUE,
    is_admin      BOOLEAN NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE refresh_tokens (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE password_resets (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token      VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at    TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── REFERENCE TABLES ──────────────────────────────────────────
CREATE TABLE languages (
    id        SERIAL PRIMARY KEY,
    code      VARCHAR(10)  NOT NULL UNIQUE,
    name      VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE categories (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

-- ── EXERCISES ─────────────────────────────────────────────────
CREATE TABLE exercises (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language_id       INTEGER       NOT NULL REFERENCES languages(id),
    category_id       INTEGER       REFERENCES categories(id),
    type              exercise_type NOT NULL,
    level             cefr_level    NOT NULL,
    difficulty        difficulty    NOT NULL DEFAULT 'medium',
    title             VARCHAR(300)  NOT NULL,
    description       TEXT,
    instructions      TEXT,
    thumbnail_url     VARCHAR(500),
    tags              TEXT[],
    estimated_minutes INTEGER,
    is_published      BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured       BOOLEAN NOT NULL DEFAULT FALSE,
    total_attempts    INTEGER NOT NULL DEFAULT 0,
    avg_score         NUMERIC(5,2),
    created_by        UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_exercises_level ON exercises(level);
CREATE INDEX idx_exercises_type  ON exercises(type);
CREATE INDEX idx_exercises_pub   ON exercises(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_exercises_tags  ON exercises USING GIN(tags);

-- ── READING ──────────────────────────────────────────────────
CREATE TABLE reading_passages (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    body        TEXT NOT NULL,
    word_count  INTEGER,
    sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE questions (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id   UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    passage_id    UUID REFERENCES reading_passages(id) ON DELETE SET NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(30) NOT NULL DEFAULT 'mcq',
    -- types: mcq, true_false, fill_blank, short_answer
    explanation   TEXT,
    points        INTEGER NOT NULL DEFAULT 1,
    sort_order    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE answer_options (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID    NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT    NOT NULL,
    is_correct  BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_questions_exercise ON questions(exercise_id);
CREATE INDEX idx_options_question   ON answer_options(question_id);

-- ── LISTENING ────────────────────────────────────────────────
CREATE TABLE listening_tracks (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id  UUID         NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    audio_url    VARCHAR(500) NOT NULL,
    transcript   TEXT,
    duration_sec INTEGER,
    sort_order   INTEGER NOT NULL DEFAULT 0
);

-- ── WRITING ──────────────────────────────────────────────────
CREATE TABLE writing_tasks (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id    UUID    NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    prompt         TEXT    NOT NULL,
    example_answer TEXT,
    min_words      INTEGER NOT NULL DEFAULT 50,
    max_words      INTEGER NOT NULL DEFAULT 500,
    grading_rubric TEXT,
    criteria       JSONB   NOT NULL DEFAULT '[]'
    -- [{"name":"Grammar","max_points":10}, ...]
);

CREATE TABLE writing_submissions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id     UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    task_id         UUID NOT NULL REFERENCES writing_tasks(id) ON DELETE CASCADE,
    body            TEXT NOT NULL,
    word_count      INTEGER NOT NULL DEFAULT 0,
    status          submission_status NOT NULL DEFAULT 'pending',
    score           NUMERIC(5,2),
    max_score       NUMERIC(5,2),
    feedback        TEXT,
    criteria_scores JSONB,
    graded_by       UUID REFERENCES users(id) ON DELETE SET NULL,
    graded_at       TIMESTAMPTZ,
    submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_writing_sub_user ON writing_submissions(user_id);
CREATE INDEX idx_writing_sub_ex   ON writing_submissions(exercise_id);

-- ── SPEAKING ─────────────────────────────────────────────────
CREATE TABLE speaking_tasks (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id       UUID         NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    prompt            TEXT         NOT NULL,
    prompt_audio_url  VARCHAR(500),
    example_audio_url VARCHAR(500),
    prep_time_sec     INTEGER NOT NULL DEFAULT 30,
    record_time_sec   INTEGER NOT NULL DEFAULT 120,
    grading_rubric    TEXT,
    criteria          JSONB   NOT NULL DEFAULT '[]'
);

CREATE TABLE speaking_submissions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id     UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    task_id         UUID NOT NULL REFERENCES speaking_tasks(id) ON DELETE CASCADE,
    audio_url       VARCHAR(500) NOT NULL,
    duration_sec    INTEGER,
    file_size_bytes BIGINT,
    status          submission_status NOT NULL DEFAULT 'pending',
    score           NUMERIC(5,2),
    max_score       NUMERIC(5,2),
    feedback        TEXT,
    criteria_scores JSONB,
    graded_by       UUID REFERENCES users(id) ON DELETE SET NULL,
    graded_at       TIMESTAMPTZ,
    submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_speaking_sub_user ON speaking_submissions(user_id);
CREATE INDEX idx_speaking_sub_ex   ON speaking_submissions(exercise_id);

-- ── QUIZ ATTEMPTS (Reading + Listening) ──────────────────────
CREATE TABLE quiz_attempts (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id    UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    status         VARCHAR(20) NOT NULL DEFAULT 'in_progress',
    -- in_progress | completed | abandoned
    score          NUMERIC(5,2),
    max_score      NUMERIC(5,2),
    percentage     NUMERIC(5,2),
    time_taken_sec INTEGER,
    started_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at   TIMESTAMPTZ,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE quiz_answers (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id      UUID    NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id     UUID    NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    selected_option UUID    REFERENCES answer_options(id) ON DELETE SET NULL,
    text_answer     TEXT,
    is_correct      BOOLEAN,
    points_earned   NUMERIC(5,2) NOT NULL DEFAULT 0,
    answered_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(attempt_id, question_id)
);

CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_ex   ON quiz_attempts(exercise_id);

-- ── USER PROGRESS ─────────────────────────────────────────────
CREATE TABLE user_progress (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id     UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    best_score      NUMERIC(5,2),
    best_percentage NUMERIC(5,2),
    total_attempts  INTEGER NOT NULL DEFAULT 0,
    last_attempt_at TIMESTAMPTZ,
    completed       BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at    TIMESTAMPTZ,
    UNIQUE(user_id, exercise_id)
);

CREATE TABLE user_level_stats (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id        UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    level          cefr_level    NOT NULL,
    exercise_type  exercise_type NOT NULL,
    exercises_done INTEGER NOT NULL DEFAULT 0,
    avg_score      NUMERIC(5,2),
    total_points   INTEGER NOT NULL DEFAULT 0,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, level, exercise_type)
);

CREATE TABLE user_streaks (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    current_streak   INTEGER NOT NULL DEFAULT 0,
    longest_streak   INTEGER NOT NULL DEFAULT 0,
    last_active_date DATE,
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE daily_activity (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_date       DATE NOT NULL,
    exercises_completed INTEGER NOT NULL DEFAULT 0,
    points_earned       INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_id, activity_date)
);

-- ── BOOKMARKS ────────────────────────────────────────────────
CREATE TABLE bookmarks (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, exercise_id)
);

-- ── AUTO-UPDATE TRIGGER ───────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_ua
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_exercises_ua
    BEFORE UPDATE ON exercises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_writing_sub_ua
    BEFORE UPDATE ON writing_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_speaking_sub_ua
    BEFORE UPDATE ON speaking_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_quiz_attempts_ua
    BEFORE UPDATE ON quiz_attempts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── SEED: LANGUAGES ──────────────────────────────────────────
INSERT INTO languages (code, name) VALUES
    ('en', 'English'),
    ('uz', 'O''zbek'),
    ('ru', 'Русский');

-- ── SEED: CATEGORIES ─────────────────────────────────────────
INSERT INTO categories (name, slug, sort_order) VALUES
    ('Daily Life',  'daily-life',  1),
    ('Travel',      'travel',      2),
    ('Business',    'business',    3),
    ('Science',     'science',     4),
    ('Culture',     'culture',     5),
    ('Technology',  'technology',  6),
    ('Environment', 'environment', 7),
    ('Health',      'health',      8);
