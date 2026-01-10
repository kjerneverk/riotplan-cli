# riotplan-cli

Command-line interface for managing and executing long-lived, stateful AI workflows.

## Installation

```bash
npm install -g riotplan-cli
```

## Commands

### init

Create a new plan:

```bash
riotplan init my-feature
riotplan init my-feature --description "Implement the cool feature"
riotplan init my-feature --template detailed --steps 5
```

Creates:

```
my-feature/
├── my-feature-prompt.md     # Meta-prompt (prompt-of-prompts)
├── SUMMARY.md               # Overview of the approach
├── EXECUTION_PLAN.md        # Step-by-step strategy
├── STATUS.md                # Current state
└── plan/
    ├── 01-analysis.md
    ├── 02-design.md
    ├── 03-implementation.md
    └── ...
```

### status

Show current plan status:

```bash
riotplan status                 # Current directory
riotplan status ./my-plan       # Specific path
riotplan status -v              # Verbose output
riotplan status --json          # JSON output
```

Example output:

```
Plan: my-feature
Status: 🔄 in_progress
Progress: 45% (5/11 steps)
Current Step: 06-testing
Last Updated: 2026-01-10

Blockers: None
Issues: 1 (low priority)
```

### list

List steps in a plan:

```bash
riotplan list                   # All steps
riotplan list --pending         # Only pending
riotplan list --all             # Include completed
```

Example output:

```
✅ 01 analysis
✅ 02 design
✅ 03 architecture
✅ 04 implementation-core
🔄 05 implementation-api
⬜ 06 testing
⬜ 07 documentation
⬜ 08 release
```

### execute

Execute plan steps:

```bash
riotplan execute                # Execute next step
riotplan execute 05             # Execute specific step
riotplan execute --dry-run      # Preview without executing
riotplan execute --force        # Ignore dependency checks
riotplan execute --provider openai
```

### resume

Resume an interrupted plan:

```bash
riotplan resume                 # Resume from STATUS.md
riotplan resume --skip-failed   # Skip any failed steps
riotplan resume --from 03       # Resume from specific step
```

### validate

Validate plan structure:

```bash
riotplan validate               # Current directory
riotplan validate ./my-plan     # Specific path
riotplan validate --fix         # Attempt to fix issues
```

Checks:

- Required files exist (STATUS.md, EXECUTION_PLAN.md, etc.)
- STATUS.md is parseable
- Step files have valid numbering (01-*, 02-*, etc.)
- Step dependencies are valid
- No circular dependencies

### update-status

Regenerate STATUS.md from current state:

```bash
riotplan update-status          # Regenerate
riotplan update-status --dry-run # Preview changes
```

### add-step

Add a new step to the plan:

```bash
riotplan add-step "Integration Testing"
riotplan add-step "Security Audit" --number 07
riotplan add-step "Review" --after 05
```

## Status Indicators

| Symbol | Meaning |
|--------|---------|
| ⬜ | Pending |
| 🔄 | In Progress |
| ✅ | Completed |
| ❌ | Failed |
| ⏸️ | Blocked |
| ⏭️ | Skipped |

## Configuration

Create `.riotplanrc.json` in your plan directory:

```json
{
  "defaultProvider": "openai",
  "autoUpdateStatus": true,
  "stepTemplate": "detailed",
  "analysis": {
    "enabled": true,
    "directory": "analysis"
  }
}
```

## Examples

### Working with an existing plan

```bash
cd prompts/my-feature

# Check status
riotplan status

# List remaining work
riotplan list --pending

# Execute next step
riotplan execute

# Or execute specific step
riotplan execute 05
```

### Creating a new plan

```bash
# Create plan
riotplan init feature-x --description "Implement feature X"

# Edit the generated files
code feature-x/

# Start execution
cd feature-x
riotplan execute 01
```

### Recovering from interruption

```bash
# See current state
riotplan status -v

# Resume where we left off
riotplan resume

# Or skip the failed step
riotplan resume --skip-failed
```

## Roadmap

### v0.1.0 - Core Commands
- [ ] `init` - Create new plans
- [ ] `status` - Show plan status
- [ ] `list` - List steps
- [ ] `validate` - Validate structure

### v0.2.0 - Execution
- [ ] `execute` - Execute steps
- [ ] `resume` - Resume plans
- [ ] LLM provider integration

### v0.3.0 - Advanced
- [ ] `add-step` - Add steps
- [ ] `update-status` - Regenerate status
- [ ] Templates support
- [ ] Configuration file

## Related Packages

- `riotplan` - Core plan framework
- `riotprompt-cli` - Prompt CLI
- `agentic` - Agentic execution
- `execution` - LLM provider interfaces

## License

Apache-2.0

