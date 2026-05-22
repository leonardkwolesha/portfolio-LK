# Scaffold a New Portfolio Section

Generate a new React section component and wire it into `App.jsx`.

## Usage

```
/new-section <SectionName>
```

Example: `/new-section Blog` or `/new-section Testimonials`

## What this skill does

1. Creates `src/components/<SectionName>.jsx` with:
   - `<section id="<sectionname>">` wrapper using `var(--bg)` or `var(--bg2)` background
     (alternate: if previous section uses `--bg`, use `--bg2`, and vice versa)
   - Section label pattern: `<span className="section-label">LABEL</span>`
   - `<h2>` heading with 700–800 weight
   - Placeholder content cards using `var(--bg3)`, `border: 1px solid var(--border)`, `border-radius: 14px`
   - Hover effect: `transform: translateY(-5px)`, `border-color: rgba(232,82,58,0.4)`
2. Imports and renders `<SectionName />` in `App.jsx` before `<Footer />`
3. Adds a smooth-scroll anchor `<a href="#<sectionname>">` to `Navbar.jsx`

## Rules

- All colors must use **CSS variables** — `var(--red)`, `var(--bg3)`, etc. — never hardcode hex
- Use `className` not `style={{}}` — this project uses CSS, not inline styles
- Component must be mobile-first — base styles for mobile, `@media (min-width: 900px)` for desktop
- Use semantic HTML: `<section>`, `<h2>`, `<p>`, `<ul>` as appropriate
- Add a `.section-label` span with `color: var(--red)` above every heading

## Output

```
✅ Created src/components/<SectionName>.jsx
✅ Added import + <SectionName /> to App.jsx
✅ Added nav anchor to Navbar.jsx
```
