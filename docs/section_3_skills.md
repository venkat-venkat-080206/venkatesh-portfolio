# Section 3: My Skills (Film Roll Design)

> **Purpose**: Cinematic film roll display of skills across three categories with infinite scroll, 3D tilt, and interactive hover effects.

---

## Overview

- **Three film roll strips** (Soft, Hard, Meta skills)
- **Seamless Infinite GSAP Loop** - Synchronized with scroll velocity
- **3D perspective tilt** - Permanent tilt for cinematic depth
- **Gravity Bend Interaction** - Film "sags" and skews based on mouse proximity
- **Elastic Snap-back** - Returns to original shape with rubbery jiggle
- **White Glassmorphism** - High blur, translucent light frames
- **Call-To-Action** - "Want to see full set?" premium gradient button

---

## Technologies

- **GSAP (GreenSock)** - Logic for loops, scroll sync, and physics
- **GSAP ScrollTrigger** - Velocity tracking for speed sync
- **React Mouse Events** - Tracking cursor for bend effects
- **Tailwind CSS** - Glassmorphism implementation

---

## Components

### File Paths
```
src/components/dom/MySkills.tsx
```

---

## Design Specifications

### Layout
```css
Section: min-h-screen py-32 overflow-hidden
Background: Dot grid pattern (40px spacing)
```

### Film Frame (White Glass)
```css
Frame: w-48 h-28 bg-white/10 backdrop-blur-xl
Border: border-white/20 rounded-[1px]
Shadow: subtle shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]
Sprockets: Light glass tracks with subtle semi-transparent holes
Hover: Scale 105%, increased brightness and border clarity
```

### Title
```tsx
Font: ScrollRevealText (Internal)
Size: text-6xl md:text-8xl
Style: "MY SKILLS" thin tracking-tighter
Underline: w-24 h-1 Cyan/Blue gradient bar
```

### CTA Button
```css
Label: "WANT TO SEE FULL SET?"
Gradient: from-[#bbfafb] via-[#fbcaff] to-[#fecaff]
Design: Pill-shaped, semi-transparent text, inner glow
Effect: Elastic hover scale (1.1x) + shadow depth
```

---

## Skills Data
(Same as before: Soft, Hard, Meta categories)

---

## Animations & Physics

### 1. Seamless Infinite Loop (GSAP)
**Logic**:
- Uses `gsap.fromTo` on `xPercent` (0 to -33.333%).
- Mathematically perfect loop without endpoints.
- Base duration: 15s.

### 2. Gravity Bend Interaction
**Logic**:
- `onMouseMove` calculates distance from row center.
- Applies `skewX` (horizontal bend) and `y` (vertical sag).
- `scaleY` increases slightly to simulate stretching under tension.

### 3. Elastic Return
**Logic**:
- On mouse leave, row resets to `skew: 0`, `y: 0`, `scale: 1`.
- Uses `ease: "elastic.out(1.2, 0.4)"` for a physical jiggle feel.

### 4. Scroll Velocity Sync
**Logic**:
- `ScrollTrigger` tracks velocity.
- `timeScale` of the GSAP loop is dynamically mapped to velocity (approx. `1 + velocity/600`).
- Smooth transition back to base speed using `power1.out`.

---

## Component Logic
(Refactored for performance: Hover popups removed to ensure high-performance scrolling)

---

## Rebuild Prompt
```
Create a MySkills component with cinematic film roll design:

LAYOUT: min-h-screen bg-[#050505], dot grid background (40px)
TITLE: "MY SKILLS" - Syne font, thin + bold italic gradient
CATEGORIES: Soft (8), Hard (15), Meta (8) skills

FILM FRAMES: w-48 h-28, bg-[#0a0a0a], joined (gap-0)
PERFORATIONS: 4 per side, realistic with inner shadows
TEXTURES: Film grain (SVG noise), glossy overlay
FRAME DIVIDERS: 2px black lines between frames

ANIMATIONS:
- Infinite scroll: 20s, left/right alternating
- 3D Tilt: rotateX(±5deg) rotateZ(±2deg), ALWAYS ON
- Scroll velocity: GSAP scrub adds ±500px based on scroll
- Triple skills array for seamless loop

HOVER:
- Stop that specific roll (animation-play-state: paused)
- Scale frame 110%, purple glow shadow
- Background blur overlay (bg-black/60 backdrop-blur-[4px])
- Popup card with gradient title, description, diamond skill level
- Card-pop animation (scale + translateY)

CATEGORY LABELS: Vertical text on left/right sides
SKILL LEVEL: Diamond shapes (rotate-45), gradient fill + glow

TECHNOLOGIES: React, GSAP ScrollTrigger, CSS Animations, TypeScript
```

---

**Last Updated**: 2026-02-18
