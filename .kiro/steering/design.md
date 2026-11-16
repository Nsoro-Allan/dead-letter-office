---
inclusion: always
---
# Design system
Refined and atmospheric, not cheap Halloween. A candlelit Victorian dead letter office: restrained glows, thin borders, one memorable interaction (the UV lamp).

## Tokens (as built in index.html)
- void `#07050c`, parchment ink `#ece6f7`, ash `#857d99`
- candle amber `#f4b960` (primary accent), UV violet `#b99cff` (clues), warning `#ff6f84`, safe `#7bdca3`
- Type: Palatino stack with Georgia fallback; italic for field labels; sentence case, plain verbs.

## Do
- Keep glows soft and purposeful: violet means "inspect this", amber means "you marked this".
- Make effects answer the player's action (stamps, burn, snuffed candle). Ambient motion stays slow.
- Keep the dark reading mode intentionally low contrast, and always offer **Lights on** with full contrast and keyboard-focusable clues.
- Never rely on colour alone: clues also change underline style.

## Don't
- No neon, no bouncy or flashy motion, no extra decorative layers that hide text.
- No effects that cannot be switched off. Honour `prefers-reduced-motion`: fog, bats, flicker, shake and the scare face stop; the scare becomes a plain flash.
- Sound is synthesised in the browser, off by default, and created only after a user gesture.
