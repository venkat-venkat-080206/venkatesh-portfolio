# Section 2: About Me

> **Purpose**: Content-rich section showcasing personal information with scroll-triggered animations, floating SVG background, and pinned image effect.

---

## Overview

The About Me section features:
- **Two-column layout** - Content left, image right
- **Sequential reveal** - Content slides from right on scroll
- **Pinned image** - Image sticks while content reveals, then scrolls
- **Floating SVG background** - Custom gradient shapes loop upward
- **Glass morphism image card** - iOS-style with glow effect

---

## Technologies

### Core
- **GSAP ScrollTrigger** - Scroll animations + pin effect
- **Lenis** - Smooth scroll integration
- **React** - Component state
- **Tailwind CSS** - Styling

---

## Components

### File Paths
```
src/components/dom/AboutMe.tsx
src/components/dom/FloatingElements.tsx
```

### Component Structure
```tsx
<AboutMe>
  ├── <FloatingElements /> (Background SVGs)
  └── <div className="grid md:grid-cols-2">
      ├── Left: Content blocks (4 sections)
      └── Right: Image card (pinned)
```

---

## Design Specifications

### Layout
```css
Section: min-h-screen bg-[#050505] py-32 px-8 md:px-16
Container: max-w-7xl mx-auto
Grid: md:grid-cols-2 gap-16 items-start
```

### Colors
```css
Background: #050505
Primary text: #ffffff
Secondary text: rgba(255, 255, 255, 0.6)
Muted text: rgba(255, 255, 255, 0.4)
```

### Typography
```tsx
Font family: DM Sans (var(--font-dm-sans))

Main titles (h2):
  - Size: text-5xl md:text-7xl (48px → 72px)
  - Weight: font-light (300)

Sub titles (h3):
  - Size: text-4xl md:text-6xl (36px → 60px)
  - Weight: font-light (300)

Body text (p):
  - Size: text-lg md:text-xl (18px → 20px)
  - Weight: font-light (300)
  - Line height: leading-relaxed
```

### Gradients
```css
/* Title gradient (Cyan / Blue / Teal) */
from-cyan-400 via-blue-500 to-teal-400
#22d3ee → #3b82f6 → #14b8a6

/* Keyword highlight gradient */
from-cyan-400 via-blue-500 to-teal-400
```

---

## Content Structure

### 1. About Me
```tsx
Title: "About Me" (Me = cyan gradient)
Keywords: "full-stack developer", "creative coder"
```

### 2. What I Do
```tsx
Title: "What I Do" (Do = cyan gradient)
Keywords: "interactive web applications", "3D graphics programming"
```

### 3. My Philosophy
```tsx
Title: "My Philosophy" (Philosophy = cyan gradient)
Keywords: "art and technology", "thoughtful design"
```

### 4. Beyond Code
```tsx
Title: "Beyond Code" (Code = cyan gradient)
Keywords: "design trends", "exceptional digital experiences"
```

---

## Animations

### 1. Content Reveal (GSAP)
**Behavior:**
- Content blocks slide in and fade as they enter the viewport.
- Uses `ScrollRevealText` for granular text effects.

### 2. Image Pin Effect (GSAP)
```tsx
// Pin image while content scrolls
ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom bottom",
    pin: imageRef.current,
    pinSpacing: false,
    scrub: true,
});
```

**Behavior:**
1. Image appears at top when section enters viewport
2. Pins in place while content scrolls past
3. Releases and scrolls naturally when content ends

---

## Image Card Design

### Structure
```tsx
<div className="relative w-full max-w-lg">
  <div className="relative aspect-square rounded-3xl overflow-hidden">
    {/* Glow layer */}
    <div className="absolute inset-0 rounded-3xl 
      bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 
      blur-xl" />
    
    {/* Glass card */}
    <div className="relative w-full h-full rounded-3xl 
      border border-white/20 backdrop-blur-md bg-white/5 overflow-hidden shadow-2xl">
      {/* Content */}
    </div>
  </div>
</div>
```

### Styles
```css
Border radius: rounded-3xl (24px)
Border: border-white/20
Background: bg-white/5
Backdrop: backdrop-blur-md
Shadow: shadow-2xl
Glow: blur-xl with gradient
```

---

## Floating Heart Background

### Element Configuration
- **Type**: Single `heart` shape for uniform theme.
- **Color**: Linear gradient (`#22d3ee` → `#3b82f6` → `#14b8a6`).
- **Glow**: `drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))`.

### SVG Configuration
```tsx
const svgDesigns = [
  { type: "heart", left: "5%", startY: "85%", delay: 0, duration: 12, size: 40 },
  // ... scattered across screen
];
```

### Animation
```css
@keyframes wrapFloat {
  0% { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 0; }
  10% { opacity: 0.6; transform: translateY(-10vh) rotate(10deg) scale(1); }
  90% { opacity: 0.6; transform: translateY(-90vh) rotate(350deg) scale(1); }
  100% { transform: translateY(-100vh) rotate(360deg) scale(0.8); opacity: 0; }
}
```

### SVG Gradients
```tsx
// All SVGs use blue→purple→pink gradient
<linearGradient id="grad1">
  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.7" />
  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
</linearGradient>
```

### Spacing & Timing
- **Positions**: Random 5-95% across screen
- **Delays**: 0-11s staggered start
- **Durations**: 8-16s varied speeds
- **Gaps**: Large spacing (15%+ between elements)

---

## Responsive Design

### Breakpoints
```css
Mobile: Default (single column)
Desktop: md: (two columns, 768px+)
```

### Mobile Adjustments
```css
Title: text-5xl → text-7xl (on md+)
Padding: px-8 → px-16 (on md+)
Grid: stack → 2 columns (on md+)
```

---

## GSAP Context Setup

### Clean Implementation
```tsx
useEffect(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  
  const ctx = gsap.context(() => {
    // All animations here
  }, sectionRef);
  
  return () => {
    ctx.revert(); // Cleanup
  };
}, []);
```

### Ref Callback Pattern
```tsx
const elementsRef = useRef<HTMLDivElement[]>([]);

const addToRefs = (el: HTMLDivElement | null) => {
  if (el && !elementsRef.current.includes(el)) {
    elementsRef.current.push(el);
  }
};

// Usage
<div ref={addToRefs}>Content</div>
```

---

## Rebuild Instructions

### Step 1: Install Dependencies
```bash
npm install gsap
```

### Step 2: Create AboutMe Component
```tsx
// src/components/dom/AboutMe.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingElements from "./FloatingElements";

gsap.registerPlugin(ScrollTrigger);
```

### Step 3: Create FloatingElements
```tsx
// src/components/dom/FloatingElements.tsx
// Include all 8 SVG render functions
// Add animation keyframes
```

### Step 4: Add to Page
```tsx
// src/app/page.tsx
<AboutMe />
```

### Step 5: Import DM Sans Font
```tsx
// src/app/layout.tsx
import { DM_Sans } from "next/font/google";
const dmSans = DM_Sans({ ... });
```

---

## Physics & Motion

### Scroll Trigger Points
```tsx
start: "top 80%" // Element 80% from top triggers
end: "bottom bottom" // Pin ends at section bottom
```

### Animation Speeds
```tsx
Content slide: 1s (duration)
SVG float: 8-16s (varied)
```

### Easing
```tsx
GSAP: "power2.out" (smooth deceleration)
CSS: ease-in-out (symmetric)
```

---

## Common Issues & Fixes

### Issue: Image stays sticky forever
**Fix**: Check `items-start` on grid and GSAP pin end trigger

### Issue: Content doesn't animate
**Fix**: Verify ref callback adds elements correctly

### Issue: SVGs pop up suddenly
**Fix**: Ensure opacity animates 0 → 0.8 → 0 (not constant)

### Issue: Lenis conflicts
**Fix**: Ensure ScrollTrigger scroller is set to default (not "body")

---

**Last Updated**: 2026-02-18
