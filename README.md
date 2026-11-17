<div align="left">
  <img src="Assets/favicon.png" alt="Dead Letter Office" width="60" height="60">
</div>

# Dead Letter Office

**A haunted mail room that teaches you to spot phishing and scams.**

Sort letters after midnight with a UV lamp. Sweep the lamp over each message, mark what glows wrong, then **Deliver** or **Burn** it. The spooky interface is the teaching mechanic: clues only reveal under the lamp, training the habit that stops most scams — inspect before you trust.

Built for **Kiroween 2026, Costume Contest**.

## What it does

Dead Letter Office is a phishing awareness game with three modes:

1. **A shift** — Sort 8 letters (5 scams, 3 genuine) under time pressure. You have three candles; each wrong verdict snuffs one. Mark suspicious clues that glow under your UV lamp, then deliver or burn each letter.

2. **Weak-spot training** — The game tracks which clue types you miss (lookalike addresses, fake urgency, secrecy demands, odd payment requests, etc.) and weights future letters toward your weakest categories.

3. **Inspect a real message** — Paste a suspicious email or text. The rule-based analyzer highlights likely red flags and explains what to check, all on your device.

No accounts, no network calls, no build step. Everything runs offline in your browser.

## Run it

Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000

Run tests: `npm test` (requires Node 16+)

## How it works

**Generated letters** — `engine.js` builds letters from templates (7 scam patterns, 4 genuine) with procedural clues. Difficulty controls how many clues appear; weak-spot weighting decides which categories. Lookalike addresses are generated on the fly. Seeded randomness makes the Daily Case reproducible.

**Inspector** — Ten regex rules detect common scam patterns in pasted text: shortened links, lookalike domains, urgency language, payment requests, credential phishing, secrecy demands, too-good offers, and suspicious files. All analysis happens locally.

**Clue markup** — `{{text||why||category}}` marks red flags, `((text||why))` marks decoys. Everything reaches the DOM through `esc()` so pasted text cannot forge clues.

## Stack

Vanilla HTML, CSS and JavaScript. No framework, no bundler, no dependencies. Node only for tests.

**Files:**
- `core.js` — scenarios, markup parser, validator, scoring, ranking (pure logic, runs in browser and Node)
- `engine.js` — seeded generator, rule-based analyzer, adaptive deck builder  
- `app.js` — screens, lamp proximity, marking, verdicts, candles, whispers, sound, badges
- `index.html` / `style.css` — layout and atmosphere (paper, stamps, candles, fog, bats)
- `tests/` — scenario validation, scoring properties, generator properties
- `.kiro/` — steering files, hooks, workflows for this project

## Accessibility

- **Lights on** mode (top right) provides full contrast and keyboard-focusable clues
- Clues use underline style changes, not just color
- `prefers-reduced-motion` disables fog, bats, flicker, shake, and the scare face
- Sound is synthesized in-browser, off by default

## Kiroween 2026

This project was built for the Kiroween Costume Contest, demonstrating:
- Impact: addresses real phishing education gaps with adaptive training
- Design: atmospheric Victorian dead letter office that makes inspection tactile
- Innovation: procedural letter generation with weak-spot targeting
- Kiro implementation: custom workflows, steering files, and a scenario-author agent in `.kiro/`

---

**Privacy:** No accounts, analytics, or network requests. Only `localStorage` for scores and preferences. Pasted messages are analyzed in memory, never stored.
