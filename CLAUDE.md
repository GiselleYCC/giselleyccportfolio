# CLAUDE.md — Giselle.C Personal Portfolio (Layer 2)

Layer 1 (universal rules) lives in `~/.claude/CLAUDE.md` and is auto-loaded — this file only holds what is specific to this project.

**Project goal:** Personal portfolio site showcasing UI/UX and HCI design work, for job applications and design-community presence.
**Audience:** Recruiters, hiring managers, fellow designers.
**Live at:** giselleyccportfolio.netlify.app — changes here affect a public site recruiters actively visit; treat every merge to `main`/deploy as outward-facing.

**Stack:** Plain HTML + CSS + JavaScript, no frameworks. Git initialized. Preview with `npx serve` or open `index.html` directly.

**Visual direction:** Defined per session — ask for 【參考】【效果】【素材】【禁止】 if unclear. Do not assume any prior project's style (the Roadtrip site's dark-outdoor theme is NOT this site's theme).

**Key layout rule (from her feedback):** device/prototype screenshots are never full-width. Single phone ≤ ~320px in a 2-col layout with text; two phones ≤ ~600px. Never crop screenshots with `object-fit: cover`. Full-bleed is only for true editorial/landscape photography.

**Assets:**
- `Profile.png`, `visual-archive-1.jpeg`, `visual-archive-2.jpeg` (root)
- `assets/files/resume.pdf`, `assets/door-face/`, `assets/twin3/`, `assets/stories-to-you/`
- `_unused/` — backups; never reference or delete

**Hard constraints:**
- Do not reference `_unused/` from HTML/CSS/JS
- Do not move or rename the project root (`~/Desktop/Claude/Web_Portfolio/` — renamed from `claude_Profolio` on 2026-07-08)
- `.claude/` stays gitignored
