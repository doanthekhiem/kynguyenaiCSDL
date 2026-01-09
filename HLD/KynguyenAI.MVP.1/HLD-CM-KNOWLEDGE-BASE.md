# HLD - CM-KNOWLEDGE-BASE (Content Management - Knowledge Base)

## 1. Bối cảnh

**Knowledge Base** lưu trữ dữ liệu quy hoạch Việt Nam 2045, prompt templates, và embeddings cho RAG chatbot.

## 2. Database Schema

```sql
-- Locations Master Data
CREATE TABLE locations (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    planning_data JSONB NOT NULL,
    prompt_keywords JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge Embeddings (for RAG)
CREATE TABLE knowledge_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    location VARCHAR(50),
    category VARCHAR(50),
    source VARCHAR(200),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON knowledge_embeddings
  USING ivfflat (embedding vector_cosine_ops);

-- Prompt Templates
CREATE TABLE prompt_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE,
    type VARCHAR(50) NOT NULL,
    system_prompt TEXT,
    user_template TEXT,
    variables JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 3. Sample Data

```json
{
    "id": "thu-duc",
    "name": "Trung tâm Đổi mới Thủ Đức",
    "planning_data": {
        "area_km2": 211,
        "population_2045": 1500000,
        "key_projects": ["Innovation District", "Metro Lines 1-2"],
        "green_coverage": 40
    },
    "prompt_keywords": {
        "architecture": ["gleaming skyscrapers", "vertical gardens"],
        "transport": ["autonomous vehicles", "metro system"]
    }
}
```

## 4. RAG Query Function

```sql
CREATE OR REPLACE FUNCTION match_knowledge(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 5,
    filter_location text DEFAULT NULL
)
RETURNS TABLE (
    id uuid,
    content text,
    similarity float
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        knowledge_embeddings.id,
        knowledge_embeddings.content,
        1 - (knowledge_embeddings.embedding <=> query_embedding) as similarity
    FROM knowledge_embeddings
    WHERE
        (filter_location IS NULL OR knowledge_embeddings.location = filter_location)
        AND 1 - (knowledge_embeddings.embedding <=> query_embedding) > match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$ LANGUAGE plpgsql;
```

---

**Tài liệu liên quan:**
- [HLD-CB-FUTURE-SELF.md](./HLD-CB-FUTURE-SELF.md)
- [HLD-AI-TEXT-GENERATION.md](./HLD-AI-TEXT-GENERATION.md)
