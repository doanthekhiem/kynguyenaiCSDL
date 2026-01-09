# HLD - TM-FUTURE-WORKFORCE (Time Machine Module - Future Workforce)

## 1. Bối cảnh

**Future Workforce** giúp người dùng (đặc biệt Gen Z) định hướng nghề nghiệp bằng cách dự đoán job title năm 2045 và vạch lộ trình học tập.

## 2. User Flow

```
User inputs current skills
    ↓
AI analyzes skill trajectory
    ↓
Predicts 2045 job title
    ↓
Generates learning roadmap
    ↓
Displays career path visualization
```

## 3. Input & Output

### 3.1 Input Parameters

```typescript
interface FutureWorkforceInput {
    currentRole: string;           // "Frontend Developer"
    skills: string[];              // ["React", "TypeScript", "Design"]
    interests: string[];           // ["AI", "Education", "Sustainability"]
    location: 'can-gio' | 'thu-duc' | 'hanoi';
}
```

### 3.2 Output Structure

```typescript
interface FutureWorkforceOutput {
    futureJobTitle: string;        // "Neural Interface Designer"
    description: string;           // Detailed job description
    salary2045: {
        min: number;
        max: number;
        currency: 'VND';
    };
    skills: {
        current: string[];         // Skills you already have
        required: string[];        // Skills you need to learn
        emerging: string[];        // New skills by 2045
    };
    learningPath: LearningStep[];
    demandScore: number;           // 0-100, job demand in 2045
}

interface LearningStep {
    year: number;                  // 2026, 2030, 2035...
    skill: string;
    resource: string;              // Course/book recommendation
    duration: string;              // "6 months"
    priority: 'critical' | 'important' | 'nice-to-have';
}
```

## 4. AI Generation

### 4.1 Structured Output with GPT-4o

```typescript
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const careerPredictionSchema = z.object({
    futureJobTitle: z.string(),
    description: z.string(),
    salary2045: z.object({
        min: z.number(),
        max: z.number(),
        currency: z.literal('VND')
    }),
    skills: z.object({
        current: z.array(z.string()),
        required: z.array(z.string()),
        emerging: z.array(z.string())
    }),
    learningPath: z.array(z.object({
        year: z.number(),
        skill: z.string(),
        resource: z.string(),
        duration: z.string(),
        priority: z.enum(['critical', 'important', 'nice-to-have'])
    })),
    demandScore: z.number().min(0).max(100)
});

const result = await generateObject({
    model: openai('gpt-4o'),
    schema: careerPredictionSchema,
    prompt: buildCareerPrompt(input)
});
```

### 4.2 Prompt Engineering

```typescript
const buildCareerPrompt = (input: FutureWorkforceInput): string => {
    const locationContext = getLocationIndustryFocus(input.location);

    return `
You are a career futurist specializing in Vietnam 2045 workforce trends.

## User Profile:
- Current Role: ${input.currentRole}
- Current Skills: ${input.skills.join(', ')}
- Interests: ${input.interests.join(', ')}
- Location: ${input.location} (${locationContext})

## Task:
Predict the user's most likely job title in 2045 and create a detailed learning roadmap.

## Guidelines:
1. Job title should be realistic but innovative
2. Salary should reflect Vietnam's GDP growth trajectory
3. Skills must show clear progression from current → future
4. Learning path should have milestones at 2026, 2030, 2035, 2040
5. Consider ${locationContext} industry focus

## Example Output Format:
{
    "futureJobTitle": "Quantum UX Architect",
    "description": "Design user experiences for quantum computing interfaces...",
    "salary2045": { "min": 80000000, "max": 150000000, "currency": "VND" },
    ...
}
    `.trim();
};
```

## 5. Visualization

### 5.1 Career Timeline UI

```
┌─────────────────────────────────────────────────────────────────┐
│           SỰ NGHIỆP TƯƠNG LAI CỦA BẠN NĂM 2045                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   2026 (Hiện tại)                                               │
│   ● Frontend Developer                                          │
│   Skills: React, TypeScript                                     │
│                                                                  │
│        │                                                         │
│        ▼  [Learn AI fundamentals - 6 months]                    │
│        │                                                         │
│   2030                                                           │
│   ● AI-Enhanced Frontend Developer                              │
│   + Machine Learning, AI Integration                            │
│                                                                  │
│        │                                                         │
│        ▼  [Master Neural Interfaces - 2 years]                  │
│        │                                                         │
│   2035                                                           │
│   ● Neural Interface Developer                                  │
│   + BCI Programming, Neuroscience Basics                        │
│                                                                  │
│        │                                                         │
│        ▼  [Specialize in Quantum UX - 3 years]                  │
│        │                                                         │
│   2045 🎯                                                        │
│   ● Quantum UX Architect                                        │
│   Salary: 80M - 150M VND/năm                                    │
│   Demand: ████████░░ 85/100                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 6. Database Schema

```sql
-- Career Predictions
CREATE TABLE career_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    session_id UUID REFERENCES journey_sessions(id),
    input JSONB NOT NULL,
    output JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Popular Future Jobs (Analytics)
CREATE MATERIALIZED VIEW popular_future_jobs AS
SELECT
    output->>'futureJobTitle' as job_title,
    COUNT(*) as prediction_count,
    AVG((output->'demandScore')::int) as avg_demand
FROM career_predictions
GROUP BY output->>'futureJobTitle'
ORDER BY prediction_count DESC;
```

## 7. Integration Points

- **Knowledge Base:** Industry trends data for Vietnam 2045
- **Journey Service:** Use profession from journey as current role
- **Analytics:** Track most predicted jobs

---

**Tài liệu liên quan:**
- [HLD-AI-TEXT-GENERATION.md](./HLD-AI-TEXT-GENERATION.md)
- [HLD-TM-JOURNEY.md](./HLD-TM-JOURNEY.md)
- [HLD-CM-KNOWLEDGE-BASE.md](./HLD-CM-KNOWLEDGE-BASE.md)
