# Pre-Deploy Checklist

Run a full quality check before pushing to Vercel.

## Usage

```
/deploy-check
```

## What this skill does

Runs the following checks in order and reports `PASS`, `WARN`, or `FAIL` for each:

### 1. Build
```bash
npm run build
```
Must exit 0, zero errors, zero warnings.

### 2. Hardcoded colors
Search all `.jsx` and `.css` files in `src/` for raw hex values outside of
`src/index.css` `:root {}`. Any hex in a component file is a violation.

### 3. CSS variables present
Confirm `src/index.css` defines all 8 required variables:
`--bg`, `--bg2`, `--bg3`, `--red`, `--red2`, `--white`, `--gray`, `--border`

### 4. `.env` file safety
Confirm `.env` is listed in `.gitignore`. Confirm no file in `src/` or `server/`
contains a raw MongoDB URI string (`mongodb+srv://`).

### 5. Project data
Check `src/data/content.js` exports both `personal` and `projects`.
Confirm `personal.email` is not the placeholder `"leonard@example.com"`.
List any project with an empty `link` field as a WARN (not a FAIL).

### 6. Image assets
For each photo referenced in CLAUDE.md (`ceo_nobg.png`, `leonard_nobg.png`),
confirm the file exists in `public/`. List any missing files as FAIL.

### 7. Meta tags
Check `index.html` for `<title>`, `<meta name="description">`,
`og:title`, `og:description`. Flag any missing or still showing Vite defaults.

### 8. Console log check
Search all `src/` files for `console.log` — any found is a WARN.

### 9. Responsive reminder
Print: "🔲 Manually test at 375px, 768px, and 1280px in browser devtools before deploying."

## Output format

```
=== Pre-Deploy Checklist ===
[PASS] Build — 0 errors, 0 warnings
[PASS] No hardcoded hex colors in components
[PASS] All 8 CSS variables defined
[PASS] .env in .gitignore, no URI in source
[WARN] projects[2].link is empty (ok if not deployed yet)
[FAIL] Missing image: public/ceo_nobg.png
[PASS] Meta tags present
[WARN] 1 console.log found in Hero.jsx
[INFO] 🔲 Test at 375px, 768px, 1280px before deploying
```

Fix all `FAIL` items. Resolve `WARN` items where possible before going live.
