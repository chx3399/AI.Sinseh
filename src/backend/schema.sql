-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Profile & Demographics)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(50),
    ethnicity VARCHAR(50),
    -- Summary of identified TCM constitution (updated after latest assessment)
    current_primary_constitution VARCHAR(100),
    current_confidence_score DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CCMQ Assessments History
CREATE TABLE ccmq_assessments (
    assessment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    -- Store the raw 60-item or 18-item questionnaire responses
    raw_responses JSONB NOT NULL,
    -- Store calculated scores for all 9 constitutions
    calculated_scores JSONB NOT NULL,
    identified_constitution VARCHAR(100) NOT NULL,
    assessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. AI Tongue Diagnoses History
CREATE TABLE tongue_diagnoses (
    diagnosis_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    -- Optional link to the specific CCMQ assessment if done together
    linked_assessment_id UUID REFERENCES ccmq_assessments(assessment_id) ON DELETE SET NULL,
    -- Reference to the securely stored, anonymized image blob
    image_storage_ref VARCHAR(255),
    -- AI detected features
    detected_color VARCHAR(50),
    detected_coating VARCHAR(50),
    detected_shape VARCHAR(50),
    detected_moisture VARCHAR(50),
    -- Confidence score of the AI model's prediction
    ai_confidence_score DECIMAL(5,2),
    diagnosed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster history retrieval
CREATE INDEX idx_ccmq_user_id ON ccmq_assessments(user_id);
CREATE INDEX idx_tongue_user_id ON tongue_diagnoses(user_id);
