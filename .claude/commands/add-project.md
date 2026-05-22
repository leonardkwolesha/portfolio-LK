# Add a New Project Card

Add a new project entry to the portfolio.

## Usage

```
/add-project
```

You will be prompted for:
- **Title** — project name
- **Description** — 1 sentence shown on the card
- **Tags** — comma-separated tech stack (e.g. React, Node.js, MongoDB)
- **Emoji** — single emoji representing the project (e.g. 🛒, 💬, 📊)
- **Gradient** — card background gradient (default: `linear-gradient(135deg, #0d0d1f, #111122)`)
- **Link** — GitHub URL or live URL (use `""` if none yet)

## What this skill does

1. Opens `src/data/content.js`
2. Appends the new object to the `projects` array
3. Auto-assigns `id` as current array length + 1
4. Strips extra whitespace from all tag strings

## Rules

- **Never** replace existing entries — append only
- **Never** hardcode colors in the project object — gradients are the only exception
- If `src/data/content.js` doesn't exist yet, scaffold it with the `personal` export and an empty `projects` array first (following the template in CLAUDE.md), then append
- Tags must match the exact tech names used in the Stack section for consistency

## Output

```
✅ Added "<title>" as project #<n> in src/data/content.js
```
