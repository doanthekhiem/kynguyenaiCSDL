-- =============================================
-- Newsletter News Tracking - Database Schema
-- KynguyenAI.vn
-- =============================================

-- 1. Newsletter Sources Table
-- =============================================
CREATE TABLE IF NOT EXISTS newsletter_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    name_vi VARCHAR(200),
    email_pattern VARCHAR(500), -- e.g., "*@mail.beehiiv.com"
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_sources_active ON newsletter_sources(is_active);
CREATE INDEX idx_newsletter_sources_slug ON newsletter_sources(slug);

-- Seed initial sources
INSERT INTO newsletter_sources (slug, name, name_vi, email_pattern, website_url) VALUES
    ('the-rundown-ai', 'The Rundown AI', 'The Rundown AI', '%@therundown.ai%', 'https://therundown.ai'),
    ('tldr-ai', 'TLDR AI', 'TLDR AI', '%@tldr.tech%', 'https://tldr.tech/ai'),
    ('alphasignal', 'AlphaSignal', 'AlphaSignal', '%@alphasignal.ai%', 'https://alphasignal.ai'),
    ('ai-breakfast', 'AI Breakfast', 'AI Breakfast', '%@aibreakfast.beehiiv.com%', 'https://aibreakfast.beehiiv.com'),
    ('import-ai', 'Import AI', 'Import AI', '%@importai.substack.com%', 'https://importai.substack.com'),
    ('ben-bites', 'Ben''s Bites', 'Ben''s Bites', '%@bensbites.beehiiv.com%', 'https://bensbites.beehiiv.com')
ON CONFLICT (slug) DO NOTHING;


-- 2. Newsletter News Categories Table
-- =============================================
CREATE TABLE IF NOT EXISTS newsletter_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_vi VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(50), -- Tailwind color class
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_categories_active ON newsletter_categories(is_active, display_order);

-- Seed categories
INSERT INTO newsletter_categories (slug, name, name_vi, icon, color, display_order) VALUES
    ('ai-models', 'AI Models', 'Mô hình AI', 'cpu', 'blue', 1),
    ('ai-tools', 'AI Tools', 'Công cụ AI', 'wrench', 'green', 2),
    ('ai-research', 'AI Research', 'Nghiên cứu AI', 'book-open', 'purple', 3),
    ('ai-business', 'AI Business', 'AI Doanh nghiệp', 'briefcase', 'orange', 4),
    ('ai-regulation', 'AI Regulation', 'Quy định AI', 'scale', 'red', 5),
    ('ai-tutorials', 'AI Tutorials', 'Hướng dẫn AI', 'graduation-cap', 'cyan', 6),
    ('ai-funding', 'AI Funding', 'Đầu tư AI', 'dollar-sign', 'emerald', 7),
    ('general', 'General', 'Tổng hợp', 'newspaper', 'gray', 99)
ON CONFLICT (slug) DO NOTHING;


-- 3. Newsletter News Items Table
-- =============================================
CREATE TABLE IF NOT EXISTS newsletter_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Deduplication
    url_hash VARCHAR(64) UNIQUE NOT NULL, -- SHA256 of original_url

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
    source_id UUID REFERENCES newsletter_sources(id) ON DELETE SET NULL,
    category_id UUID REFERENCES newsletter_categories(id) ON DELETE SET NULL,

    -- Email metadata
    email_subject VARCHAR(500),
    email_received_at TIMESTAMPTZ,
    email_id VARCHAR(200), -- Gmail message ID

    -- Display
    is_featured BOOLEAN DEFAULT false,

    -- Status
    status VARCHAR(20) DEFAULT 'published',

    -- AI Processing metadata
    perplexity_model VARCHAR(100),
    auto_categorized BOOLEAN DEFAULT true,

    -- Timestamps
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT valid_news_status CHECK (status IN ('draft', 'published', 'archived', 'rejected'))
);

-- Indexes for common queries
CREATE INDEX idx_newsletter_news_status ON newsletter_news(status);
CREATE INDEX idx_newsletter_news_source ON newsletter_news(source_id);
CREATE INDEX idx_newsletter_news_category ON newsletter_news(category_id);
CREATE INDEX idx_newsletter_news_published ON newsletter_news(published_at DESC);
CREATE INDEX idx_newsletter_news_featured ON newsletter_news(is_featured, published_at DESC);
CREATE INDEX idx_newsletter_news_url_hash ON newsletter_news(url_hash);
CREATE INDEX idx_newsletter_news_email_received ON newsletter_news(email_received_at DESC);


-- 4. Processing Queue Table (for async/retry handling)
-- =============================================
CREATE TABLE IF NOT EXISTS newsletter_processing_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Raw email data
    email_id VARCHAR(200) UNIQUE NOT NULL,
    email_subject VARCHAR(500),
    email_from VARCHAR(500),
    email_received_at TIMESTAMPTZ,

    -- Processing status
    status VARCHAR(20) DEFAULT 'pending',
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    error_message TEXT,

    -- Items extracted count
    items_count INTEGER DEFAULT 0,
    items_processed INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ,

    CONSTRAINT valid_queue_status CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'skipped'))
);

CREATE INDEX idx_queue_status ON newsletter_processing_queue(status);
CREATE INDEX idx_queue_created ON newsletter_processing_queue(created_at DESC);


-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-update updated_at for newsletter_news
CREATE TRIGGER trigger_newsletter_news_updated_at
BEFORE UPDATE ON newsletter_news
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE newsletter_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_processing_queue ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view active sources"
    ON newsletter_sources FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view active categories"
    ON newsletter_categories FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view published news"
    ON newsletter_news FOR SELECT
    USING (status = 'published');

-- Admin policies
CREATE POLICY "Admins can manage newsletter_sources"
    ON newsletter_sources FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage newsletter_categories"
    ON newsletter_categories FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage newsletter_news"
    ON newsletter_news FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage processing_queue"
    ON newsletter_processing_queue FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

-- Service role bypass (for API routes using service key)
CREATE POLICY "Service role full access sources"
    ON newsletter_sources FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access categories"
    ON newsletter_categories FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access news"
    ON newsletter_news FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access queue"
    ON newsletter_processing_queue FOR ALL
    USING (auth.role() = 'service_role');
