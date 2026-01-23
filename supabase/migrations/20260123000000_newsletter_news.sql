-- Create table for Newsletter Sources
CREATE TABLE IF NOT EXISTS newsletter_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    name_vi VARCHAR(200),
    email_pattern VARCHAR(500),  -- SQL LIKE pattern
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Newsletter Categories
CREATE TABLE IF NOT EXISTS newsletter_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_vi VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Categories
INSERT INTO newsletter_categories (slug, name, name_vi, display_order) VALUES
('ai-models', 'AI Models', 'Mô hình AI', 1),
('ai-tools', 'AI Tools', 'Công cụ AI', 2),
('ai-research', 'AI Research', 'Nghiên cứu AI', 3),
('ai-business', 'AI Business', 'AI Doanh nghiệp', 4),
('ai-regulation', 'AI Regulation', 'Quy định AI', 5),
('ai-tutorials', 'AI Tutorials', 'Hướng dẫn AI', 6),
('ai-funding', 'AI Funding', 'Đầu tư AI', 7),
('general', 'General', 'Tổng hợp', 8)
ON CONFLICT (slug) DO NOTHING;

-- Seed Sources
INSERT INTO newsletter_sources (slug, name, name_vi, email_pattern, website_url) VALUES
('the-rundown-ai', 'The Rundown AI', 'The Rundown AI', '%@therundown.ai', 'https://www.therundown.ai'),
('tldr-ai', 'TLDR AI', 'TLDR AI', '%@tldr.tech', 'https://tldr.tech/ai'),
('alphasignal', 'AlphaSignal', 'AlphaSignal', '%@alphasignal.ai', 'https://alphasignal.ai'),
('ben-bites', 'Ben''s Bites', 'Ben''s Bites', '%@bensbites.beehiiv.com', 'https://bensbites.beehiiv.com'),
('superhuman', 'Superhuman', 'Superhuman', '%@superhuman.ai', 'https://www.superhuman.ai')
ON CONFLICT (slug) DO NOTHING;

-- Create table for Newsletter News
CREATE TABLE IF NOT EXISTS newsletter_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Deduplication
    url_hash VARCHAR(64) UNIQUE NOT NULL,  -- SHA256 of original_url

    -- Original content (English)
    original_title VARCHAR(500) NOT NULL,
    original_summary TEXT,
    original_url VARCHAR(1000) NOT NULL,

    -- Translated content (Vietnamese)
    title_vi VARCHAR(500) NOT NULL,
    summary_vi TEXT NOT NULL,

    -- Media
    thumbnail_url VARCHAR(1000),

    -- Relationships
    source_id UUID REFERENCES newsletter_sources(id),
    category_id UUID REFERENCES newsletter_categories(id),

    -- Email metadata
    email_subject VARCHAR(500),
    email_received_at TIMESTAMPTZ,
    email_id VARCHAR(200),

    -- Status
    is_featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'published',

    -- AI Processing
    perplexity_model VARCHAR(100),
    auto_categorized BOOLEAN DEFAULT true,

    -- Timestamps
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Processing Queue
CREATE TABLE IF NOT EXISTS newsletter_processing_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_id VARCHAR(200) UNIQUE NOT NULL,
    email_subject VARCHAR(500),
    email_from VARCHAR(500),
    email_received_at TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed, skipped
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    error_message TEXT,
    items_count INTEGER DEFAULT 0,
    items_processed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- RLS Policies
ALTER TABLE newsletter_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_categories ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view published news"
    ON newsletter_news FOR SELECT
    USING (status = 'published');

CREATE POLICY "Public can view active sources"
    ON newsletter_sources FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view active categories"
    ON newsletter_categories FOR SELECT
    USING (is_active = true);

-- Service role full access (for cron jobs and admin)
-- Note: 'service_role' is a special role in Supabase/PostgREST.
-- However, typically you use the service_role key to bypass RLS, but explicit policies help if using authenticated client with custom claims.
-- For simplicity in Supabase, the service_api key bypasses RLS automatically.
-- We can add a policy for authenticated users if we have an admin panel later.
