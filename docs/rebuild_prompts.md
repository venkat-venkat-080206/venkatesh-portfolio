# Rebuild Prompts

> **Purpose**: Quick-start prompts to rebuild any section from scratch. Copy these prompts and use them to recreate sections if needed.

---

## How to Use

1. Copy the prompt for the section you want to rebuild
2. Paste it into a conversation with your AI assistant
3. The AI will recreate the section using the documented specifications

---

## Section 1: Hero Section

### Rebuild Prompt

```
Create a full-screen hero section for my Next.js portfolio with the following specifications:

LAYOUT:
- Full-screen container (w-full h-screen)
- Dark background (#050505)
- React Three Fiber Canvas for 3D background

TITLE:
- Font: Syne (import from next/font/google)
- Text: "Venkat."
- Size: 8rem (128px)
- Weight: bold (700)
- Color: White
- Animation: Gentle float (6s ease-in-out infinite, -20px translateY)
- Magnetic effect: Follow mouse with GSAP (0.05 multiplier, power2.out easing)

SUBTITLE:
- Text: "Full-Stack Developer & Creative Coder"
- Size: text-xl
- Opacity: 70%
- Animation: Breathing effect (opacity 0.7 → 1, 4s infinite)

SCROLL INDICATOR:
- Custom SVG mouse icon
- Bounce animation (10px translateY, 2s infinite)
- Animated scroll wheel dot (12px translateY with fade, 2s infinite)

3D BACKGROUND:
- React Three Fiber mesh with custom shader
- PlaneGeometry: [10, 10, 128, 128]
- Fragment shader: Fluid effect with 3 colors
  - Color 1: vec3(0.1, 0.2, 0.4) - Dark blue
  - Color 2: vec3(0.3, 0.1, 0.4) - Purple
  - Color 3: vec3(0.4, 0.2, 0.5) - Pink-purple
- Animate with uTime uniform
- Mouse interaction with uMouse uniform

CURSOR TRAIL:
- Iridescent trailing spheres
- 20 trail points
- Interpolate colors: blue (#3b82f6) → pink (#ec4899)
- Size: Decrease along trail
- Opacity: Fade along trail

TECHNOLOGIES:
- Next.js 15+ (App Router)
- React Three Fiber
- Three.js
- GSAP
- TypeScript
- Tailwind CSS
```

---

## Section 2: About Me

### Rebuild Prompt

```
Create an About Me section for my portfolio with the following specifications:

LAYOUT:
- Min-height: screen
- Background: #050505
- Padding: py-32 px-8 md:px-16
- Two-column grid (md:grid-cols-2 gap-16 items-start)
- Left: Content, Right: Image card

TYPOGRAPHY:
- Font: DM Sans (import from next/font/google, weights 300-700)
- Main titles (h2): text-5xl md:text-7xl, font-light (300)
- Sub titles (h3): text-4xl md:text-6xl, font-light (300)
- Body text: text-lg md:text-xl, font-light (300), leading-relaxed

GRADIENTS:
- Title words: from-blue-500 via-purple-500 to-pink-500
  (#3b82f6 → #a855f7 → #ec4899)
- Keywords: from-blue-400 via-purple-400 to-pink-400
  (#60a5fa → #c084fc → #f472b6)

CONTENT SECTIONS (Left column):
1. About Me
   - Title: "About Me" (Me = gradient)
   - Keywords: "full-stack developer", "creative coder"

2. What I Do
   - Title: "What I Do" (Do = gradient)
   - Keywords: "interactive web applications", "3D graphics programming"

3. My Philosophy
   - Title: "My Philosophy" (Philosophy = gradient)
   - Keywords: "art and technology", "thoughtful design"

4. Beyond Code
   - Title: "Beyond Code" (Code = gradient)
   - Keywords: "design trends", "exceptional digital experiences"

ANIMATIONS (GSAP ScrollTrigger):
- Initial state: All content x:100, opacity:0
- Scroll trigger: start "top 80%"
- Animation: x:0, opacity:1, duration:1s, ease:"power2.out"
- Image pin: Pin image from "top top" to "bottom bottom"
  Use: pin:imageElement, pinSpacing:false

IMAGE CARD (Right column):
- Container: max-w-lg
- Aspect ratio: square
- Border radius: rounded-3xl (24px)
- Glow layer: bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30, blur-xl
- Glass card: border border-white/20, backdrop-blur-md, bg-white/5, shadow-2xl
- Placeholder: "Your Photo Here, 600 x 600px"

FLOATING SVG BACKGROUND:
- 14 SVG elements (blobs, squiggles, stars, waves, circles)
- Gradients: blue→purple→pink (#3b82f6 → #a855f7 → #ec4899)
- Random positions: 5-95% left, 15-95% startY
- Animation: Float upward (-100vh), rotate(360deg), 8-16s
- Opacity: 0 → 0.8 (10%) → 0.8 (90%) → 0 (smooth fade)
- Delays: 0-11s staggered
- Overflow: hidden on section

SVG TYPES:
1. Blob shapes (3 variants) - Organic filled paths
2. Squiggle lines (2 variants) - Wavy stroked paths
3. Star - 10-point filled
4. Sparkle - 8-point filled
5. Wave - Sine curve stroked
6. Circle - Gradient filled

GSAP SETUP:
- Import: gsap, ScrollTrigger
- Register: gsap.registerPlugin(ScrollTrigger)
- Context: gsap.context(() => {...}, sectionRef)
- Cleanup: ctx.revert() in useEffect return
- Ref pattern: Use ref callback to collect elements dynamically

TECHNOLOGIES:
- Next.js
- GSAP ScrollTrigger
- Lenis (smooth scroll)
- TypeScript
- Tailwind CSS
```

---

## Master Design System

### Rebuild Prompt

```
Set up a master design system for my Next.js portfolio:

FONTS (next/font/google):
1. Syne: weights 400-800, variable --font-syne
2. DM_Sans: weights 300-700, variable --font-dm-sans
3. Geist: default, variable --font-geist-sans
4. Geist_Mono: default, variable --font-geist-mono

COLORS:
- Primary BG: #050505 (near black)
- Card BG: bg-white/5
- Text primary: white
- Text secondary: white/60
- Text muted: white/40
- Border: white/20

GRADIENTS:
- Main: from-blue-500 via-purple-500 to-pink-500
  (#3b82f6 → #a855f7 → #ec4899)
- Light: from-blue-400 via-purple-400 to-pink-400
  (#60a5fa → #c084fc → #f472b6)

SPACING:
- Section padding: py-32 px-8 md:px-16
- Section spacing: space-y-16
- Element spacing: space-y-6
- Grid gap: gap-16
- Container: max-w-7xl mx-auto

BORDERS & EFFECTS:
- Card radius: rounded-3xl (24px)
- Standard radius: rounded-lg (8px)
- Glass border: border-white/20
- Backdrop blur: backdrop-blur-md
- Shadow: shadow-2xl
- Glow: blur-xl

TECHNOLOGIES:
- Next.js 15+ (App Router)
- React 19+
- TypeScript
- Tailwind CSS
- Three.js + @react-three/fiber
- GSAP + ScrollTrigger
- Lenis (smooth scroll)

ICONIFY CDN:
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
```

---

## Quick Component Prompts

### Floating SVG Elements

```
Create a FloatingElements component with:
- 14 custom inline SVG shapes (blobs, squiggles, stars, waves, circles)
- Blue→purple→pink linear gradients
- Float upward animation: translateY(0 → -100vh), rotate(0 → 360deg)
- Smooth opacity: 0 → 0.8 → 0 (fade in first 10%, fade out last 10%)
- Random positions: 5-95% horizontal, 15-95% vertical start
- Durations: 8-16s varied
- Delays: 0-11s staggered
- Large gaps between elements
```

### Glass Morphism Card

```
Create a glass morphism card with:
- rounded-3xl border radius
- border border-white/20
- backdrop-blur-md
- bg-white/5
- shadow-2xl
- Outer glow: bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-xl
- Square aspect ratio
```

### GSAP Scroll Reveal

```
Set up GSAP ScrollTrigger animations:
- Initial: x:100, opacity:0
- Trigger: start "top 80%"
- Animation: x:0, opacity:1, duration:1s, ease:"power2.out"
- Use gsap.context for cleanup
- Register ScrollTrigger plugin
- Clean all triggers on unmount
```

---

## Emergency Reset Prompts

### Clear All GSAP Triggers

```javascript
// Run this to clear all ScrollTriggers
import { ScrollTrigger } from "gsap/ScrollTrigger";
ScrollTrigger.getAll().forEach((t) => t.kill());
```

### Fix Lenis Conflict

```javascript
// If scroll is not working, ensure this in ScrollTrigger config:
scrollTrigger: {
  trigger: element,
  // Do NOT set scroller to anything
  // Let it use default
}
```

### Reset Image Pin

```javascript
// If image won't unpin:
gsap.to(imageElement, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom bottom",
    pin: imageElement,
    pinSpacing: false, // CRITICAL: must be false
  },
});
```

---

**Last Updated**: 2026-02-18
