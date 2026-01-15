/**
 * plan archive command
 */

import { Command } from "commander";
import chalk from "chalk";
import { resolve, join, basename } from "node:path";
import { rename, mkdir, readFile, writeFile } from "node:fs/promises";
import { loadPlan, generateStatus } from "@riotprompt/riotplan";
import type { Plan } from "@riotprompt/riotplan";
import { outputSuccess, outputError, outputWarning } from "../../utils/index.js";

/**
 * Create the archive command
 */
export function archiveCommand(): Command {
    return new Command("archive")
        .description("Archive a completed plan")
        .argument("[path]", "Path to plan directory", ".")
        .option("-t, --target <dir>", "Archive target directory", "./archive")
        .option("--force", "Archive even if not completed")
        .option("--mark-complete", "Mark plan as completed before archiving")
        .action(async (path, options) => {
            try {
                const planPath = resolve(path);
                const plan = await loadPlan(planPath);

                // Check if completed
                if (plan.state.status !== "completed" && !options.force) {
                    if (options.markComplete) {
                        // Mark as completed
                        const updatedPlan: Plan = {
                            ...plan,
                            state: {
                                ...plan.state,
                                status: "completed",
                                completedAt: new Date(),
                                lastUpdatedAt: new Date(),
                            },
                        };

                        // Update STATUS.md
                        const statusPath = join(planPath, "STATUS.md");
                        const existingContent = await readFile(
                            statusPath,
                            "utf-8"
                        ).catch(() => "");
                        const newStatus = generateStatus(updatedPlan, {
                            existingContent,
                        });
                        await writeFile(statusPath, newStatus);

                        outputSuccess("Marked plan as completed");
                    } else {
                        outputWarning(
                            "Plan is not completed. Use --force to archive anyway, or --mark-complete"
                        );
                        process.exit(1);
                    }
                }

                // Create archive directory
                const archiveDir = resolve(options.target);
                await mkdir(archiveDir, { recursive: true });

                // Move plan to archive
                const archivePath = join(archiveDir, basename(planPath));
                await rename(planPath, archivePath);

                outputSuccess(`Archived: ${plan.metadata.name}`);
                console.log(chalk.dim(`  From: ${planPath}`));
                console.log(chalk.dim(`  To: ${archivePath}`));
            } catch (error) {
                outputError(`Archive failed: ${(error as Error).message}`);
                process.exit(1);
            }
        });
}

