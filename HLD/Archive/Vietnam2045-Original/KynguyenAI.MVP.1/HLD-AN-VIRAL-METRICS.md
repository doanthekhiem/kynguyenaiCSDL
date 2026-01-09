# HLD - AN-VIRAL-METRICS (Analytics - Viral Metrics & Tracking)

## 1. Bối cảnh

**Viral Metrics** theo dõi share events, referrals, và viral loop để tối ưu hóa growth.

## 2. Key Metrics

### 2.1 North Star Metric

> **Số lượng Bưu thiếp được chia sẻ lên Social Media hàng tháng**

### 2.2 Funnel Metrics

```
Landing Visits (100%)
    ↓
Start Journey (70%)
    ↓
Complete Journey (75% of starters)
    ↓
Generate Postcard (90% of completers)
    ↓
Share Postcard (20-35% of generators)
    ↓
Convert to Premium (2-5% of sharers)
```

## 3. Database Schema

```sql
-- Share Events
CREATE TABLE share_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    postcard_id UUID NOT NULL REFERENCES postcards(id),
    user_id UUID REFERENCES auth.users(id),
    platform VARCHAR(30) NOT NULL, -- facebook, twitter, linkedin, copy_link
    referrer VARCHAR(200),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_user_id UUID REFERENCES auth.users(id),
    referred_user_id UUID REFERENCES auth.users(id),
    source_postcard_id UUID REFERENCES postcards(id),
    converted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journey Completion Events
CREATE TABLE journey_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES journey_sessions(id),
    event_type VARCHAR(50) NOT NULL, -- started, milestone_reached, completed
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 4. Analytics Integration

```typescript
// Vercel Analytics
import { track } from '@vercel/analytics';

// Track share event
track('postcard_shared', {
    platform: 'facebook',
    postcardId: 'xxx',
    location: 'thu-duc'
});

// Track journey completion
track('journey_completed', {
    sessionId: 'xxx',
    duration: 245, // seconds
    location: 'thu-duc'
});
```

## 5. Viral Coefficient Calculation

```typescript
const calculateViralCoefficient = async (period: string) => {
    const newUsers = await countNewUsers(period);
    const referredUsers = await countReferredUsers(period);

    // K-factor = (invited users / total users) × conversion rate
    const kFactor = (referredUsers / newUsers) * conversionRate;

    return kFactor; // Target: > 1.0 for viral growth
};
```

## 6. Dashboard Metrics

```typescript
interface DashboardMetrics {
    // Acquisition
    monthlyActiveUsers: number;
    newSignups: number;

    // Engagement
    journeyCompletionRate: number;
    avgJourneysPerUser: number;

    // Viral
    shareRate: number;
    viralCoefficient: number;
    topSharedLocations: string[];

    // Revenue
    premiumConversionRate: number;
    monthlyRecurringRevenue: number;
}
```

---

**Tài liệu liên quan:**
- [HLD-TM-JOURNEY.md](./HLD-TM-JOURNEY.md)
- [HLD-AI-IMAGE-GENERATION.md](./HLD-AI-IMAGE-GENERATION.md)
