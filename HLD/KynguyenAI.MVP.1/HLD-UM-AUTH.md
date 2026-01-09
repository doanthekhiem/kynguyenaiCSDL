# HLD - UM-AUTH (User Management - Authentication)

## 1. Bối cảnh

**Authentication System** sử dụng Supabase Auth với support cho social login (Google, Facebook) và magic link.

## 2. Auth Flows

### 2.1 Anonymous → Registered Flow

```
User visits ──► Uses free tier (3/day)
    │
    └──► Wants more ──► Sign up ──► Premium tier
```

### 2.2 Supabase Auth Integration

```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/ssr';

export const supabase = createClientComponentClient();

// Sign in with Google
await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
        redirectTo: `${location.origin}/auth/callback`
    }
});

// Sign in with email magic link
await supabase.auth.signInWithOtp({
    email: 'user@example.com',
    options: {
        emailRedirectTo: `${location.origin}/auth/callback`
    }
});
```

## 3. Database Schema

```sql
-- Users table (Supabase built-in)
-- auth.users automatically managed

-- User Preferences
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    default_location VARCHAR(50),
    notification_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 4. RLS Policies

```sql
-- Journey sessions - users can only see their own
CREATE POLICY "Users can view own journeys"
  ON journey_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own journeys"
  ON journey_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 5. Anonymous User Tracking

```typescript
// For anonymous users, use fingerprint or session ID
const getAnonymousId = () => {
    let id = localStorage.getItem('anonymous_id');
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('anonymous_id', id);
    }
    return id;
};
```

---

**Tài liệu liên quan:**
- [HLD-UM-SUBSCRIPTION.md](./HLD-UM-SUBSCRIPTION.md)
- [HLD-TM-JOURNEY.md](./HLD-TM-JOURNEY.md)
