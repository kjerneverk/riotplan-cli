# AI Agent Guide: RiotPlan CLI

**Role**: You are an AI assistant tasked with understanding or using the `riotplan-cli` command-line interface.

**Goal**: Provide a comprehensive understanding of CLI commands for managing long-lived, stateful AI workflows.

## Core Capabilities

`riotplan-cli` provides command-line access to the `riotplan` framework:

*   **Plan Creation**: Initialize new plans with proper directory structure.
*   **Status Tracking**: View current progress, blockers, and issues.
*   **Step Management**: List, execute, and manage individual steps.
*   **Resumption**: Resume interrupted plans from their last known state.
*   **Validation**: Verify plan structure and file conventions.

## Quick Start

```bash
# Install globally
npm install -g riotplan-cli

# Create a new plan
riotplan init my-feature

# Check status
riotplan status

# List steps
riotplan list

# Execute next step
riotplan execute

# Resume after interruption
riotplan resume
```

## Command Overview

| Command | Description |
|---------|-------------|
| `init <name>` | Create a new plan |
| `status [path]` | Show current status |
| `list [path]` | List steps |
| `execute [step]` | Execute a step |
| `resume` | Resume interrupted plan |
| `validate [path]` | Validate structure |
| `update-status` | Regenerate STATUS.md |
| `add-step <title>` | Add new step |

## Documentation Structure

This guide directory contains specialized documentation:

*   [Usage Patterns](./usage.md): Detailed command documentation and examples.
*   [Configuration](./configuration.md): CLI configuration options.
*   [Development](./development.md): Guide for contributing to `riotplan-cli`.

