/**
 * Tests for RiotPlan CLI
 * 
 * These tests verify the CLI commands exist and show appropriate stub messages.
 */

import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join } from 'path';

const CLI_PATH = join(__dirname, '..', 'dist', 'cli.js');

function runCli(args: string): string {
  try {
    return execSync(`node ${CLI_PATH} ${args}`, { 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
  } catch (error: any) {
    // CLI may exit with non-zero for help
    return error.stdout || error.stderr || '';
  }
}

describe('riotplan CLI', () => {
  describe('--version', () => {
    it('should display version', () => {
      const output = runCli('--version');
      expect(output.trim()).toBe('0.0.1');
    });
  });

  describe('--help', () => {
    it('should display help message', () => {
      const output = runCli('--help');
      expect(output).toContain('CLI for managing and executing long-lived');
      expect(output).toContain('Commands:');
    });
  });

  describe('init command', () => {
    it('should show stub message', () => {
      const output = runCli('init my-plan');
      expect(output).toContain('riotplan is not yet implemented');
      expect(output).toContain('Would create plan: my-plan');
    });

    it('should handle description option', () => {
      const output = runCli('init my-plan -d "Test description"');
      expect(output).toContain('Description: Test description');
    });
  });

  describe('status command', () => {
    it('should show stub message', () => {
      const output = runCli('status');
      expect(output).toContain('riotplan is not yet implemented');
      expect(output).toContain('Would show status');
    });

    it('should accept path argument', () => {
      const output = runCli('status ./my-plan');
      expect(output).toContain('./my-plan');
    });

    it('should handle verbose option', () => {
      const output = runCli('status -v');
      expect(output).toContain('verbose mode');
    });
  });

  describe('list command', () => {
    it('should show stub message', () => {
      const output = runCli('list');
      expect(output).toContain('riotplan is not yet implemented');
      expect(output).toContain('Would list steps');
    });
  });

  describe('execute command', () => {
    it('should show stub message', () => {
      const output = runCli('execute');
      expect(output).toContain('riotplan is not yet implemented');
      expect(output).toContain('Would execute');
    });

    it('should accept step argument', () => {
      const output = runCli('execute 3');
      expect(output).toContain('Would execute: 3');
    });

    it('should handle dry-run option', () => {
      const output = runCli('execute --dry-run');
      expect(output).toContain('dry run mode');
    });
  });

  describe('resume command', () => {
    it('should show stub message', () => {
      const output = runCli('resume');
      expect(output).toContain('riotplan is not yet implemented');
      expect(output).toContain('Would resume');
    });

    it('should handle from option', () => {
      const output = runCli('resume --from 5');
      expect(output).toContain('resuming from step 5');
    });
  });

  describe('validate command', () => {
    it('should show stub message', () => {
      const output = runCli('validate');
      expect(output).toContain('riotplan is not yet implemented');
      expect(output).toContain('Would validate');
    });

    it('should handle fix option', () => {
      const output = runCli('validate --fix');
      expect(output).toContain('auto-fix mode');
    });
  });

  describe('update-status command', () => {
    it('should show stub message', () => {
      const output = runCli('update-status');
      expect(output).toContain('riotplan is not yet implemented');
      expect(output).toContain('Would regenerate STATUS.md');
    });
  });

  describe('add-step command', () => {
    it('should show stub message', () => {
      const output = runCli('add-step "New Step"');
      expect(output).toContain('riotplan is not yet implemented');
      expect(output).toContain('Would add step: New Step');
    });

    it('should handle number option', () => {
      const output = runCli('add-step "New Step" -n 5');
      expect(output).toContain('as step 5');
    });
  });
});

