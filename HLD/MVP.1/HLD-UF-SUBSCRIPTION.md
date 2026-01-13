# HLD-UF-SUBSCRIPTION - Đăng ký Newsletter

> **Phiên bản**: 2.0 - Đơn giản hóa cho MVP
> **Cập nhật**: 26/12/2024
> **Thay đổi chính**: Dùng Airtable thay vì PostgreSQL, Newsletter là phase sau

---

## 1. Trạng thái: DEFERRED

**Lưu ý:** Tính năng Newsletter đầy đủ được hoãn lại cho phase sau. MVP chỉ thu thập email subscribers.

### 1.1 MVP Scope

- ✅ Thu thập email subscribers (lưu vào Airtable)
- ✅ Form đăng ký đơn giản trên homepage
- ❌ Double opt-in confirmation (phase sau)
- ❌ Gửi newsletter tự động (phase sau)
- ❌ Email tracking/analytics (phase sau)

---

## 2. Kiến trúc MVP

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SUBSCRIPTION (MVP - Simple)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────────────────────────────────────────────────┐      │
│   │                    HOMEPAGE                               │      │
│   │                                                           │      │
│   │   ┌─────────────────────────────────────────────┐        │      │
│   │   │     📧 Đăng ký nhận tin tức AI              │        │      │
│   │   │     [email@example.com] [Đăng ký]           │        │      │
│   │   └─────────────────────────────────────────────┘        │      │
│   │                                                           │      │
│   └──────────────────────────────────────────────────────────┘      │
│                              │                                       │
│                              ▼                                       │
│   ┌──────────────────────────────────────────────────────────┐      │
│   │              POST /api/subscribe                          │      │
│   │                                                           │      │
│   │   1. Validate email format                               │      │
│   │   2. Check duplicate in Airtable                         │      │
│   │   3. Save to Airtable (status: pending)                  │      │
│   │   4. Return success message                              │      │
│   │                                                           │      │
│   └──────────────────────────────────────────────────────────┘      │
│                              │                                       │
│                              ▼                                       │
│   ┌──────────────────────────────────────────────────────────┐      │
│   │              AIRTABLE: Subscribers                        │      │
│   │                                                           │      │
│   │   | email              | status  | subscribed_at        | │      │
│   │   |--------------------|---------|----------------------| │      │
│   │   | user@example.com   | pending | 2024-12-26T10:00:00  | │      │
│   │                                                           │      │
│   └──────────────────────────────────────────────────────────┘      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Airtable Schema

### Table: Subscribers

| Field | Type | Mô tả |
|-------|------|-------|
| email | Email | Primary field |
| status | Single select | pending, confirmed |
| subscribed_at | Date | Include time |

**Lưu ý:** Schema đơn giản hóa tối đa. Các fields như `name`, `preferences`, `confirm_token`, v.v. sẽ được thêm ở phase sau.

---

## 4. Implementation

### 4.1 API Route

```typescript
// app/api/subscribe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { subscribersTable } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // 1. Validate email format
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // 2. Check duplicate
    const existing = await subscribersTable.select({
      filterByFormula: `{email} = "${email.toLowerCase()}"`,
      maxRecords: 1,
    }).firstPage();

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Email đã được đăng ký' },
        { status: 400 }
      );
    }

    // 3. Save to Airtable
    await subscribersTable.create({
      email: email.toLowerCase(),
      status: 'pending',
      subscribed_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công! Cảm ơn bạn đã quan tâm.',
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### 4.2 Subscribe Form Component

```typescript
// components/subscribe-form.tsx

'use client';

import { useState } from 'react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch {
      setStatus('error');
      setMessage('Có lỗi xảy ra, vui lòng thử lại');
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">
        📧 Đăng ký nhận tin tức AI
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Nhận bản tin AI mới nhất mỗi tuần
      </p>

      {status === 'success' ? (
        <p className="text-green-600 text-sm">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {status === 'loading' ? '...' : 'Đăng ký'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">{message}</p>
      )}
    </div>
  );
}
```

---

## 5. Đã loại bỏ (Phase sau)

Các thành phần sau sẽ được triển khai ở phase sau khi có đủ subscribers:

- ❌ Double opt-in flow (confirmation email)
- ❌ Resend/SendGrid integration
- ❌ Email templates (React Email)
- ❌ Campaign management
- ❌ Open/click tracking
- ❌ Unsubscribe handling
- ❌ Preference management
- ❌ PostgreSQL tables (newsletter_subscriber, newsletter_campaign, etc.)
- ❌ Weekly newsletter cron job

---

## 6. Kế hoạch Triển khai Newsletter (Phase sau)

Khi có đủ subscribers (~100+):

### 6.1 Phase 2: Basic Newsletter

```
MVP                          →  Phase 2
──────────────────────────────────────────────────
Airtable Subscribers         →  Supabase + Resend
No confirmation              →  Double opt-in
Manual export                →  Automated weekly email
No tracking                  →  Open/click tracking
```

### 6.2 Phase 2 Stack

| Component | Technology |
|-----------|------------|
| Email Service | Resend (free tier: 3000 emails/month) |
| Templates | React Email |
| Scheduling | Vercel Cron |
| Tracking | Resend built-in analytics |

### 6.3 Estimated Cost (Phase 2)

| Service | Free Tier | Paid |
|---------|-----------|------|
| Resend | 3,000 emails/month | $20/month (50k emails) |

---

## 7. Migration Path

Khi chuyển từ Airtable sang Supabase:

```typescript
// scripts/migrate-subscribers.ts

import Airtable from 'airtable';
import { createClient } from '@supabase/supabase-js';

async function migrate() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base(process.env.AIRTABLE_BASE_ID!);

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const records = await base('Subscribers').select().all();

  for (const record of records) {
    await supabase.from('newsletter_subscriber').insert({
      email: record.get('email'),
      status: record.get('status') === 'pending' ? 'PENDING' : 'CONFIRMED',
      created_at: record.get('subscribed_at'),
    });
  }

  console.log(`Migrated ${records.length} subscribers`);
}
```

---

## 8. Xem thêm

- [Design/ComponentView.md](../../Design/ComponentView.md) - Kiến trúc tổng quan
- Resend Documentation: https://resend.com/docs
- React Email: https://react.email
