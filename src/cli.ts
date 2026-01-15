#!/usr/bin/env node

/**
 * RiotPlan CLI
 *
 * Command-line interface for managing and executing plans.
 *
 * Commands:
 * - riotplan plan init <name>     Create a new plan
 * - riotplan plan validate [path] Validate plan structure
 * - riotplan status [path]        Show current status
 * - riotplan step list [path]     List steps
 * - riotplan step add <title>     Add a step
 * - riotplan step start <n>       Start a step
 * - riotplan step complete <n>    Complete a step
 * - riotplan feedback create      Create feedback record
 * - riotplan feedback list        List feedback records
 */

import { Command } from "commander";
import chalk from "chalk";
import {
    registerPlanCommands,
    registerStatusCommands,
    registerStepCommands,
    registerFeedbackCommands,
} from "./commands/index.js";

const VERSION = "0.0.4";

/**
 * Create the CLI program with all commands
 */
export function createProgram(): Command {
    const program = new Command();

    program
        .name("riotplan")
        .description("Manage long-lived, stateful AI workflows")
        .version(VERSION)
        .configureHelp({
            sortSubcommands: true,
            subcommandTerm: (cmd) => cmd.name(),
        });

    // Register command groups
    registerPlanCommands(program);
    registerStatusCommands(program);
    registerStepCommands(program);
    registerFeedbackCommands(program);

    // Global options
    program
        .option("-v, --verbose", "Verbose output")
        .option("--json", "Output as JSON")
        .option("--no-color", "Disable colored output");

    // Handle unknown commands
    program.on("command:*", () => {
        console.error(chalk.red(`Unknown command: ${program.args.join(" ")}`));
        console.log(`Run ${chalk.cyan("riotplan --help")} for usage.`);
        process.exit(1);
    });

    return program;
}

// Main execution - only run when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const program = createProgram();
    program.parse();
}
