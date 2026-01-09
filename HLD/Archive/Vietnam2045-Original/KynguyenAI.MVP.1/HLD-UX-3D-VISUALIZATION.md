# HLD - UX-3D-VISUALIZATION (3D Globe/Map Visualization)

## 1. Bối cảnh

**3D Globe** trên landing page sử dụng React Three Fiber để hiển thị bản đồ Việt Nam 3D, cho phép user chọn location bằng cách click vào các markers.

## 2. Tech Stack

- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Helpers (OrbitControls, Text3D)
- **Three.js**: 3D graphics library

## 3. Implementation

```typescript
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

const LOCATIONS = [
    { id: 'can-gio', position: [106.95, 10.41, 0], name: 'Cần Giờ', color: '#00ff88' },
    { id: 'thu-duc', position: [106.75, 10.85, 0], name: 'Thủ Đức', color: '#ff6b00' },
    { id: 'hanoi', position: [105.85, 21.02, 0], name: 'Hà Nội', color: '#ffcc00' }
];

export function Globe3D({ onLocationSelect }: Props) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {/* Vietnam map mesh */}
            <mesh>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial map={vietnamTexture} />
            </mesh>

            {/* Location markers */}
            {LOCATIONS.map(loc => (
                <LocationMarker
                    key={loc.id}
                    position={loc.position}
                    onClick={() => onLocationSelect(loc.id)}
                    color={loc.color}
                />
            ))}

            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}
```

## 4. Performance

- WebGL fallback for older devices
- LOD (Level of Detail) for mobile
- Texture compression

---

**Tài liệu liên quan:**
- [HLD-TM-JOURNEY.md](./HLD-TM-JOURNEY.md)
