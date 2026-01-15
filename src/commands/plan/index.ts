/**
 * Plan command group
 */

import { Command } from "commander";
import { initCommand } from "./init.js";
import { validateCommand } from "./validate.js";
import { archiveCommand } from "./archive.js";

/**
 * Register plan commands on the program
 */
export function registerPlanCommands(program: Command): void {
    const planCmd = program
        .command("plan")
        .description("Plan management commands");

    // Add subcommands
    planCmd.addCommand(initCommand());
    planCmd.addCommand(validateCommand());
    planCmd.addCommand(archiveCommand());
}

