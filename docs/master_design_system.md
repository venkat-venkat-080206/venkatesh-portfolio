# Master Design System

> **Purpose**: Central design system documentation for the entire portfolio. Use this as the source of truth for colors, fonts, spacing, and visual language.

---

## Color Palette

### Primary Gradient
**Blue → Purple → Pink**
```css
/* Main gradient (titles, highlights) */
from-blue-500 via-purple-500 to-pink-500

/* Hex values */
Blue: #3b82f6
Purple: #a855f7
Pink: #ec4899
```

### Secondary Gradient
**Lighter variant for body text highlights**
```css
from-blue-400 via-purple-400 to-pink-400

/* Hex values */
Blue: #60a5fa
Purple: #c084fc
Pink: #f472b6
```

### Background Colors
```css
Primary BG: #050505 (near black)
Card BG: bg-white/5 (5% white opacity)
```

### Opacity Levels
```css
Text primary: white/100 (full white)
Text secondary: white/60 (60% opacity)
Text muted: white/40 (40% opacity)
Border: white/20 (20% opacity)
```

---

## Typography

### Font Families

#### 1. Syne (Hero titles)
```tsx
import { Syne } from "next/font/google";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
```
**Usage**: Main hero title "Venkat."

#### 2. DM Sans (Body content)
```tsx
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
```
**Usage**: About Me section, all body text

#### 3. Geist Sans (System default)
```tsx
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

#### 4. Geist Mono (Code/mono)
```tsx
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

### Font Sizes

#### Hero Section
```css
Title: text-[8rem] (128px)
Subtitle: text-xl (20px)
```

#### About Me Section
```css
Main titles (h2): text-5xl md:text-7xl (48px → 72px)
Sub titles (h3): text-4xl md:text-6xl (36px → 60px)
Body text: text-lg md:text-xl (18px → 20px)
```

### Font Weights
```css
Light: font-light (300)
Normal: font-normal (400)
Medium: font-medium (500)
Bold: font-bold (700)
Black: font-black (900)
```

---

## Spacing System

### Section Padding
```css
Vertical: py-32 (128px top/bottom)
Horizontal: px-8 md:px-16 (32px → 64px)
```

### Content Spacing
```css
Between sections: space-y-16 (64px)
Between elements: space-y-6 (24px)
Grid gap: gap-16 (64px)
```

### Container Widths
```css
Max width: max-w-7xl (1280px)
Centered: mx-auto
```

---

## Border & Effects

### Border Radius
```css
Cards: rounded-3xl (24px)
Standard: rounded-lg (8px)
```

### Shadows & Blur
```css
Card shadow: shadow-2xl
Backdrop blur: backdrop-blur-md
Glow blur: blur-xl
```

### Borders
```css
Glass card: border border-white/20
```

---

## Animation Easings

### GSAP Easings
```javascript
Slide-in: "power2.out"
Smooth: "power3.out"
```

### CSS Easings
```css
Smooth: ease-in-out
Default: linear
```

---

## Icons & Assets

### Iconify CDN
```html
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
```

---

## Technology Stack

### Core
- **Framework**: Next.js 15+ (App Router)
- **React**: 19+
- **TypeScript**: Latest
- **Styling**: Tailwind CSS

### 3D & Animation
- **Three.js**: via @react-three/fiber
- **GSAP**: ScrollTrigger for scroll animations
- **Lenis**: Smooth scroll

### Libraries
```json
{
  "@react-three/fiber": "latest",
  "@react-three/drei": "latest",
  "gsap": "latest",
  "lenis": "latest",
  "three": "latest"
}
```

---

## Design Principles

1. **Dark theme** - Primary background #050505
2. **Gradient accents** - Blue → Purple → Pink for highlights
3. **Glass morphism** - Subtle backdrop blur + low opacity
4. **Smooth animations** - GSAP + Lenis for premium feel
5. **Thin fonts** - Light weights (300) for modern look
6. **Generous spacing** - py-32, gap-16 for breathing room

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx (Font imports)
│   ├── page.tsx (Main sections)
│   └── globals.css (Tailwind)
├── components/
│   └── dom/
│       ├── HeroBackground.tsx
│       ├── HeroTitle.tsx
│       ├── IridescentTrail.tsx
│       ├── AboutMe.tsx
│       └── FloatingElements.tsx
```

---

**Last Updated**: 2026-02-18
