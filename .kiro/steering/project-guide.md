---
inclusion: always
---
# Dead Letter Office: project guide

## Stack
Vanilla HTML, CSS and JavaScript. No framework, no bundler, no dependencies. Node is used only to run tests.

## File map
- `core.js`: scenarios, markup parser, validator, scoring, ranking. Pure logic; runs in the browser and in Node.
- `engine.js`: seeded letter generator, rule-based analyzer (also powers the inspector), adaptive deck builder.
- `app.js`: screens, lamp proximity, marking, verdicts, candles, whispers, sound, badges, share text.
- `index.html`: layout and all styles (atmosphere, paper, stamps, candles).
- `tests/test.js` and `tests/engine.test.js`: scenario validation, scoring properties, generator and analyzer properties. Run both with `npm test`.
- `.kiro/`: steering, hooks, workflows, a custom agent and specs for this project.

## Commands
- `npm test` must pass before any change is considered done.
- `python3 -m http.server 8000` to preview.

## Rules of the codebase
1. Hand-written scenario text lives in `core.js`; generated text comes from the pools in `engine.js` and uses `{{text||why}}` for red flags and `((text||why))` for decoys. See code-patterns.
2. Every piece of scenario text reaches the DOM through `esc()`. Never insert it raw.
3. Scoring changes need a matching property test.
4. Nothing may make a network request. Storage access is wrapped in try/catch.
5. A feature is done when tests pass, Lights on mode still works by keyboard, and reduced motion is respected.
