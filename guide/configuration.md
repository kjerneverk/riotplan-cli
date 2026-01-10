# CLI Configuration

**Purpose**: Configuration options for `riotplan-cli`.

## Configuration File

The CLI respects `.riotplanrc.json` in the plan directory or parent directories.

```json
{
  "defaultProvider": "openai",
  "autoUpdateStatus": true,
  "stepTemplate": "detailed"
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RIOTPLAN_CONFIG` | Path to custom config file |
| `RIOTPLAN_LOG_LEVEL` | Logging verbosity (debug, info, warn, error) |
| `OPENAI_API_KEY` | OpenAI API key (if using OpenAI provider) |
| `ANTHROPIC_API_KEY` | Anthropic API key (if using Anthropic provider) |

## Global Flags

These flags work with all commands:

| Flag | Description |
|------|-------------|
| `--help` | Show help for command |
| `--version` | Show version |
| `-q, --quiet` | Suppress non-essential output |
| `--no-color` | Disable colored output |

## Provider Configuration

When executing steps, specify the LLM provider:

```bash
# Via flag
riotplan execute --provider openai

# Via environment
export RIOTPLAN_DEFAULT_PROVIDER=anthropic
riotplan execute
```

Supported providers:
- `openai` (default)
- `anthropic`
- `gemini`

