# HLD - UX-SCROLLYTELLING (User Experience - Scrollytelling Animation Engine)

## 1. Bối cảnh

**Scrollytelling Engine** sử dụng GSAP ScrollTrigger để tạo trải nghiệm animation dựa trên scroll, đồng bộ hóa timeline với vị trí cuộn từ 2026→2045.

## 2. Tech Stack

- **GSAP ScrollTrigger**: Scroll-based animation triggers
- **React hooks**: useGSAP, useLayoutEffect
- **Zustand**: Animation state management

## 3. Animation Timeline

```typescript
const JOURNEY_TIMELINE = {
    sections: [
        { year: 2026, scroll: 0-10, theme: 'present', filter: 'desaturate(80%)' },
        { year: 2030, scroll: 10-30, theme: 'early-future', filter: 'blueprint' },
        { year: 2035, scroll: 30-50, theme: 'mid-future', filter: 'wireframe' },
        { year: 2040, scroll: 50-70, theme: 'near-future', filter: 'partial-color' },
        { year: 2045, scroll: 70-100, theme: 'solarpunk', filter: 'full-color' }
    ]
};
```

## 4. Implementation

```typescript
'use client';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export function ScrollytellingContainer() {
    useGSAP(() => {
        // Timeline indicator animation
        gsap.to('.year-indicator', {
            scrollTrigger: {
                trigger: '.journey-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    const year = Math.floor(2026 + (self.progress * 19));
                    updateYearIndicator(year);
                }
            }
        });

        // Parallax layers
        gsap.to('.background-layer', {
            y: -500,
            scrollTrigger: {
                trigger: '.journey-container',
                scrub: 2
            }
        });

        gsap.to('.content-layer', {
            y: -200,
            scrollTrigger: {
                trigger: '.journey-container',
                scrub: 1
            }
        });
    });

    return <div className="journey-container">{/* Content */}</div>;
}
```

## 5. Performance Targets

| Metric | Target |
|--------|--------|
| **Scroll FPS** | 60fps |
| **GSAP overhead** | < 16ms per frame |
| **Mobile performance** | Smooth on iPhone 12+ |

---

**Tài liệu liên quan:**
- [HLD-TM-JOURNEY.md](./HLD-TM-JOURNEY.md)
