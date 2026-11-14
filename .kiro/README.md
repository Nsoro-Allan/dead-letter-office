# .kiro Directory

This directory contains configuration and guidance files for the Kiro IDE to enhance the development experience.

## Directory Structure

```
.kiro/
├── steering/              # Context and guidelines
│   ├── project-guide.md          # Main project documentation
│   └── component-patterns.md     # Component conventions
├── workflows/             # Reusable workflows
│   └── add-feature.workflow.json # Template for adding features
├── hooks/                 # Event-driven automation
│   └── build-check.json          # TypeScript check on save
├── agents/               # Custom agent definitions (empty)
└── README.md            # This file
```

## Files Explained

### Steering Files (`steering/`)

Steering files provide context and guidelines to Kiro agents:

#### `project-guide.md`
- **Inclusion**: Auto (always loaded)
- **Purpose**: Main project context, tech stack, file structure
- **Use**: Reference for understanding the project
- **Contains**: Design philosophy, content structure, common tasks

#### `component-patterns.md`
- **Inclusion**: Auto when editing `components/**/*.tsx`
- **Purpose**: React component patterns and conventions
- **Use**: Reference when creating/editing components
- **Contains**: Code templates, styling patterns, animation patterns

### Workflows (`workflows/`)

Reusable automation workflows:

#### `add-feature.workflow.json`
- **Purpose**: Structured workflow for adding new features
- **Inputs**: `feature_name`, `feature_description`
- **Steps**: Investigation → Implementation → Testing
- **Usage**: Run via Kiro workflow commands

### Hooks (`hooks/`)

Event-driven automations:

#### `build-check.json`
- **Trigger**: PostFileSave on `components/**/*.tsx`
- **Action**: Run TypeScript type checking
- **Purpose**: Catch type errors immediately
- **Timeout**: 30 seconds

## How to Use

### For Developers

The `.kiro` directory enhances your workflow automatically:

1. **Steering files** load context when relevant
2. **Hooks** run checks on file saves
3. **Workflows** provide templates for common tasks

You don't need to do anything - Kiro handles it!

### For AI Agents

When working on this project:

1. **Read steering files first** - They contain essential context
2. **Follow component patterns** - Maintain consistency
3. **Use workflows** - For structured feature development
4. **Respect hooks** - They ensure code quality

## Customization

### Add New Steering File

Create `steering/your-guide.md`:
```markdown
---
name: Your Guide Name
description: What this guide covers
inclusion: auto
---

# Content here
```

### Add New Hook

Create `hooks/your-hook.json`:
```json
{
  "version": "v1",
  "hooks": [{
    "name": "Hook Name",
    "trigger": "PostFileSave",
    "matcher": "pattern",
    "action": {
      "type": "command",
      "command": "your-command"
    }
  }]
}
```

### Add New Workflow

Create `workflows/your-workflow.workflow.json`:
```json
{
  "name": "Workflow Name",
  "description": "What it does",
  "inputs": {},
  "steps": []
}
```

## Benefits

### Consistency
- All agents follow same patterns
- Design system maintained automatically
- Code quality enforced

### Productivity
- Context loaded automatically
- Common tasks templated
- Errors caught early

### Documentation
- Living documentation in code
- Always up-to-date
- Easy to discover

## Best Practices

1. **Keep steering files focused** - One topic per file
2. **Update as project evolves** - Keep context current
3. **Test workflows** - Ensure they work end-to-end
4. **Use clear hook names** - Describe what they do
5. **Document patterns** - Help future contributors

## Related Files

- `AGENTS.md` - Root-level agent guidelines
- `README.md` - Main project documentation
- `PROJECT_STRUCTURE.md` - Architecture details

## Support

For questions about Kiro configuration:
- Read Kiro documentation
- Check steering files for examples
- Experiment with hooks and workflows

---

**Note**: This directory is part of the Kiro IDE project structure. It enhances development but doesn't affect the built application.
