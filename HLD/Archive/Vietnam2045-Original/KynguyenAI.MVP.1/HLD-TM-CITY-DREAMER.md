# HLD - TM-CITY-DREAMER (Time Machine Module - City Dreamer)

## 1. Bối cảnh

**City Dreamer** là module cho phép người dùng "thiết kế" ngôi nhà/căn hộ tương lai của họ bằng cách điều chỉnh các parameters như mật độ cây xanh, mức độ công nghệ, kiểu kiến trúc.

## 2. User Interface

```
┌─────────────────────────────────────────────────────────────────┐
│               🏙️ KIẾN TẠO ĐÔ THỊ TƯƠNG LAI                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Thiết kế ngôi nhà 2045 của bạn tại [Thu Duc]                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Mật độ cây xanh                                            │ │
│  │ ────●─────────────────────── 70%                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Mức độ công nghệ                                          │ │
│  │ ○ Low-tech  ● Medium-tech  ○ High-tech                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Kiểu kiến trúc                                            │ │
│  │ ○ Tân truyền thống  ● Minimalist  ○ Biophilic           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│              ┌─────────────────────────┐                        │
│              │  🎨 Tạo Hình Ảnh         │                        │
│              └─────────────────────────┘                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Parameters

```typescript
interface CityDreamerParams {
    location: 'can-gio' | 'thu-duc' | 'hanoi';
    greenCoverage: number; // 0-100%
    techLevel: 'low' | 'medium' | 'high';
    architectureStyle: 'neo-traditional' | 'minimalist' | 'biophilic';
    homeType: 'apartment' | 'house' | 'villa';
}
```

## 4. Image Prompt Generation

```typescript
const buildCityDreamerPrompt = (params: CityDreamerParams): string => {
    const greenModifier = params.greenCoverage > 70
        ? 'abundant vertical gardens, rooftop forests, living walls'
        : params.greenCoverage > 40
        ? 'balanced integration of greenery'
        : 'minimalist green accents';

    const techModifier = {
        'low': 'traditional materials with subtle tech, manual controls',
        'medium': 'smart home features, solar panels, automated systems',
        'high': 'holographic displays, AI assistant, full automation, quantum glass'
    }[params.techLevel];

    const styleModifier = {
        'neo-traditional': 'Vietnamese traditional elements, wooden accents, curved roofs',
        'minimalist': 'clean lines, monochrome palette, open spaces',
        'biophilic': 'natural materials, organic shapes, nature integration'
    }[params.architectureStyle];

    return `
        Solarpunk ${params.homeType} in ${getLocationName(params.location)} 2045,
        ${styleModifier},
        ${greenModifier},
        ${techModifier},
        golden hour lighting, architectural photography,
        8k resolution, photorealistic
    `.trim();
};
```

## 5. API Contract

```typescript
// POST /api/modules/city-dreamer/generate
interface CityDreamerRequest {
    sessionId: string;
    params: CityDreamerParams;
}

interface CityDreamerResponse {
    imageUrl: string;
    prompt: string;
    estimatedCost: string; // "~50,000đ/tháng" based on params
}
```

## 6. Premium Feature

- Free tier: 1 generation/day, standard quality
- Premium tier: Unlimited, 4K quality, multiple angles

---

**Tài liệu liên quan:**
- [HLD-AI-IMAGE-GENERATION.md](./HLD-AI-IMAGE-GENERATION.md)
- [HLD-TM-JOURNEY.md](./HLD-TM-JOURNEY.md)
