# CLI Usage Patterns

**Purpose**: Detailed documentation for all `riotplan` CLI commands.

## Installation

```bash
# Install globally
npm install -g riotplan-cli

# Or run via npx
npx riotplan-cli <command>
```

## Commands

### init

Create a new plan with the proper directory structure.

```bash
riotplan init <name> [options]
```

**Arguments:**
- `name`: Plan code/identifier (becomes directory name)

**Options:**
- `-d, --description <desc>`: Plan description
- `-t, --template <template>`: Template to use (default: "default")
- `--steps <count>`: Number of initial steps (default: 3)

**Examples:**
```bash
# Basic plan
riotplan init my-feature

# With description
riotplan init user-auth --description "Implement user authentication"

# With custom steps
riotplan init api-migration --steps 5
```

**Creates:**
```
my-feature/
├── my-feature-prompt.md
├── SUMMARY.md
├── EXECUTION_PLAN.md
├── STATUS.md
└── plan/
    ├── 01-step-one.md
    ├── 02-step-two.md
    └── 03-step-three.md
```

---

### status

Show current plan status.

```bash
riotplan status [path] [options]
```

**Arguments:**
- `path`: Path to plan directory (default: current directory)

**Options:**
- `-v, --verbose`: Show detailed status
- `--json`: Output as JSON

**Examples:**
```bash
# Current directory
riotplan status

# Specific plan
riotplan status ./prompts/my-feature

# Verbose output
riotplan status -v

# JSON for scripting
riotplan status --json
```

**Output:**
```
Plan: my-feature
Status: 🔄 in_progress
Progress: 40% (2/5 steps)
Current Step: 03-implementation
Last Updated: 2026-01-10

Blockers: None
Issues: 1 (low priority)
```

---

### list

List steps in a plan.

```bash
riotplan list [path] [options]
```

**Options:**
- `--all`: Show all steps including completed
- `--pending`: Show only pending steps

**Examples:**
```bash
# All steps
riotplan list

# Only pending
riotplan list --pending
```

**Output:**
```
✅ 01 analysis
✅ 02 design
🔄 03 implementation
⬜ 04 testing
⬜ 05 documentation
```

---

### execute

Execute a plan step.

```bash
riotplan execute [step] [options]
```

**Arguments:**
- `step`: Step number to execute (default: next pending)

**Options:**
- `--dry-run`: Preview without executing
- `--force`: Execute even if dependencies not met
- `--provider <provider>`: LLM provider to use

**Examples:**
```bash
# Execute next step
riotplan execute

# Execute specific step
riotplan execute 03

# Preview execution
riotplan execute --dry-run

# Force execution
riotplan execute 05 --force
```

---

### resume

Resume an interrupted plan.

```bash
riotplan resume [options]
```

**Options:**
- `--skip-failed`: Skip any failed steps
- `--from <step>`: Resume from specific step

**Examples:**
```bash
# Resume from STATUS.md
riotplan resume

# Skip failed steps
riotplan resume --skip-failed

# Resume from specific step
riotplan resume --from 03
```

---

### validate

Validate plan structure and conventions.

```bash
riotplan validate [path] [options]
```

**Options:**
- `--fix`: Attempt to fix issues

**Validates:**
- Required files exist (STATUS.md, EXECUTION_PLAN.md)
- STATUS.md is parseable
- Step files have valid numbering
- No circular dependencies

**Examples:**
```bash
# Validate current directory
riotplan validate

# Validate specific plan
riotplan validate ./prompts/my-feature

# Auto-fix issues
riotplan validate --fix
```

---

### update-status

Regenerate STATUS.md from current state.

```bash
riotplan update-status [path] [options]
```

**Options:**
- `--dry-run`: Show what would be written

**Examples:**
```bash
# Regenerate STATUS.md
riotplan update-status

# Preview changes
riotplan update-status --dry-run
```

---

### add-step

Add a new step to the plan.

```bash
riotplan add-step <title> [options]
```

**Arguments:**
- `title`: Step title

**Options:**
- `-n, --number <number>`: Step number (default: next available)
- `-a, --after <step>`: Insert after this step (renumbers following steps)

**Examples:**
```bash
# Add at end
riotplan add-step "Integration Testing"

# Add at specific position
riotplan add-step "Security Audit" --number 07

# Insert after existing step
riotplan add-step "Code Review" --after 03
```

## Status Indicators

| Symbol | Status | Meaning |
|--------|--------|---------|
| ⬜ | `pending` | Not started |
| 🔄 | `in_progress` | Currently active |
| ✅ | `completed` | Done |
| ❌ | `failed` | Failed with error |
| ⏸️ | `blocked` | Waiting on dependency |
| ⏭️ | `skipped` | Intentionally skipped |

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Plan not found |
| 4 | Validation failed |
| 5 | Execution failed |

