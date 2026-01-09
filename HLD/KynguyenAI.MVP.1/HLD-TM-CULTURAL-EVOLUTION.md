# HLD - TM-CULTURAL-EVOLUTION (Time Machine Module - Cultural Evolution)

## 1. Bối cảnh

**Cultural Evolution** cho phép người dùng upload ảnh chân dung, AI sẽ "lão hóa" đến 2045 và mặc trang phục "Tân Truyền thống" (Áo Dài tương lai với công nghệ).

## 2. User Flow

```
1. User uploads face photo
   ↓
2. AI age progression to 2045 (~20 years)
   ↓
3. Generate future Vietnamese traditional outfit
   ↓
4. Composite face + outfit + background
   ↓
5. Result: "You in 2045 wearing smart Áo Dài"
```

## 3. Technology Stack

### 3.1 Face Processing Pipeline

```typescript
interface CulturalEvolutionPipeline {
    // Step 1: Face detection & extraction
    faceDetection: 'MediaPipe Face Detection';

    // Step 2: Age progression
    ageProgression: 'Fal.ai age-progression model';

    // Step 3: Outfit generation
    outfitGeneration: 'Flux Pro with ControlNet';

    // Step 4: Face swap
    faceSwap: 'Replicate Face Swap API';

    // Step 5: Background
    background: 'Vietnam 2045 scene';
}
```

### 3.2 Outfit Styles

```typescript
const FUTURE_OUTFITS = {
    'smart-ao-dai': {
        description: 'Áo Dài with integrated LED patterns, temperature-regulating fabric',
        keywords: ['traditional silhouette', 'smart textile', 'subtle light patterns', 'modern cut']
    },
    'neo-traditional': {
        description: 'Fusion of Áo tấc and futuristic materials',
        keywords: ['royal heritage', 'holographic embroidery', 'metallic accents']
    },
    'sustainable-silk': {
        description: 'Bio-engineered silk with cultural motifs',
        keywords: ['eco-friendly', 'traditional patterns', 'living fabric']
    }
};
```

## 4. API Contracts

```typescript
// POST /api/modules/cultural-evolution/generate
interface CulturalEvolutionRequest {
    sessionId: string;
    faceImageUrl: string; // Uploaded by user
    outfitStyle: 'smart-ao-dai' | 'neo-traditional' | 'sustainable-silk';
    gender: 'male' | 'female' | 'other';
}

interface CulturalEvolutionResponse {
    imageUrl: string;
    ageProgressionUrl: string; // Intermediate step
    prompt: string;
}
```

## 5. Image Generation Prompt

```typescript
const buildCulturalPrompt = (params: CulturalEvolutionRequest): string => {
    return `
        Professional portrait of a Vietnamese ${params.gender} in 2045,
        wearing ${FUTURE_OUTFITS[params.outfitStyle].description},
        ${FUTURE_OUTFITS[params.outfitStyle].keywords.join(', ')},
        Vietnam 2045 architectural background,
        studio lighting, fashion photography,
        cultural preservation meets innovation,
        photorealistic, 8k
    `.trim();
};
```

## 6. Privacy & Security

```sql
-- Store uploaded faces in private bucket
CREATE TABLE uploaded_faces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    file_path TEXT NOT NULL, -- private bucket
    deleted_at TIMESTAMPTZ, -- Auto-delete after 7 days
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-delete policy
CREATE OR REPLACE FUNCTION auto_delete_faces()
RETURNS void AS $$
BEGIN
    UPDATE uploaded_faces
    SET deleted_at = NOW()
    WHERE created_at < NOW() - INTERVAL '7 days'
    AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql;
```

## 7. Cost & Pricing

- Free tier: ❌ Not available
- Premium tier: 5 generations/month included
- Additional: 10,000đ/generation

---

**Tài liệu liên quan:**
- [HLD-AI-IMAGE-GENERATION.md](./HLD-AI-IMAGE-GENERATION.md)
- [HLD-UM-SUBSCRIPTION.md](./HLD-UM-SUBSCRIPTION.md)
