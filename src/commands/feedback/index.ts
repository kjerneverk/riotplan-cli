/**
 * Feedback command group
 */

import { Command } from "commander";
import chalk from "chalk";
import { createFeedback, listFeedback, getFeedback } from "@riotprompt/riotplan";
import { outputSuccess, outputError, outputJson } from "../../utils/index.js";

/**
 * Register feedback commands on the program
 */
export function registerFeedbackCommands(program: Command): void {
    const feedbackCmd = program
        .command("feedback")
        .description("Feedback management commands");

    // Create feedback
    feedbackCmd
        .command("create")
        .description("Create a new feedback record")
        .argument("<title>", "Feedback title")
        .argument("[path]", "Path to plan directory", ".")
        .option("-s, --step <n>", "Related step number")
        .option("-p, --platform <platform>", "Platform (e.g., github, slack)")
        .option("--summary <summary>", "Feedback summary")
        .action(async (title, path, options) => {
            try {
                const result = await createFeedback(path, {
                    title,
                    step: options.step ? parseInt(options.step) : undefined,
                    platform: options.platform,
                    summary: options.summary,
                    participants: [{ name: "User", type: "human" }],
                });

                outputSuccess(`Created feedback: ${result.record.title}`);
                console.log(chalk.dim(`ID: ${result.record.id}`));
                console.log(chalk.dim(`File: ${result.filePath}`));
            } catch (error) {
                outputError(
                    `Failed to create feedback: ${(error as Error).message}`
                );
                process.exit(1);
            }
        });

    // List feedback
    feedbackCmd
        .command("list")
        .description("List all feedback records")
        .argument("[path]", "Path to plan directory", ".")
        .option("--json", "Output as JSON")
        .action(async (path, options) => {
            try {
                const records = await listFeedback(path);

                if (options.json) {
                    outputJson(records);
                    return;
                }

                if (records.length === 0) {
                    console.log(chalk.dim("No feedback records found."));
                    return;
                }

                console.log();
                console.log(chalk.bold(`Feedback Records (${records.length})`));
                console.log();

                for (const record of records) {
                    const date = record.createdAt.toISOString().split("T")[0];
                    console.log(
                        `  ${chalk.cyan(record.id)} ${record.title} ${chalk.dim(`(${date})`)}`
                    );
                    if (record.step) {
                        console.log(chalk.dim(`    Step: ${record.step}`));
                    }
                }
                console.log();
            } catch (error) {
                outputError(
                    `Failed to list feedback: ${(error as Error).message}`
                );
                process.exit(1);
            }
        });

    // Show feedback
    feedbackCmd
        .command("show")
        .description("Show a specific feedback record")
        .argument("<id>", "Feedback ID")
        .argument("[path]", "Path to plan directory", ".")
        .option("--json", "Output as JSON")
        .action(async (id, path, options) => {
            try {
                const record = await getFeedback(path, id);

                if (!record) {
                    outputError(`Feedback ${id} not found`);
                    process.exit(1);
                }

                if (options.json) {
                    outputJson(record);
                    return;
                }

                console.log();
                console.log(chalk.bold(record.title));
                console.log(chalk.dim(`ID: ${record.id}`));
                console.log(
                    chalk.dim(
                        `Created: ${record.createdAt.toISOString().split("T")[0]}`
                    )
                );

                if (record.step) {
                    console.log(`Step: ${record.step}`);
                }

                if (record.platform) {
                    console.log(`Platform: ${record.platform}`);
                }

                if (record.participants && record.participants.length > 0) {
                    console.log();
                    console.log("Participants:");
                    for (const p of record.participants) {
                        console.log(chalk.dim(`  - ${p.name} (${p.type})`));
                    }
                }

                if (record.summary) {
                    console.log();
                    console.log("Summary:");
                    console.log(chalk.dim(`  ${record.summary}`));
                }

                console.log();
            } catch (error) {
                outputError(
                    `Failed to show feedback: ${(error as Error).message}`
                );
                process.exit(1);
            }
        });
}

