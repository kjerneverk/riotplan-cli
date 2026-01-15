/**
 * plan validate command
 */

import { Command } from "commander";
import chalk from "chalk";
import { validatePlan } from "@riotprompt/riotplan";
import {
    outputSuccess,
    outputError,
    outputWarning,
    outputInfo,
    outputJson,
} from "../../utils/index.js";

/**
 * Create the validate command
 */
export function validateCommand(): Command {
    return new Command("validate")
        .description("Validate plan structure")
        .argument("[path]", "Path to plan directory", ".")
        .option("--strict", "Treat warnings as errors")
        .option("--fix", "Attempt to fix issues (not yet implemented)")
        .option("--json", "Output as JSON")
        .action(async (path, options) => {
            try {
                const result = await validatePlan(path, {
                    strict: options.strict,
                });

                if (options.json) {
                    outputJson(result);
                    process.exit(result.valid ? 0 : 1);
                }

                // Output info
                for (const info of result.info) {
                    outputInfo(info.message);
                }

                // Output warnings
                for (const warning of result.warnings) {
                    outputWarning(`[${warning.code}] ${warning.message}`);
                }

                // Output errors
                for (const error of result.errors) {
                    outputError(`[${error.code}] ${error.message}`);
                }

                // Output fixable issues
                if (result.fixable.length > 0 && !options.fix) {
                    console.log();
                    console.log(
                        chalk.dim(
                            `${result.fixable.length} issue(s) can be auto-fixed with --fix`
                        )
                    );
                }

                // Summary
                console.log();
                if (result.valid) {
                    outputSuccess("Plan is valid");
                } else {
                    outputError("Plan has validation errors");
                    process.exit(1);
                }
            } catch (error) {
                outputError(`Validation failed: ${(error as Error).message}`);
                process.exit(1);
            }
        });
}

