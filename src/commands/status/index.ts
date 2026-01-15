/**
 * Status command group
 */

import { Command } from "commander";
import { loadPlan } from "@riotprompt/riotplan";
import { showCommand } from "./show.js";
import {
    outputError,
    outputPlanSummary,
    outputJson,
} from "../../utils/index.js";

/**
 * Register status commands on the program
 */
export function registerStatusCommands(program: Command): void {
    // Main status command (shortcut for status show)
    program
        .command("status")
        .description("Show plan status")
        .argument("[path]", "Path to plan directory", ".")
        .option("-v, --verbose", "Show detailed status with steps")
        .option("--json", "Output as JSON")
        .action(async (path, options) => {
            try {
                const plan = await loadPlan(path);

                if (options.json) {
                    outputJson({
                        name: plan.metadata.name,
                        code: plan.metadata.code,
                        status: plan.state.status,
                        progress: plan.state.progress,
                        currentStep: plan.state.currentStep,
                        steps: plan.steps.map((s) => ({
                            number: s.number,
                            title: s.title,
                            status: s.status,
                        })),
                        blockers: plan.state.blockers,
                    });
                    return;
                }

                outputPlanSummary(plan);
            } catch (error) {
                outputError(
                    `Failed to load plan: ${(error as Error).message}`
                );
                process.exit(1);
            }
        })
        .addCommand(showCommand());
}

