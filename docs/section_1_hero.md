# Section 1: Hero Section

> **Purpose**: Full-screen landing section with animated 3D background, magnetic title effect, and cursor trail.

---

## Overview

The hero section is the first thing users see. It features:
- **3D fluid background** (petrol-on-water shader effect)
- **Magnetic text** - "Venkat." title with mouse follow
- **Iridescent cursor trail** - Smooth trailing effect
- **Scroll indicator** - Animated mouse icon
- **Minimalist design** - Dark background, thin fonts

---

## Technologies

### Core
- **React Three Fiber** - 3D rendering
- **Three.js** - WebGL graphics
- **GSAP** - Animations
- **Next.js** - Framework

### Shaders
- Custom fragment shader for fluid effect
- Vertex shader for displacement

---

## Components

### File Paths
```
src/components/dom/HeroBackground.tsx
src/components/dom/HeroTitle.tsx
src/components/dom/IridescentTrail.tsx
src/app/page.tsx
```

### Component Tree
```
<main> (Hero container)
  ├── <HeroTitle /> (Magnetic text + scroll indicator)
  ├── <Canvas> (Three.js)
  │   ├── <HeroBackground /> (Shader mesh)
  │   └── <IridescentTrail /> (Cursor trail)
```

---

## Design Specifications

### Colors
```css
Background: #050505 (near black)
Title: #ffffff (white)
Subtitle: rgba(255, 255, 255, 0.7) (70% white)
Scroll indicator: #ffffff (white)
```

### Typography
```tsx
Font family: Syne (var(--font-syne))
Title size: 8rem (128px)
Title weight: 700 (bold)
Subtitle size: text-xl (20px)
Subtitle weight: 400 (normal)
```

### Layout
```css
Container: w-full h-screen
Position: relative
Overflow: hidden
Z-index: Title (z-10), Canvas (z-0)
```

---

## Animations

### 1. Title Float Animation
```tsx
// Gentle up/down float
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

// Applied to title
animation: float 6s ease-in-out infinite
```

### 2. Subtitle Breathing
```tsx
// Opacity pulse
@keyframes breathe {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

// Applied to subtitle
animation: breathe 4s ease-in-out infinite
```

### 3. Scroll Indicator Bounce
```tsx
// Bounce animation
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

// Applied to mouse icon
animation: bounce 2s ease-in-out infinite
```

### 4. Scroll Wheel Animation
```tsx
// Mouse wheel scrolling dot
@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(12px);
    opacity: 0;
  }
}

// Applied to wheel dot
animation: scroll 2s ease-in-out infinite
```

### 5. Magnetic Text Effect
```tsx
// Mouse follow with GSAP
gsap.to(titleRef.current, {
  x: (mouseX - centerX) * 0.05,
  y: (mouseY - centerY) * 0.05,
  duration: 0.3,
  ease: "power2.out",
});
```

---

## 3D Background (HeroBackground.tsx)

### Shader Configuration
```tsx
// Mesh plane
<mesh>
  <planeGeometry args={[10, 10, 128, 128]} />
  <shaderMaterial
    vertexShader={vertexShader}
    fragmentShader={fragmentShader}
    uniforms={{
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
    }}
  />
</mesh>
```

### Animation Loop
```tsx
useFrame((state) => {
  const time = state.clock.getElapsedTime();
  materialRef.current.uniforms.uTime.value = time;
});
```

### Shader Colors
```glsl
// Fragment shader color mix
vec3 color1 = vec3(0.1, 0.2, 0.4); // Dark blue
vec3 color2 = vec3(0.3, 0.1, 0.4); // Purple
vec3 color3 = vec3(0.4, 0.2, 0.5); // Pink-purple
```

---

## Iridescent Trail (IridescentTrail.tsx)

### Trail Configuration
```tsx
const trailLength = 20; // Number of trail points
const mouseSpeed = 0.1; // Follow speed
```

### Trail Rendering
```tsx
// Each trail point is a sphere
<mesh position={[pos.x, pos.y, 0]}>
  <sphereGeometry args={[size, 16, 16]} />
  <meshBasicMaterial
    color={color}
    transparent
    opacity={opacity}
  />
</mesh>
```

### Colors
- Interpolates between blue (#3b82f6) and pink (#ec4899)

---

## Responsive Design

### Mobile Adjustments
```css
Title: 8rem → 4rem (on small screens)
Padding: Adjusted for mobile viewport
```

### Camera Settings
```tsx
<Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
```

---

## Performance Optimizations

1. **Shader optimization** - Simplified fragment shader
2. **Trail capping** - Max 20 points
3. **Frame throttling** - useFrame for smooth 60fps
4. **Geometry reuse** - Single plane geometry

---

## Rebuild Instructions

### Step 1: Install Dependencies
```bash
npm install three @react-three/fiber @react-three/drei gsap
```

### Step 2: Create Components
1. Create `HeroBackground.tsx` with shader material
2. Create `HeroTitle.tsx` with magnetic effect
3. Create `IridescentTrail.tsx` with cursor follow

### Step 3: Setup Layout
```tsx
<main className="relative w-full h-screen overflow-hidden bg-[#050505]">
  <HeroTitle />
  <Canvas camera={{ position: [0, 0, 1] }}>
    <HeroBackground />
    <IridescentTrail />
  </Canvas>
</main>
```

### Step 4: Add Fonts
Import Syne in `layout.tsx`:
```tsx
import { Syne } from "next/font/google";
const syne = Syne({ ... });
```

---

## Common Issues & Fixes

### Issue: Shader not loading
**Fix**: Ensure vertex and fragment shaders are defined as strings

### Issue: Title not magnetic
**Fix**: Check GSAP import and mouse tracking logic

### Issue: Trail laggy
**Fix**: Reduce `trailLength` to 10-15

---

**Last Updated**: 2026-02-18
