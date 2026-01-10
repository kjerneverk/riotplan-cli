# Development Guide

**Purpose**: Instructions for contributing to `riotplan-cli`.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Build**:
    ```bash
    npm run build
    ```
    This builds the CLI to `dist/cli.js`.

3.  **Link Locally**:
    ```bash
    npm link
    ```
    Now you can use `riotplan` command globally.

## Testing

We use **Vitest** for testing.

*   **Run Tests**:
    ```bash
    npm test
    ```

### Test Structure

*   `tests/unit/`: Tests for individual commands.
*   `tests/integration/`: End-to-end CLI tests.

## Project Structure

```
riotplan-cli/
├── src/
│   └── cli.ts          # Main CLI entry point
├── tests/
├── guide/              # AI agent documentation
├── .github/            # GitHub workflows
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Adding Commands

Commands are defined using `commander`:

```typescript
program
  .command('new-command <arg>')
  .description('Description of the command')
  .option('-o, --option <value>', 'Option description')
  .action((arg, options) => {
    // Implementation
  });
```

## Linting

*   **Check**: `npm run lint`
*   **Fix**: `npm run lint:fix`

