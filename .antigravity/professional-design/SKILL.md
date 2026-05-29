---
name: professional-design
description: "AI-generated look ko premium SaaS UI/UX mein badalne ke liye guidelines."
---

# Professional UI/UX & Design Guidelines (BG Remover SaaS)

This guide overrides standard AI layout and styling decisions to establish a professional, modern Software-as-a-Service (SaaS) visual identity.

---

## 1. Typography & Hierarchy
* **Primary Headings**: Use `Plus Jakarta Sans` or `Satoshi` font. Standard system fallback: `system-ui, -apple-system, sans-serif`.
* **Body & UI Controls**: Use `Inter` for legibility.
* **Visual Weight**:
  * Action items and navigation links must use `font-semibold` or `font-medium` (never default lightweight or bold styles).
  * Section headings must use `font-black` or `font-extrabold` with tight tracking (`tracking-tight` or `tracking-tighter`).

---

## 2. Color System (Minimalist Cyber-Obsidian)
Avoid generic bright purple/blue gradients. Follow this opinionated color system:
* **Backgrounds**:
  * Main Application Area: Deep Obsidian (`#09090B` or HSL `240 10% 3.9%`).
  * Panels & Sidebars: Dark Zinc (`#121215` or HSL `240 6% 7%`).
* **Borders & Dividers**:
  * Low contrast lines (`#1F1F23` or HSL `240 5.9% 15%`) for structural division.
* **Interactive Elements & Accents**:
  * Brand Primary: Electro Blue (`#2563EB` or HSL `221.2 83.2 53.3`).
  * Hover Primary: Cobalt Blue (`#1D4ED8`).
  * Secondary Highlights: Muted Emerald Green (`#22C55E`) for successful states (credits loaded, image ready).
* **Gradients**:
  * Only use gradients for subtle radial glows behind main components to create depth. Example: `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent`.

---

## 3. Layout, Spacing & Depth
* **Break Symmetry**:
  * Avoid perfectly aligned grids. Use asymmetrical structures where one column (like the editor) is larger, and supplementary information panels are placed in floating, narrow sidebars.
* **Glassmorphism**:
  * Cards must use a translucent backdrop with border highlights:
    `bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50`.
* **Elevated Overlaps**:
  * Let the image dropzone hover over dynamic background elements.
  * Preview images must have soft drop shadows (`shadow-[0_20px_50px_rgba(0,0,0,0.6)]`) to lift them from the background canvas.

---

## 4. Micro-interactions & Framer Motion
Every client-side interaction must feel organic. Use these configurations in Framer Motion components:
* **Spring Dynamics**:
  * Buttons and clickable sheets must use a spring transition:
    `transition={{ type: "spring", stiffness: 350, damping: 25 }}`.
* **Hover Scale Effects**:
  * Primary actions (e.g., Upload, Download): `whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}`.
* **Page Transitions**:
  * Smooth entrance animations for state changes:
    `initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}`.

---

## 5. Micro-Patterns & Visual Accents
* **Checkerboard Pattern**:
  * The background behind transparent images must use a custom grid pattern:
    `bg-[linear-gradient(45deg,#18181b_25%,transparent_25%),linear-gradient(-45deg,#18181b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#18181b_75%),linear-gradient(-45deg,transparent_75%,#18181b_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0]`.
* **Accent Corners**:
  * Use decorative border segments on cards to anchor user attention to the main processing areas.

---

## 6. Guidelines Checklist
- [ ] No generic purple/pink default linear gradients.
- [ ] Rounded borders are uniform using `rounded-2xl` or `rounded-xl`.
- [ ] High contrast text against dark background using proper HSL scaling.
- [ ] Interactive elements have distinct hover states.
- [ ] Client elements include spring animations.
