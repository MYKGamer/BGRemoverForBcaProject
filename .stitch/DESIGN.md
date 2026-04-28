# Design System: BGRemover AI

## 1. Visual Theme & Atmosphere
A sophisticated, high-performance SaaS interface that feels like a professional studio tool. The atmosphere is "Deep Studio Dark" — using layered zinc neutrals to create depth without clutter. It prioritizes focus on the user's content (images) with high-contrast typography and singular, vibrant Cobalt Blue accents for critical actions.

## 2. Color Palette & Roles
- **Deep Canvas** (#09090b) — Primary background (Zinc-950)
- **Studio Surface** (#18181b) — Secondary surfaces, cards, and navigation (Zinc-900)
- **Structural Border** (#27272a) — Subtle 1px lines for separation (Zinc-800)
- **Primary Cobalt** (#2563eb) — Main CTA color, focus states, and primary buttons (Blue-600)
- **High-Contrast Text** (#fafafa) — Primary headings and labels (Zinc-50)
- **Muted Metadata** (#a1a1aa) — Secondary text, captions, and placeholders (Zinc-400)

## 3. Typography Rules
- **Display & Headlines:** Geist Sans — Track-tight (-0.02em), medium to bold weight for hierarchy. No excessive sizing; authority through clarity.
- **Body:** Geist Sans — Regular weight, optimized leading (1.6) for readability against dark backgrounds.
- **Technical/Mono:** Geist Mono — Used for credit counts, file sizes, and technical metadata.
- **Banned:** Inter (too generic), generic system fonts, any Serif fonts (too traditional for AI SaaS).

## 4. Component Stylings
* **Buttons:** Flat, tactile designs. Primary buttons use Cobalt fill with white text. Secondary buttons use Zinc-800 borders with a subtle hover lift. No neon glows or outer shadows.
* **Cards & Containers:** Subtle rounding (0.75rem). Use Zinc-800 borders to define edges rather than heavy shadows.
* **Inputs:** Darker than the surface (#09090b), Zinc-800 border that transitions to Cobalt Blue on focus. Labels always sit above.
* **Auth Tabs:** Minimalist design. Active state indicated by a Cobalt underline or subtle surface lift.
* **Loaders:** Custom skeletal shimmer matching the zinc palette. No circular spinners for primary actions.

## 5. Layout Principles
- **Grid-First:** Responsive architecture with a max-width of 1200px for the main content.
- **Asymmetric Balance:** Use whitespace to separate the Auth form from branding elements.
- **Density:** 4 (Balanced) — Focused, non-distracting layouts.
- **Mobile:** Strict single-column collapse. Touch targets minimum 44px.

## 6. Motion & Interaction
- **Spring Physics:** Weighted, premium feel (stiffness: 100, damping: 20).
- **Transitions:** Smooth opacity and transform-based fades for page transitions.
- **Interaction:** Active states use a subtle -1px vertical translate to simulate a physical press.

## 7. Anti-Patterns (Banned)
- No emojis.
- No Inter font.
- No pure black (#000000).
- No neon/outer glow shadows.
- No 3-column equal card grids.
- No AI copywriting clichés ("Elevate", "Unleash").
- No generic names in examples.
- No overlapping elements.
