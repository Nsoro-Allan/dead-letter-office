# .kiro for Dead Letter Office

Configuration Kiro uses on this project.

| Path | Purpose | Inclusion / trigger |
|---|---|---|
| `steering/product.md` | What the app is for and its hard constraints | always |
| `steering/project-guide.md` | Stack, file map, commands, codebase rules | always |
| `steering/design.md` | Colour, type, motion and accessibility rules | always |
| `steering/code-patterns.md` | Scenario markup, DOM, audio and storage patterns | fileMatch on `.js` and `.html` |
| `hooks/dead-letter-office.json` | Runs the tests when `core.js` or tests change; read-only accessibility review when UI files change | fileEdited |
| `agents/scenario-author.json` | Custom agent that writes and reviews new letters | used by `add-scenario` |
| `workflows/add-scenario.workflow.json` | Draft with the custom agent, add, validate | run on demand |
| `workflows/add-feature.workflow.json` | Investigate, implement, verify | run on demand |
| `specs/dead-letter-office/` | EARS requirements, design and task list | spec |

## Changes from the earlier configuration
The earlier `.kiro` described a different project (a Next.js haunted portfolio). Updated here:
- Steering rewritten for this app; `inclusion: auto` plus `fileMatchPattern` replaced by `always` and `fileMatch`, since `fileMatchPattern` only applies to `fileMatch`.
- Hook moved to the current `.kiro/hooks/*.json` `v1` schema (`when` / `then`) instead of `trigger` / `matcher` / `action`, and the hard-coded local path and TypeScript check removed.
- Workflows corrected to the documented recipe shape (`inputs` map, `{{previous.output}}`, `wf-planner` / `wf-coder`), with the hard-coded path removed and a project-specific `add-scenario` recipe added.
- The Victorian redesign notes were folded into `steering/design.md`; the portfolio component checklist was dropped.
- New: a custom agent, which the 2026 write-up asks about.

## Verify in Kiro
Hook patterns, workflow validation and the agent file were written against the current docs but not executed here. Open the Hooks panel, run `validate_workflow` on each recipe, and confirm the agent appears, then note what you actually used in your submission.
