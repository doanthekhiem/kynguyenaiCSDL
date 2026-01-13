-- =============================================
-- AI Tools Directory - Database Schema
-- KynguyenAI.vn
-- =============================================

-- 1. AI Tool Categories Table
-- =============================================
CREATE TABLE IF NOT EXISTS ai_tool_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_vi VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for active categories
CREATE INDEX idx_categories_active ON ai_tool_categories(is_active, display_order);

-- Seed categories data
INSERT INTO ai_tool_categories (slug, name, name_vi, icon, display_order) VALUES
    ('text-generation', 'Text Generation', 'Tạo văn bản', 'pen-tool', 1),
    ('image-generation', 'Image Generation', 'Tạo hình ảnh', 'image', 2),
    ('video-generation', 'Video Generation', 'Tạo video', 'video', 3),
    ('audio-generation', 'Audio Generation', 'Tạo âm thanh', 'music', 4),
    ('code-assistant', 'Code Assistant', 'Hỗ trợ lập trình', 'code', 5),
    ('chatbot', 'Chatbot', 'Chatbot', 'message-circle', 6),
    ('productivity', 'Productivity', 'Năng suất', 'zap', 7),
    ('research', 'Research', 'Nghiên cứu', 'search', 8),
    ('marketing', 'Marketing', 'Marketing', 'megaphone', 9),
    ('design', 'Design', 'Thiết kế', 'palette', 10),
    ('data-analysis', 'Data Analysis', 'Phân tích dữ liệu', 'bar-chart', 11),
    ('automation', 'Automation', 'Tự động hóa', 'settings', 12),
    ('other', 'Other', 'Khác', 'grid', 99)
ON CONFLICT (slug) DO NOTHING;


-- 2. AI Tools Main Table
-- =============================================
CREATE TABLE IF NOT EXISTS ai_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    logo_url VARCHAR(500),
    website_url VARCHAR(500) NOT NULL,

    -- Categorization
    category_id UUID REFERENCES ai_tool_categories(id) ON DELETE SET NULL,

    -- Pricing
    pricing_type VARCHAR(50) NOT NULL DEFAULT 'free',
    pricing_details VARCHAR(200),

    -- Social/Links
    twitter_url VARCHAR(500),
    github_url VARCHAR(500),
    discord_url VARCHAR(500),

    -- Media
    screenshots JSONB DEFAULT '[]',
    video_url VARCHAR(500),

    -- Stats (denormalized for performance)
    vote_count INTEGER DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,

    -- Status
    status VARCHAR(20) DEFAULT 'pending',
    featured BOOLEAN DEFAULT false,
    featured_date DATE,

    -- Ownership
    submitted_by UUID REFERENCES user_profile(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES user_profile(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,

    -- Constraints
    CONSTRAINT valid_pricing_type CHECK (pricing_type IN ('free', 'freemium', 'paid', 'enterprise')),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected', 'archived'))
);

-- Indexes for common queries
CREATE INDEX idx_tools_status ON ai_tools(status);
CREATE INDEX idx_tools_category ON ai_tools(category_id);
CREATE INDEX idx_tools_votes ON ai_tools(vote_count DESC);
CREATE INDEX idx_tools_rating ON ai_tools(average_rating DESC);
CREATE INDEX idx_tools_featured ON ai_tools(featured, featured_date DESC);
CREATE INDEX idx_tools_slug ON ai_tools(slug);
CREATE INDEX idx_tools_created ON ai_tools(created_at DESC);
CREATE INDEX idx_tools_published ON ai_tools(published_at DESC);


-- 3. AI Tool Tags Table
-- =============================================
CREATE TABLE IF NOT EXISTS ai_tool_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tags_slug ON ai_tool_tags(slug);


-- 4. AI Tool Tag Relations (Many-to-Many)
-- =============================================
CREATE TABLE IF NOT EXISTS ai_tool_tag_relations (
    tool_id UUID NOT NULL REFERENCES ai_tools(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES ai_tool_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (tool_id, tag_id)
);

CREATE INDEX idx_tag_relations_tool ON ai_tool_tag_relations(tool_id);
CREATE INDEX idx_tag_relations_tag ON ai_tool_tag_relations(tag_id);


-- 5. AI Tool Votes Table
-- =============================================
CREATE TABLE IF NOT EXISTS ai_tool_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID NOT NULL REFERENCES ai_tools(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(tool_id, user_id)
);

CREATE INDEX idx_votes_tool ON ai_tool_votes(tool_id);
CREATE INDEX idx_votes_user ON ai_tool_votes(user_id);


-- 6. AI Tool Reviews Table
-- =============================================
CREATE TABLE IF NOT EXISTS ai_tool_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID NOT NULL REFERENCES ai_tools(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE,

    rating INTEGER NOT NULL,
    title VARCHAR(200),
    content TEXT NOT NULL,

    -- Moderation
    status VARCHAR(20) DEFAULT 'published',

    -- Stats
    helpful_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5),
    CONSTRAINT valid_review_status CHECK (status IN ('published', 'hidden', 'flagged')),
    UNIQUE(tool_id, user_id)
);

CREATE INDEX idx_reviews_tool ON ai_tool_reviews(tool_id);
CREATE INDEX idx_reviews_user ON ai_tool_reviews(user_id);
CREATE INDEX idx_reviews_status ON ai_tool_reviews(status);
CREATE INDEX idx_reviews_rating ON ai_tool_reviews(rating);


-- 7. AI Tool Submissions Table
-- =============================================
CREATE TABLE IF NOT EXISTS ai_tool_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Basic info
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    website_url VARCHAR(500) NOT NULL,
    logo_url VARCHAR(500),

    -- Categorization
    category_id UUID REFERENCES ai_tool_categories(id) ON DELETE SET NULL,
    suggested_tags TEXT,

    -- Pricing
    pricing_type VARCHAR(50) DEFAULT 'free',
    pricing_details VARCHAR(200),

    -- Social
    twitter_url VARCHAR(500),
    github_url VARCHAR(500),

    -- Submitter info
    submitted_by UUID NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE,
    submitter_relation VARCHAR(50),

    -- Moderation
    status VARCHAR(20) DEFAULT 'pending',
    reviewer_id UUID REFERENCES user_profile(id) ON DELETE SET NULL,
    reviewer_notes TEXT,
    reviewed_at TIMESTAMPTZ,

    -- If approved, link to created tool
    approved_tool_id UUID REFERENCES ai_tools(id) ON DELETE SET NULL,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT valid_submission_pricing CHECK (pricing_type IN ('free', 'freemium', 'paid', 'enterprise')),
    CONSTRAINT valid_submission_status CHECK (status IN ('pending', 'approved', 'rejected')),
    CONSTRAINT valid_submitter_relation CHECK (submitter_relation IN ('maker', 'user', 'other'))
);

CREATE INDEX idx_submissions_status ON ai_tool_submissions(status);
CREATE INDEX idx_submissions_user ON ai_tool_submissions(submitted_by);
CREATE INDEX idx_submissions_created ON ai_tool_submissions(created_at DESC);


-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger function to update vote_count on ai_tools
CREATE OR REPLACE FUNCTION update_tool_vote_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE ai_tools
        SET vote_count = vote_count + 1,
            updated_at = NOW()
        WHERE id = NEW.tool_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE ai_tools
        SET vote_count = GREATEST(vote_count - 1, 0),
            updated_at = NOW()
        WHERE id = OLD.tool_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_vote_count
AFTER INSERT OR DELETE ON ai_tool_votes
FOR EACH ROW EXECUTE FUNCTION update_tool_vote_count();


-- Trigger function to update review_count and average_rating on ai_tools
CREATE OR REPLACE FUNCTION update_tool_review_stats()
RETURNS TRIGGER AS $$
DECLARE
    target_tool_id UUID;
BEGIN
    -- Get the tool_id from either NEW or OLD record
    IF TG_OP = 'DELETE' THEN
        target_tool_id := OLD.tool_id;
    ELSE
        target_tool_id := NEW.tool_id;
    END IF;

    -- Update stats
    UPDATE ai_tools
    SET
        review_count = (
            SELECT COUNT(*)
            FROM ai_tool_reviews
            WHERE tool_id = target_tool_id AND status = 'published'
        ),
        average_rating = (
            SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)
            FROM ai_tool_reviews
            WHERE tool_id = target_tool_id AND status = 'published'
        ),
        updated_at = NOW()
    WHERE id = target_tool_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_review_stats
AFTER INSERT OR UPDATE OR DELETE ON ai_tool_reviews
FOR EACH ROW EXECUTE FUNCTION update_tool_review_stats();


-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_tools_updated_at
BEFORE UPDATE ON ai_tools
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_reviews_updated_at
BEFORE UPDATE ON ai_tool_reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_submissions_updated_at
BEFORE UPDATE ON ai_tool_submissions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tool_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tool_tag_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tool_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tool_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tool_submissions ENABLE ROW LEVEL SECURITY;


-- Categories: Public read
CREATE POLICY "Public can view active categories"
    ON ai_tool_categories FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage categories"
    ON ai_tool_categories FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );


-- Tags: Public read
CREATE POLICY "Public can view tags"
    ON ai_tool_tags FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage tags"
    ON ai_tool_tags FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );


-- Tag Relations: Public read
CREATE POLICY "Public can view tag relations"
    ON ai_tool_tag_relations FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage tag relations"
    ON ai_tool_tag_relations FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );


-- Tools: Public read for approved, admin write
CREATE POLICY "Public can view approved tools"
    ON ai_tools FOR SELECT
    USING (status = 'approved');

CREATE POLICY "Admins can view all tools"
    ON ai_tools FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert tools"
    ON ai_tools FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update tools"
    ON ai_tools FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete tools"
    ON ai_tools FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );


-- Votes: Public read, authenticated write own
CREATE POLICY "Public can view votes"
    ON ai_tool_votes FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can insert own votes"
    ON ai_tool_votes FOR INSERT
    WITH CHECK (
        user_id IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own votes"
    ON ai_tool_votes FOR DELETE
    USING (
        user_id IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
    );


-- Reviews: Public read published, authenticated write own
CREATE POLICY "Public can view published reviews"
    ON ai_tool_reviews FOR SELECT
    USING (status = 'published');

CREATE POLICY "Users can view own reviews"
    ON ai_tool_reviews FOR SELECT
    USING (
        user_id IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Authenticated users can insert own reviews"
    ON ai_tool_reviews FOR INSERT
    WITH CHECK (
        user_id IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own reviews"
    ON ai_tool_reviews FOR UPDATE
    USING (
        user_id IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own reviews"
    ON ai_tool_reviews FOR DELETE
    USING (
        user_id IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all reviews"
    ON ai_tool_reviews FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );


-- Submissions: Users manage own, admins manage all
CREATE POLICY "Users can view own submissions"
    ON ai_tool_submissions FOR SELECT
    USING (
        submitted_by IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Authenticated users can create submissions"
    ON ai_tool_submissions FOR INSERT
    WITH CHECK (
        submitted_by IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own pending submissions"
    ON ai_tool_submissions FOR UPDATE
    USING (
        submitted_by IN (
            SELECT id FROM user_profile WHERE auth_id = auth.uid()
        )
        AND status = 'pending'
    );

CREATE POLICY "Admins can view all submissions"
    ON ai_tool_submissions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all submissions"
    ON ai_tool_submissions FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete submissions"
    ON ai_tool_submissions FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_profile
            WHERE auth_id = auth.uid() AND role = 'admin'
        )
    );


-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_tool_slug(tool_name TEXT)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Convert to lowercase, replace spaces with hyphens, remove special chars
    base_slug := lower(regexp_replace(tool_name, '[^a-zA-Z0-9\s-]', '', 'g'));
    base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(both '-' from base_slug);

    final_slug := base_slug;

    -- Check for existing slug and append number if needed
    WHILE EXISTS (SELECT 1 FROM ai_tools WHERE slug = final_slug) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;

    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;


-- Function to get user's vote status for multiple tools
CREATE OR REPLACE FUNCTION get_user_votes(user_uuid UUID, tool_ids UUID[])
RETURNS TABLE(tool_id UUID, voted BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id as tool_id,
        EXISTS (
            SELECT 1 FROM ai_tool_votes v
            WHERE v.tool_id = t.id AND v.user_id = user_uuid
        ) as voted
    FROM unnest(tool_ids) AS t(id);
END;
$$ LANGUAGE plpgsql;
