# COMPONENT VIEW - KYNGUYENAI.VN

# TỔNG QUAN KIẾN TRÚC HỆ THỐNG

## 1. Kiến trúc Tổng quan

kynguyenAI.vn được thiết kế theo mô hình **Frontend-First Architecture** với **Serverless Backend**, tận dụng tối đa sức mạnh của Next.js 15 App Router và các AI APIs bên thứ ba.

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           KYNGUYENAI.VN - SYSTEM ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              CLIENT LAYER                                        │ │
│  │  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                │ │
│  │  │   Web Browser   │   │  Mobile Browser │   │   Social Share  │                │ │
│  │  │   (Desktop)     │   │   (Responsive)  │   │   (OG Preview)  │                │ │
│  │  └────────┬────────┘   └────────┬────────┘   └────────┬────────┘                │ │
│  │           │                     │                     │                          │ │
│  │           └─────────────────────┴─────────────────────┘                          │ │
│  │                                 │                                                 │ │
│  └─────────────────────────────────┼─────────────────────────────────────────────────┘ │
│                                    │                                                   │
│                                    ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│  │                         FRONTEND APPLICATION LAYER                               │ │
│  │                              (Next.js 15 App Router)                             │ │
│  │  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                │ │
│  │  │  Journey Pages  │   │  Chatbot UI     │   │  Admin Panel    │                │ │
│  │  │  (Scrollytelling│   │  (Future Self)  │   │  (Prompt Mgmt)  │                │ │
│  │  └────────┬────────┘   └────────┬────────┘   └────────┬────────┘                │ │
│  │           │                     │                     │                          │ │
│  │  ┌────────┴─────────────────────┴─────────────────────┴────────┐                │ │
│  │  │              REACT COMPONENTS + STATE (Zustand)              │                │ │
│  │  └──────────────────────────────┬───────────────────────────────┘                │ │
│  │                                 │                                                 │ │
│  │  ┌──────────────────────────────┴───────────────────────────────┐                │ │
│  │  │           ANIMATION LAYER (GSAP + React Three Fiber)         │                │ │
│  │  └──────────────────────────────────────────────────────────────┘                │ │
│  └─────────────────────────────────┼─────────────────────────────────────────────────┘ │
│                                    │                                                   │
│                                    ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              BFF LAYER                                           │ │
│  │                       (Next.js API Routes + Edge Functions)                      │ │
│  │  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                │ │
│  │  │ /api/journey/*  │   │ /api/ai/*       │   │ /api/chat/*     │                │ │
│  │  │ Journey APIs    │   │ AI Orchestrator │   │ Chatbot APIs    │                │ │
│  │  └────────┬────────┘   └────────┬────────┘   └────────┬────────┘                │ │
│  │           │                     │                     │                          │ │
│  │  ┌────────┴─────────────────────┴─────────────────────┴────────┐                │ │
│  │  │              Vercel AI SDK (Core + UI)                       │                │ │
│  │  │              - streamText(), streamObject()                  │                │ │
│  │  │              - useChat(), useCompletion()                    │                │ │
│  │  └──────────────────────────────┬───────────────────────────────┘                │ │
│  └─────────────────────────────────┼─────────────────────────────────────────────────┘ │
│                                    │                                                   │
│         ┌──────────────────────────┼──────────────────────────┐                       │
│         │                          │                          │                       │
│         ▼                          ▼                          ▼                       │
│  ┌─────────────────┐   ┌─────────────────────┐   ┌─────────────────┐                 │
│  │  AI PROVIDERS   │   │    DATA LAYER       │   │  STORAGE LAYER  │                 │
│  │  ─────────────  │   │    ───────────      │   │  ─────────────  │                 │
│  │  • OpenAI       │   │  Supabase           │   │  Supabase       │                 │
│  │  • Anthropic    │   │  • PostgreSQL       │   │  Storage        │                 │
│  │  • Replicate    │   │  • pgvector (RAG)   │   │  • Images       │                 │
│  │  • Fal.ai       │   │  • Auth             │   │  • Postcards    │                 │
│  └─────────────────┘   └─────────────────────┘   └─────────────────┘                 │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. COMPONENT BREAKDOWN

### 2.1 Client Layer

| Component | Technology | Mô tả |
|-----------|-----------|-------|
| **Web Browser (Desktop)** | Modern browsers | Chrome, Firefox, Safari, Edge - hỗ trợ WebGL, CSS animations |
| **Mobile Browser** | Responsive design | iOS Safari, Chrome Android - touch-optimized scrollytelling |
| **Social Share Preview** | Open Graph meta | Facebook, Twitter, LinkedIn preview cards với generated images |

### 2.2 Frontend Application Layer

| Component | Technology | Mô tả |
|-----------|-----------|-------|
| **kynguyenai-web** | Next.js 15 (App Router) | Main application với React Server Components |
| **Journey Pages** | React + GSAP | Scrollytelling experience với timeline-based animations |
| **Chatbot UI** | React + Vercel AI SDK UI | Real-time streaming chat interface |
| **Admin Panel** | React + Shadcn/ui | Quản lý prompts, knowledge base, analytics |
| **State Management** | Zustand | Global state cho journey progress, user choices |
| **Animation Layer** | GSAP ScrollTrigger | Parallax effects, timeline synchronization |
| **3D Visualization** | React Three Fiber | Optional 3D globe/map trên landing page |

### 2.3 BFF Layer (Backend for Frontend)

| API Route | Chức năng | Technology |
|-----------|-----------|------------|
| **/api/journey/start** | Khởi tạo journey session | Edge Function |
| **/api/journey/milestone** | Lấy narrative cho từng cột mốc năm | Edge Function + Streaming |
| **/api/ai/generate-narrative** | Generate text với LLM | Vercel AI SDK + OpenAI/Anthropic |
| **/api/ai/generate-postcard** | Generate image với Flux/DALL-E | Edge Function + Replicate/Fal.ai |
| **/api/chat/message** | Streaming chat response | Vercel AI SDK + RAG |
| **/api/subscription/check** | Kiểm tra quota và tier | Edge Function + Supabase |

### 2.4 AI Provider Layer

| Provider | Model | Use Case | Cost |
|----------|-------|----------|------|
| **OpenAI** | GPT-4o | Logic/data tasks, Vietnamese text | ~$2.5/1M input tokens |
| **Anthropic** | Claude 3.5 Sonnet | Storytelling, creative writing | ~$3/1M input tokens |
| **Replicate** | Flux.1 Pro | High-quality image generation | ~$0.05/image |
| **Fal.ai** | Flux.1 Pro | Alternative image provider | ~$0.04/image |
| **Groq/DeepInfra** | SDXL Turbo | Fast low-quality images (free tier) | ~$0.001/image |

### 2.5 Data Layer

| Component | Technology | Mô tả |
|-----------|-----------|-------|
| **Supabase PostgreSQL** | PostgreSQL 15 | Primary database cho users, journeys, subscriptions |
| **pgvector Extension** | pgvector | Vector embeddings cho RAG chatbot |
| **Supabase Auth** | Built-in Auth | Authentication với social providers |
| **Row Level Security** | PostgreSQL RLS | Data isolation per user |

### 2.6 Storage Layer

| Bucket | Content Type | Access |
|--------|-------------|--------|
| **postcards** | Generated AI images | Public (with watermark) |
| **user-uploads** | Face photos (Cultural Evolution module) | Private per user |
| **assets** | Static assets, pre-rendered backgrounds | Public CDN |

---

## 3. FRONTEND COMPONENTS DETAIL

### 3.1 Page Structure (Next.js App Router)

```
app/
├── (marketing)/
│   ├── page.tsx                    # Landing page với 3D globe
│   └── layout.tsx                  # Marketing layout
│
├── (journey)/
│   ├── journey/
│   │   ├── page.tsx               # Journey configuration
│   │   └── [sessionId]/
│   │       ├── page.tsx           # Main scrollytelling experience
│   │       └── postcard/
│   │           └── page.tsx       # Final postcard reveal
│   └── layout.tsx                 # Journey layout (no header/footer)
│
├── (modules)/
│   ├── city-dreamer/
│   │   └── page.tsx               # City Dreamer module
│   ├── cultural-evolution/
│   │   └── page.tsx               # Cultural Evolution module
│   └── future-workforce/
│       └── page.tsx               # Future Workforce module
│
├── (chat)/
│   └── chat/
│       └── [sessionId]/
│           └── page.tsx           # Chatbot interface
│
├── (admin)/
│   └── admin/
│       ├── prompts/
│       │   └── page.tsx           # Prompt management
│       ├── knowledge/
│       │   └── page.tsx           # Knowledge base management
│       └── analytics/
│           └── page.tsx           # Dashboard
│
├── api/
│   ├── journey/
│   │   ├── start/route.ts
│   │   └── milestone/route.ts
│   ├── ai/
│   │   ├── generate-narrative/route.ts
│   │   └── generate-postcard/route.ts
│   ├── chat/
│   │   └── message/route.ts
│   └── subscription/
│       └── check/route.ts
│
└── layout.tsx                      # Root layout
```

### 3.2 React Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENT HIERARCHY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  <RootLayout>                                                    │
│  ├── <Providers>                                                 │
│  │   ├── <ZustandProvider>      # State management               │
│  │   ├── <SupabaseProvider>     # Auth context                   │
│  │   └── <ThemeProvider>        # Dark/light mode                │
│  │                                                               │
│  ├── <LandingPage>                                               │
│  │   ├── <GlobeVisualization>   # React Three Fiber              │
│  │   ├── <HeroSection>          # CTA + intro text               │
│  │   └── <LocationPicker>       # Can Gio, Thu Duc, Hanoi        │
│  │                                                               │
│  ├── <JourneyPage>                                               │
│  │   ├── <JourneyConfig>        # User input form                │
│  │   │   ├── <LocationSelect>                                    │
│  │   │   ├── <ProfessionSelect>                                  │
│  │   │   └── <LifestyleSelect>                                   │
│  │   │                                                           │
│  │   ├── <ScrollytellingContainer>                               │
│  │   │   ├── <TimelineIndicator> # Year display (2026-2045)      │
│  │   │   ├── <ParallaxSection>   # GSAP ScrollTrigger sections   │
│  │   │   │   ├── <BackgroundLayer>                               │
│  │   │   │   ├── <ContentLayer>                                  │
│  │   │   │   └── <ForegroundLayer>                               │
│  │   │   └── <NarrativeText>     # AI-generated streaming text   │
│  │   │                                                           │
│  │   └── <PostcardReveal>                                        │
│  │       ├── <LoadingAnimation>  # While image generates         │
│  │       ├── <PostcardDisplay>   # Final image                   │
│  │       └── <ShareButtons>      # Social share CTAs             │
│  │                                                               │
│  ├── <ChatPage>                                                  │
│  │   ├── <ChatHeader>           # "Bản thể Tương lai"            │
│  │   ├── <MessageList>          # Chat history                   │
│  │   │   ├── <UserMessage>                                       │
│  │   │   └── <AIMessage>        # Streaming response             │
│  │   └── <ChatInput>            # Message input                  │
│  │                                                               │
│  └── <ModulePages>                                               │
│      ├── <CityDreamer>                                           │
│      ├── <CulturalEvolution>                                     │
│      └── <FutureWorkforce>                                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 State Management (Zustand Stores)

```typescript
// stores/journeyStore.ts
interface JourneyState {
  // Session
  sessionId: string | null;

  // User Choices
  location: 'can-gio' | 'thu-duc' | 'hanoi' | null;
  profession: string | null;
  lifestyle: 'peaceful' | 'vibrant' | 'connected' | null;

  // Progress
  currentYear: number;  // 2026 - 2045
  scrollProgress: number;  // 0 - 100

  // Generated Content
  milestones: Map<number, MilestoneContent>;
  postcard: GeneratedPostcard | null;

  // Actions
  startJourney: () => Promise<void>;
  updateProgress: (year: number, scroll: number) => void;
  generateMilestone: (year: number) => Promise<void>;
  generatePostcard: () => Promise<void>;
}

// stores/chatStore.ts
interface ChatState {
  sessionId: string | null;
  messages: ChatMessage[];
  isStreaming: boolean;

  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
}

// stores/userStore.ts
interface UserState {
  user: User | null;
  subscription: SubscriptionTier;
  dailyUsage: UsageQuota;

  checkQuota: () => Promise<boolean>;
  incrementUsage: () => void;
}
```

---

## 4. ANIMATION & VISUALIZATION LAYER

### 4.1 GSAP ScrollTrigger Configuration

```typescript
// Scrollytelling Timeline Structure
const journeyTimeline = {
  sections: [
    {
      year: 2026,
      scrollStart: 0,
      scrollEnd: 10,
      background: 'present-day',
      filter: 'desaturated',
      content: 'introduction'
    },
    {
      year: 2030,
      scrollStart: 10,
      scrollEnd: 30,
      background: 'early-future',
      filter: 'blueprint',
      content: 'milestone-2030'
    },
    {
      year: 2035,
      scrollStart: 30,
      scrollEnd: 50,
      background: 'mid-future',
      filter: 'wireframe',
      content: 'milestone-2035'
    },
    {
      year: 2040,
      scrollStart: 50,
      scrollEnd: 70,
      background: 'near-future',
      filter: 'colorizing',
      content: 'milestone-2040'
    },
    {
      year: 2045,
      scrollStart: 70,
      scrollEnd: 100,
      background: 'solarpunk',
      filter: 'full-color',
      content: 'finale'
    }
  ]
};
```

### 4.2 React Three Fiber Globe (Optional)

```typescript
// components/GlobeVisualization.tsx
interface GlobeProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  cameraPosition: [number, number, number];
}

// Locations to highlight
const vietnamLocations = [
  { id: 'can-gio', name: 'Cần Giờ', lat: 10.4113, lng: 106.9564, color: '#00ff88' },
  { id: 'thu-duc', name: 'Thủ Đức', lat: 10.8517, lng: 106.7533, color: '#ff6b00' },
  { id: 'hanoi', name: 'Hà Nội', lat: 21.0285, lng: 105.8542, color: '#ffcc00' }
];
```

---

## 5. API LAYER DETAIL

### 5.1 Journey APIs

```
┌─────────────────────────────────────────────────────────────────┐
│                      JOURNEY API FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   POST /api/journey/start                                        │
│   ─────────────────────                                          │
│   Request: { location, profession, lifestyle }                   │
│   Response: { sessionId, estimatedDuration }                     │
│                                                                   │
│                          │                                        │
│                          ▼                                        │
│                                                                   │
│   GET /api/journey/milestone?sessionId=xxx&year=2030             │
│   ──────────────────────────────────────────────                 │
│   Response: SSE Stream of narrative text                         │
│   Headers: Content-Type: text/event-stream                       │
│                                                                   │
│                          │                                        │
│                          ▼                                        │
│                                                                   │
│   POST /api/ai/generate-postcard                                 │
│   ──────────────────────────────                                 │
│   Request: { sessionId, resolution: '1080' | '4k' }              │
│   Response: { imageUrl, thumbnailUrl, shareUrl }                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 AI Orchestration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   AI ORCHESTRATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   User Request                                                   │
│        │                                                          │
│        ▼                                                          │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              PROMPT BUILDER                              │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  1. Load base template from Knowledge Base               │   │
│   │  2. Inject location-specific data (Can Gio, Thu Duc...)  │   │
│   │  3. Add user context (profession, lifestyle)             │   │
│   │  4. Apply Solarpunk aesthetic guidelines                 │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              MODEL ROUTER                                │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  Text Generation:                                        │   │
│   │    - Claude 3.5 Sonnet (creative/storytelling)          │   │
│   │    - GPT-4o (data/logic tasks)                          │   │
│   │                                                          │   │
│   │  Image Generation:                                       │   │
│   │    - Flux Pro (high quality, paid)                       │   │
│   │    - SDXL Turbo (fast preview, free tier)               │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              RESPONSE PROCESSOR                          │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  1. Stream text to frontend (useChat/useCompletion)      │   │
│   │  2. Cache completed responses (Redis/in-memory)          │   │
│   │  3. Apply watermark to images                            │   │
│   │  4. Store in Supabase Storage                            │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 RAG Architecture for Chatbot

```
┌─────────────────────────────────────────────────────────────────┐
│                    RAG CHATBOT FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   User Question: "Chất lượng không khí năm 2045 thế nào?"       │
│        │                                                          │
│        ▼                                                          │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              EMBEDDING GENERATION                        │   │
│   │  OpenAI text-embedding-3-small                          │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              VECTOR SEARCH (pgvector)                    │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  SELECT * FROM knowledge_embeddings                      │   │
│   │  ORDER BY embedding <-> $query_embedding                 │   │
│   │  LIMIT 5;                                                │   │
│   │                                                          │   │
│   │  Retrieved Context:                                      │   │
│   │  - Quy hoạch môi trường Thủ Đức 2045                    │   │
│   │  - Chỉ tiêu Net Zero của Việt Nam                       │   │
│   │  - Dự báo chất lượng không khí                          │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              AUGMENTED PROMPT                            │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  System: "Bạn là Bản thể Tương lai của user..."         │   │
│   │  Context: [Retrieved documents]                          │   │
│   │  User: "Chất lượng không khí năm 2045 thế nào?"         │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              LLM RESPONSE (Streaming)                    │   │
│   │  Claude 3.5 Sonnet generates in-character response      │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. DATA LAYER DETAIL

### 6.1 Database Schema Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE SCHEMA                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌─────────────────┐      ┌─────────────────┐                  │
│   │     users       │      │  subscriptions  │                  │
│   │  ─────────────  │      │  ─────────────  │                  │
│   │  id (PK)        │◄────►│  user_id (FK)   │                  │
│   │  email          │      │  tier           │                  │
│   │  created_at     │      │  expires_at     │                  │
│   └────────┬────────┘      └─────────────────┘                  │
│            │                                                      │
│            │ 1:N                                                  │
│            ▼                                                      │
│   ┌─────────────────┐      ┌─────────────────┐                  │
│   │ journey_sessions│      │  daily_usage    │                  │
│   │  ─────────────  │      │  ─────────────  │                  │
│   │  id (PK)        │      │  user_id (FK)   │                  │
│   │  user_id (FK)   │      │  date           │                  │
│   │  location       │      │  generations    │                  │
│   │  profession     │      │  images         │                  │
│   │  lifestyle      │      └─────────────────┘                  │
│   │  current_year   │                                            │
│   │  completed      │                                            │
│   └────────┬────────┘                                            │
│            │                                                      │
│            │ 1:N                                                  │
│            ▼                                                      │
│   ┌─────────────────┐      ┌─────────────────┐                  │
│   │   milestones    │      │   postcards     │                  │
│   │  ─────────────  │      │  ─────────────  │                  │
│   │  session_id(FK) │      │  session_id(FK) │                  │
│   │  year           │      │  image_url      │                  │
│   │  narrative      │      │  thumbnail_url  │                  │
│   │  generated_at   │      │  prompt_used    │                  │
│   └─────────────────┘      │  shared_count   │                  │
│                            └─────────────────┘                  │
│                                                                   │
│   ┌─────────────────┐      ┌─────────────────┐                  │
│   │ chat_sessions   │      │ chat_messages   │                  │
│   │  ─────────────  │      │  ─────────────  │                  │
│   │  id (PK)        │◄────►│  session_id(FK) │                  │
│   │  journey_id(FK) │      │  role           │                  │
│   │  created_at     │      │  content        │                  │
│   └─────────────────┘      │  created_at     │                  │
│                            └─────────────────┘                  │
│                                                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              KNOWLEDGE BASE TABLES                       │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  locations: id, name, description, planning_data        │   │
│   │  milestones_template: location_id, year, template       │   │
│   │  knowledge_embeddings: id, content, embedding (vector)  │   │
│   │  prompt_templates: id, type, template, variables        │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Key Tables DDL

```sql
-- Journey Sessions
CREATE TABLE journey_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  location VARCHAR(50) NOT NULL,
  profession VARCHAR(100) NOT NULL,
  lifestyle VARCHAR(50) NOT NULL,
  current_year INTEGER DEFAULT 2026,
  scroll_progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge Embeddings for RAG
CREATE TABLE knowledge_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding vector(1536),  -- OpenAI embedding dimension
  metadata JSONB,
  location VARCHAR(50),
  category VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for vector similarity search
CREATE INDEX ON knowledge_embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

---

## 7. EXTERNAL INTEGRATIONS

### 7.1 AI Provider Integration Matrix

| Provider | API | Auth Method | Rate Limit | Fallback |
|----------|-----|-------------|------------|----------|
| **OpenAI** | REST + Streaming | API Key (env) | 10,000 RPM | Anthropic |
| **Anthropic** | REST + Streaming | API Key (env) | 4,000 RPM | OpenAI |
| **Replicate** | REST + Webhooks | API Token | 600/hour | Fal.ai |
| **Fal.ai** | REST | API Key | 1000/hour | Replicate |
| **Groq** | REST + Streaming | API Key | 30 RPM | DeepInfra |

### 7.2 Payment Integration (Future)

| Provider | Use Case | Integration Type |
|----------|----------|-----------------|
| **MoMo** | Vietnam mobile payment | REST API + Webhooks |
| **ZaloPay** | Vietnam mobile payment | REST API + Webhooks |
| **Stripe** | International cards | Stripe SDK |

### 7.3 Social Share Integration

| Platform | Feature | Implementation |
|----------|---------|----------------|
| **Facebook** | Share postcard | Open Graph meta tags + Share Dialog |
| **Twitter/X** | Share postcard | Twitter Cards meta + Web Intent |
| **TikTok** | Share video (future) | TikTok Share Kit |
| **LinkedIn** | Share journey summary | LinkedIn Share API |

---

## 8. DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    VERCEL PLATFORM                       │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │                                                          │   │
│   │  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   │   │
│   │  │   Edge      │   │  Serverless │   │   Static    │   │   │
│   │  │  Functions  │   │  Functions  │   │   Assets    │   │   │
│   │  │  (Global)   │   │  (Regional) │   │   (CDN)     │   │   │
│   │  └─────────────┘   └─────────────┘   └─────────────┘   │   │
│   │        │                 │                 │             │   │
│   │        └─────────────────┴─────────────────┘             │   │
│   │                          │                               │   │
│   │                    Vercel Edge Network                   │   │
│   │                                                          │   │
│   └──────────────────────────┬──────────────────────────────┘   │
│                              │                                    │
│         ┌────────────────────┼────────────────────┐              │
│         │                    │                    │              │
│         ▼                    ▼                    ▼              │
│   ┌───────────┐       ┌───────────┐       ┌───────────┐         │
│   │ Supabase  │       │ AI APIs   │       │ Analytics │         │
│   │ (AWS)     │       │ (Various) │       │ (Vercel)  │         │
│   │           │       │           │       │           │         │
│   │ •PostgreSQL       │ •OpenAI   │       │ •Web      │         │
│   │ •pgvector │       │ •Anthropic│       │  Analytics│         │
│   │ •Storage  │       │ •Replicate│       │ •Speed    │         │
│   │ •Auth     │       │ •Fal.ai   │       │  Insights │         │
│   └───────────┘       └───────────┘       └───────────┘         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 8.1 Environment Configuration

| Environment | Domain | Supabase Project | AI Keys |
|-------------|--------|------------------|---------|
| **Development** | localhost:3000 | kynguyenai-dev | Test keys |
| **Staging** | staging.kynguyenai.vn | kynguyenai-staging | Test keys |
| **Production** | kynguyenai.vn | kynguyenai-prod | Production keys |

### 8.2 CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                      CI/CD PIPELINE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   GitHub Push                                                    │
│        │                                                          │
│        ▼                                                          │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │   GitHub Actions                                         │   │
│   │   ───────────────                                        │   │
│   │   1. Install dependencies (pnpm)                         │   │
│   │   2. Run TypeScript check                                │   │
│   │   3. Run ESLint                                          │   │
│   │   4. Run unit tests (Vitest)                             │   │
│   │   5. Build Next.js                                       │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │   Vercel Deployment                                      │   │
│   │   ─────────────────                                      │   │
│   │   • Preview deployment (PR branches)                     │   │
│   │   • Production deployment (main branch)                  │   │
│   │   • Environment variables from Vercel dashboard          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. SECURITY CONSIDERATIONS

### 9.1 API Key Protection

| Key Type | Storage | Access |
|----------|---------|--------|
| AI Provider Keys | Vercel Environment Variables | Server-side only (API Routes) |
| Supabase Anon Key | Public (client-side) | RLS protected |
| Supabase Service Key | Vercel Environment Variables | Server-side only |

### 9.2 Rate Limiting Strategy

| Endpoint | Free Tier | Premium Tier |
|----------|-----------|--------------|
| /api/journey/start | 3/day | Unlimited |
| /api/ai/generate-narrative | 10/day | Unlimited |
| /api/ai/generate-postcard | 3/day | 20/day |
| /api/chat/message | 50/day | 500/day |

### 9.3 Content Moderation

| Content Type | Moderation | Action |
|--------------|------------|--------|
| User uploads (face photos) | AWS Rekognition | Block inappropriate content |
| AI-generated images | Provider built-in filters | Flag for review |
| Chat messages | Keyword filter + AI moderation | Warn user |

---

## 10. PERFORMANCE OPTIMIZATION

### 10.1 Frontend Optimizations

| Technique | Implementation | Impact |
|-----------|---------------|--------|
| **Code Splitting** | Next.js App Router auto-splitting | Reduce initial bundle |
| **Image Optimization** | next/image + Vercel Image Optimization | Faster image loading |
| **Font Optimization** | next/font with subsets | No layout shift |
| **Prefetching** | Link prefetch for journey sections | Instant navigation |

### 10.2 API Optimizations

| Technique | Implementation | Impact |
|-----------|---------------|--------|
| **Streaming** | Vercel AI SDK streaming | Perceived performance |
| **Caching** | SWR + Edge caching | Reduce API calls |
| **Queue System** | Image generation queue | Handle burst traffic |
| **CDN** | Supabase Storage + Vercel Edge | Fast asset delivery |

---

**Tài liệu liên quan:**
- [BusinessContextVision-KynguyenAI.md](./BusinessContextVision-KynguyenAI.md) - Tầm nhìn kinh doanh
- [Tech-Stack-KynguyenAI.md](./Tech-Stack-KynguyenAI.md) - Chi tiết công nghệ
- [HLD-TM-JOURNEY.md](../HLD/KynguyenAI.MVP.1/HLD-TM-JOURNEY.md) - Journey Experience HLD
