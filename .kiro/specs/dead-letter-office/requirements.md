# Requirements (EARS)
1. WHEN the player moves the lamp over a letter, THE SYSTEM SHALL make clues within 90px glow.
2. WHEN the player taps a glowing clue, THE SYSTEM SHALL toggle its marked state.
3. WHEN the player chooses Deliver or Burn, THE SYSTEM SHALL lock the letter, score it, and show a case file explaining every clue.
4. THE SYSTEM SHALL include genuine letters, so burning everything is penalised.
5. WHEN Lights on is enabled, THE SYSTEM SHALL show full-contrast text and make every clue keyboard focusable.
6. THE SYSTEM SHALL reject any scenario where a scam has no clue or a genuine letter has one.
7. THE SYSTEM SHALL run offline with no network requests and store only the best score locally.
8. THE SYSTEM SHALL give the player three candles, and WHEN a verdict is wrong, SHALL snuff one; WHEN none remain, SHALL end the shift.
9. WHEN a scam is delivered, THE SYSTEM SHALL show a brief jump scare, reduced to a plain flash under prefers-reduced-motion.
10. WHEN the player asks for a whisper, THE SYSTEM SHALL pulse one unmarked clue, cost 20 points, and allow at most three per shift.
11. THE SYSTEM SHALL synthesise all sound in the browser, default to off, and remember the player's choice.
12. WHEN a shift ends, THE SYSTEM SHALL show a rank, earned badges and a copyable result.
13. THE SYSTEM SHALL generate fresh letters every shift from seeded templates, with Easy, Normal and Hard difficulty, and every generated scam SHALL contain at least one categorised clue.
14. WHEN the player starts the Daily case, THE SYSTEM SHALL build the same deck for everyone on the same date.
15. THE SYSTEM SHALL record per-category clue accuracy locally and weight future letters toward the player's weakest categories.
16. WHEN the player pastes a message into the inspector, THE SYSTEM SHALL analyse it on-device, reveal likely red flags under the lamp, list explanations, and SHALL never declare a message safe.
17. THE SYSTEM SHALL prevent pasted text from forging clue markup.
