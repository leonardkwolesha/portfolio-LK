# CLAUDE.md — Master Prompt for Leonard Kwolesha Portfolio

This file is the source of truth for Claude when working on this project.
Read this file fully before making any changes to the codebase.

---

## Project Identity

**Project:** Leonard Kwolesha — Personal Developer Portfolio  
**Owner:** Leonard Kwolesha  
**Role:** Full Stack Software Developer & React Native Mobile Developer  
**Location:** Dar es Salaam, Tanzania  
**Stack:** MERN (MongoDB, Express, React, Node.js) + React Native

---

## Project Structure

```
portfolio-leonard/
├── frontend/                         # React + Vite app
│   ├── public/
│   │   ├── ceo_nobg.png              # Hero photo (transparent bg PNG)
│   │   └── leonard_nobg.png          # About photo (transparent bg PNG)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── TechTicker.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Stack.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── data/
│   │   │   └── content.js            # Single source of truth for all content
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js    # IntersectionObserver scroll animation
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                          # Node.js + Express API
│   ├── models/
│   │   └── Contact.js                # Mongoose contact schema
│   ├── routes/
│   │   └── contact.js                # POST /api/contact
│   ├── index.js                      # Express entry point (port 5000)
│   ├── .env.example
│   └── package.json
│
├── .claude/                          # Claude Code config
│   └── commands/
│       ├── add-project.md            # /add-project skill
│       ├── new-section.md            # /new-section skill
│       └── deploy-check.md          # /deploy-check skill
├── package.json                      # Root — convenience scripts only
├── vercel.json
├── .gitignore
└── CLAUDE.md                         # ← You are here
```

---

## Design System

### Colors
```css
--bg:       #0f0f14   /* Main background */
--bg2:      #141419   /* Section alt background */
--bg3:      #1a1a22   /* Card backgrounds */
--red:      #e8523a   /* Primary accent — buttons, dots, highlights */
--red2:     #ff6b50   /* Accent hover state */
--white:    #ffffff   /* Primary text */
--gray:     #9a9aaa   /* Secondary/muted text */
--border:   #2a2a35   /* Card and section borders */
```

### Typography
- **Font:** Poppins (Google Fonts)
- **Headings:** 700–800 weight
- **Body:** 300–400 weight
- **Section labels:** 0.7rem, 0.25em letter-spacing, uppercase, color: var(--red)

### Component Patterns
- **Section label:** small red uppercase text above every section heading
- **Buttons:** `.btn-red` (filled red) and `.btn-ghost` (outlined)
- **Cards:** `background: var(--bg3)`, `border: 1px solid var(--border)`, `border-radius: 14px`
- **Hover cards:** `transform: translateY(-5px)`, `border-color: rgba(232,82,58,0.4)`
- **Stats:** large number + red `+` or `%` superscript, muted label below

---

## Sections & Content

### Hero
- Greeting: `Hello.` with animated red dot
- Name: `Leonard Kwolesha`
- Title: `Full Stack Developer`
- Subtitle hint: `React · Node.js · Express · MongoDB · React Native`
- Photo: circular frame, red glowing ring border, `<` `>` bracket decorators
- Buttons: "Got a project?" (→ Contact) | "My Work" (→ Projects)
- Availability badge: pulsing green dot, "Open to opportunities"

### Tech Ticker (below hero)
Scrolling text: React · Node.js · Express · MongoDB · React Native · JavaScript · Git · REST APIs

### About
- Bio text: Leonard is a full stack developer from Dar es Salaam building end-to-end web and mobile apps
- Services: Web Development, App Development, API Development, Database Design
- Stats: Projects completed, Client satisfaction %, Years of experience
- Photo: leonard_nobg.png

### Projects (minimum 3)
Each card needs: title, description, tech stack tags, "View project →" link

| Project | Tags | Description |
|---|---|---|
| E-Commerce Platform | React, Node.js, MongoDB, Express | Full store with cart, auth, orders |
| Real-Time Chat App | React Native, Node.js, Socket.io | Cross-platform mobile chat |
| Admin Dashboard | React, Express, MongoDB | Analytics, user management, RBAC |

### Stack Grid
React · Node.js · Express · MongoDB · React Native · JavaScript

### Contact
- Prompt: "Got a project? Let's talk."
- Email: [update with real email]
- Socials: GitHub, LinkedIn, Twitter/X

---

## Coding Standards

### General Rules
- Use **functional React components** with hooks only — no class components
- Use **CSS variables** for all colors — never hardcode hex values
- Keep components **small and single-responsibility** — one component per file
- Use **semantic HTML** (`<nav>`, `<section>`, `<main>`, `<footer>`, `<h1>`–`<h3>`)
- All images must have descriptive `alt` attributes
- No `console.log` left in production code

### Naming Conventions
```
Components:   PascalCase    →  Hero.jsx, ProjectCard.jsx
CSS classes:  kebab-case    →  .project-card, .hero-btns
Variables:    camelCase     →  const projectList = []
Constants:    UPPER_SNAKE   →  const MAX_PROJECTS = 6
Files:        kebab-case    →  project-card.css
```

### React Patterns
```jsx
// ✅ Good — clean functional component
const ProjectCard = ({ title, description, tags, link }) => {
  return (
    <div className="project-card">
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description}</p>
    </div>
  );
};

// ❌ Bad — inline styles, no props destructuring
const ProjectCard = (props) => {
  return <div style={{ background: '#1a1a22' }}>{props.title}</div>;
};
```

### CSS Rules
- Use `var(--color-name)` for every color property
- Mobile-first responsive — write base styles for mobile, use `@media (min-width: 900px)` for desktop
- Animations: use `@keyframes` + `animation` property, not JS-driven animations
- Never use `!important`

### Git Commit Format
```
feat: add contact form with MongoDB integration
fix: hero photo not loading on mobile
style: update project card hover animation
docs: update CLAUDE.md with new project details
```

---

## Backend (Contact Form API)

### Route
```
POST /api/contact
Body: { name, email, message }
```

### Validation Rules
- `name`: required, min 2 chars, max 100 chars
- `email`: required, valid email format
- `message`: required, min 10 chars, max 2000 chars

### MongoDB Schema
```js
// models/Contact.js
const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

### Environment Variables
```env
MONGODB_URI=mongodb+srv://...
PORT=5000
CLIENT_URL=https://leonardkwolesha.dev
```

**Never commit `.env` files. Always use `.env.example` with placeholder values.**

---

## Vercel Deployment

### Build Settings
| Setting | Value |
|---|---|
| Framework | Vite (React) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### Environment Variables (set in Vercel Dashboard)
- `MONGODB_URI`
- `PORT` (not needed on Vercel — set to 5000 locally only)

### vercel.json (for monorepo with backend)
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/server/index.js" }
  ]
}
```

---

## Commands

```bash
# From the PROJECT ROOT — runs both servers together
npm run dev           # frontend (5173) + backend (5000) in parallel
npm run build         # production build of frontend only
npm run frontend      # frontend dev server only
npm run backend       # backend dev server only

# Or cd into each folder individually:
cd frontend && npm run dev     # http://localhost:5173
cd backend  && npm run dev     # http://localhost:5000
```

---

## Common Tasks

### Adding a New Project
1. Open `frontend/src/data/content.js`
2. Add an entry to the `projects` array:
```js
{
  title: "Project Name",
  description: "What it does in one sentence.",
  tags: ["React", "Node.js", "MongoDB"],
  emoji: "🚀",
  gradient: "linear-gradient(135deg, #0d0d1f, #111122)",
  link: "https://github.com/leonard/project-name"
}
```
3. No other files need to change — the card renders automatically.

### Updating Personal Info
All personal content lives in `frontend/src/data/content.js`:
```js
export const personal = {
  name: "Leonard Kwolesha",
  title: "Full Stack Developer",
  email: "leonard@example.com",
  github: "https://github.com/leonard",
  linkedin: "https://linkedin.com/in/leonard",
  twitter: "https://twitter.com/leonard",
  location: "Dar es Salaam, Tanzania"
};
```

### Changing the Accent Color
Update only the CSS variables in `frontend/src/index.css`:
```css
:root {
  --red: #e8523a;  /* change this one value */
  --red2: #ff6b50; /* and this hover variant */
}
```
Every element using the accent color updates automatically.

---

## What NOT to Do

- ❌ Do NOT hardcode colors — always use CSS variables
- ❌ Do NOT use `class` — use `className` in React JSX
- ❌ Do NOT use `<form>` tags that trigger page reload — always call `e.preventDefault()`
- ❌ Do NOT store the MongoDB URI in source code
- ❌ Do NOT add dependencies without checking if they're already available
- ❌ Do NOT change the accent color without updating both `--red` and `--red2`
- ❌ Do NOT leave unused imports or commented-out code blocks
- ❌ Do NOT make the portfolio look generic — the dark + red accent identity is intentional

---

## Definition of Done

A task is complete when:
- [ ] Feature works on desktop (1280px+), tablet (768px), and mobile (375px)
- [ ] No console errors or warnings
- [ ] Component uses CSS variables, not hardcoded values
- [ ] All images have `alt` attributes
- [ ] Code is clean — no unused imports or `console.log`
- [ ] Git commit message follows the format above
- [ ] Vercel preview deployment builds successfully

---

*Last updated: May 2026 — Leonard Kwolesha*
