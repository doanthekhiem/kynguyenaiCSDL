# HLD - UM-SUBSCRIPTION (User Management - Subscription & Freemium)

## 1. Bối cảnh

**Freemium Model** với 2 tiers: Free (3 journeys/day) và Premium (unlimited, 4K images, video motion).

## 2. Subscription Tiers

| Tier | Price | Journeys | Images | Resolution | Video |
|------|-------|----------|--------|------------|-------|
| **Free** | 0đ | 3/day | SDXL Turbo | 1080p | ❌ |
| **Premium** | 99,000đ/tháng | Unlimited | Flux Pro | 4K | ✅ (future) |

## 3. Database Schema

```sql
-- Subscription Plans
CREATE TABLE subscription_plans (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price_monthly INTEGER NOT NULL,
    features JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Subscriptions
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    plan_id VARCHAR(50) NOT NULL REFERENCES subscription_plans(id),
    status VARCHAR(30) DEFAULT 'active',
    starts_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ,
    payment_provider VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Usage Tracking
CREATE TABLE daily_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    anonymous_id VARCHAR(100),
    usage_date DATE DEFAULT CURRENT_DATE,
    journeys_count INTEGER DEFAULT 0,
    images_count INTEGER DEFAULT 0,
    UNIQUE(user_id, usage_date),
    UNIQUE(anonymous_id, usage_date)
);
```

## 4. Quota Check Logic

```typescript
const checkQuota = async (userId: string | null, anonymousId: string): Promise<boolean> => {
    // Get user subscription
    const subscription = userId
        ? await getActiveSubscription(userId)
        : null;

    // Premium users have unlimited
    if (subscription?.plan_id === 'premium') {
        return true;
    }

    // Free tier: check daily usage
    const today = new Date().toISOString().split('T')[0];
    const usage = await db.query.dailyUsage.findFirst({
        where: userId
            ? and(eq(dailyUsage.userId, userId), eq(dailyUsage.usageDate, today))
            : and(eq(dailyUsage.anonymousId, anonymousId), eq(dailyUsage.usageDate, today))
    });

    const FREE_TIER_LIMIT = 3;
    return (usage?.journeysCount || 0) < FREE_TIER_LIMIT;
};
```

## 5. Payment Integration (Future)

```typescript
// MoMo/ZaloPay integration
const createPayment = async (userId: string, planId: string) => {
    // Integration with Vietnamese payment gateways
    // MoMo, ZaloPay, VNPay
};
```

---

**Tài liệu liên quan:**
- [HLD-UM-AUTH.md](./HLD-UM-AUTH.md)
- [HLD-TM-JOURNEY.md](./HLD-TM-JOURNEY.md)
