# Dead Letter Office

A haunted mail room that teaches you to spot scams. Letters arrive after midnight; you sweep a UV lamp over each one, mark the clues that glow, then **Deliver** the letter or **Burn** it. The spooky interface is the teaching mechanic: clues only reveal under the lamp, which trains the habit of inspecting a message before trusting it.

Built for Kiroween 2026, Costume Contest category.

## Run it
No build step, no dependencies, no network. Either open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000     # then visit http://localhost:8000

Run the tests with Node 16+: `node tests/test.js`

## How to play
1. Move the mouse (or drag a finger) over the letter. Text near the lamp brightens, and suspicious or unusual text glows violet.
2. Click or tap glowing text you think is a red flag. It turns amber. Tap again to unmark.
3. Choose **Deliver** (it's genuine) or **Burn** (it's a scam).
4. The case file explains every clue: spotted, missed, or a decoy that only looks odd.
5. A shift is 8 letters drawn from 14 (5 scams, 3 genuine). You have **three candles**: each wrong verdict snuffs one, and if the last goes out the shift ends early ("Claimed by the dead"). Finish for a rank from Haunted by Phishers up to Master Archivist, plus badges (Flawless shift, Eagle eyes, Steady hand, No whispers needed, Hot streak).

Some letters are genuine and contain decoys (a real courier tracking link, a short expiry on a code you just requested). Marking a decoy costs points, and burning a genuine letter scores nothing, so "burn everything" does not work.

## Scoring
- Correct verdict: 100 points, plus a streak bonus of 10 per consecutive correct verdict (capped at 50).
- Burning a scam: +25 for every real clue you marked.
- Each decoy you mark: −15 (a round never goes below 0).
- Wrong verdict: 0 points and one candle lost; delivering a scam also triggers a jump scare.
- **Whisper a clue**: pulses one unmarked clue, costs 20 points, 3 per shift.
- Your best score is stored in your browser (`localStorage`) and never leaves your device.

## Atmosphere
Moonlit room with drifting fog, cobwebs, passing bats, flickering candle flames, a wax-sealed letter that slides in, a stamp on every verdict and a burn effect for burned letters. Sound is synthesised in the browser (drone, wind, creaks, chimes, a snuff, a scare) with no audio files; it defaults to off and the toggle is remembered. The "Copy my result" button on the results screen copies a shareable line.

## Accessibility
- **Lights on** (top right) switches to full-contrast text and makes every clue a keyboard-focusable button (Tab, then Enter or Space). The dark reading mode is intentionally low contrast, so use Lights on if you find it hard to read.
- Clues also change underline style, not just colour. The candle flicker stops when your system requests reduced motion.
- Fog, bats, flicker, shake and the scare face are disabled under reduced motion (the scare becomes a plain flash). Sound is off by default.
- Results are announced through an `aria-live` region.

## How it works
| File | Role |
|---|---|
| `index.html` | Layout and styles. |
| `app.js` | Screens, lamp proximity detection (distance from the pointer to each clue's box, under 90px = glowing), marking, verdict flow, case file. |
| `core.js` | Pure logic: the 8 built-in letters, the markup parser, the scenario validator, scoring, ranking. Runs in the browser and in Node. |
| `tests/test.js` | Validates every scenario and runs 2,000 randomised property checks on scoring. |
| `.kiro/` | Steering files, spec (requirements, design, tasks) and a hook. See below. |

### Scenario markup
Letters are plain strings. `{{text||why}}` is a real red flag. `((text||why))` is a decoy that looks odd but is fine. The validator rejects a scam with no clue, a genuine letter with a clue, unbalanced markers, and empty explanations. To add a letter, append an object to `SCENARIOS` in `core.js` (fields: `id`, `kind`, `scam`, `from`, `url`, `subj`, `body`) and run `node tests/test.js`.

### Tested properties
A right verdict never scores less than a wrong one; marking more real clues never lowers a score; points stay within bounds; scenarios are well-formed and unique.

## Kiro files (read this before submitting)
`.kiro/` holds steering (product, project guide, design, code patterns), a hooks file, a custom agent (`scenario-author`), two workflow recipes, and the EARS spec with design and tasks. It was merged from the earlier `.kiro` in your repo, which described a different project, and corrected to the current Kiro formats; `.kiro/README.md` lists every change. The files were written alongside the code and were not run inside Kiro here, so open the project in Kiro, check the Hooks panel, run `validate_workflow` on the recipes, and write your real experience (specs vs vibe coding, hooks, steering, the custom agent, property-based testing) in your submission.

## Limits
- Fourteen hand-written letters; the app has no network features and does not scan your real mail.
- The UI was written and its logic tested under Node, but not exercised in a real browser during the build, so check it on desktop and mobile before recording your demo.
- Ideas to extend: generate new letters with an LLM and run them through `validate`, add sound, add localised scam packs, add a teacher or team mode.

## Submission checklist
Public GitHub repo with the MIT `LICENSE` and the `.kiro/` folder committed (not gitignored), a live URL (GitHub Pages or Netlify works for this static site), a demo video under 3 minutes that opens with the lamp reveal, and your Kiro usage write-up.
