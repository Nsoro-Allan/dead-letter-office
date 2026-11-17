# .kiro for Dead Letter Office

Configuration for Kiro on this project.

| Path | Purpose | Inclusion / trigger |
|---|---|---|
| `steering/product.md` | What the app is for and its hard constraints | always |
| `steering/project-guide.md` | Stack, file map, commands, codebase rules | always |
| `steering/design.md` | Color, type, motion and accessibility rules | always |
| `steering/code-patterns.md` | Scenario markup, DOM, audio and storage patterns | fileMatch on `.js` and `.html` |
| `hooks/dead-letter-office.json` | Runs `npm test` when `core.js`, `engine.js` or tests change; accessibility review when UI files change | PostFileSave |
| `agents/scenario-author.json` | Custom agent that writes and reviews new letters | used by `add-scenario` workflow |
| `workflows/add-scenario.workflow.json` | Draft with the custom agent, add, validate | run on demand |
| `workflows/add-feature.workflow.json` | Investigate, implement, verify | run on demand |
| `specs/dead-letter-office/` | Requirements, design and task list | spec session |

## Using this configuration

**Steering files** are automatically included based on their front matter. Product, project-guide, and design are always loaded. Code-patterns loads when JavaScript or HTML files are in context.

**Hooks** fire automatically on file save events. The test hook validates scenarios and scoring properties. The accessibility hook reminds about keyboard navigation, ARIA, and reduced-motion preferences without editing files.

**Workflows** can be launched from the command palette or by running `kiro workflow run <name>`:
- `add-scenario`: Creates a new letter using the custom scenario-author agent
- `add-feature`: Full feature pipeline from investigation through verification

**Custom agent** (`scenario-author`) knows the clue markup syntax and can write valid letters that pass validation.

**Specs** hold structured requirements and implementation tasks tracked through Kiro's spec workflow.

## Kiroween 2026 notes

This configuration demonstrates:
- Layered steering (product/design/patterns) that stays out of the way until relevant
- Domain-specific agent (scenario-author) that understands the clue markup DSL
- Property-based test enforcement through hooks
- Accessibility guardrails built into the workflow

All paths are relative to workspace root. The custom agent and workflows reference files by absolute path to work correctly in worktrees.
