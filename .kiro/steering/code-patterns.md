---
inclusion: fileMatch
fileMatchPattern: ["**/*.js", "**/*.html"]
---
# Code patterns

## Scenario shape (core.js)
```js
{ id: 'unique', kind: 'Email' | 'SMS' | 'Web page', scam: 1 | 0,
  from, url, subj, body }   // any text field may contain markup
```
- `{{text||why}}`: a real red flag. A scam needs at least one; a genuine letter needs none.
- `((text||why))`: a decoy that looks odd but is fine. Genuine letters should usually have one.
- Both parts are required and must be non-empty. Markers must balance.
- Keep `why` to one or two plain sentences that teach a habit.

## DOM
- Clues render as `<button class="tell|decoy" aria-pressed>`. `tabindex` is -1 in dark mode and 0 when Lights on.
- Escape everything with `esc()`. Build markup with template strings; no `innerHTML` with unescaped data.
- Verdicts lock the round: disable buttons, add result classes, then show the case file in the `aria-live` region.

## Audio and storage
- The `A` module synthesises all sound with Web Audio. Create the context only after a click.
- localStorage keys: `dlo-best`, `dlo-stats`, `dlo-snd`. Always wrap in try/catch.

## Tests
- Run `node tests/test.js`. New scenario => validator covers it. Scoring change => add a property check.
