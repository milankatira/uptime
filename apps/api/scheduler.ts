import { Queue } from "bullmq";
import redisConnection from "./lib/redis";
import { prismaClient } from "@repo/db/client";

const checkQueue = new Queue("website-checks", { connection: redisConnection });

/**
 * Schedules repeatable website check jobs for all active websites according to their configured intervals.
 *
 * Retrieves all non-disabled websites from the database and adds a uniquely identified, repeatable job for each to the queue, ensuring periodic checks based on each website's interval setting.
 */
async function scheduleWebsiteChecks() {
    console.log("Scheduling website checks based on intervals");
    const sites = await prismaClient.website.findMany({
        where: { disabled: false },
    });
    for (let site of sites) {
        console.log(
            `Scheduling websiteId: ${site.id} with interval: ${site.interval} seconds`,
        );
        // Add a repeatable job for each website using its interval
        await checkQueue.add(
            "check",
            { websiteId: site.id },
            {
                repeat: {
                    every: site.interval * 1000, // interval is in seconds, convert to milliseconds
                },
                jobId: `website-check-${site.id}`, // Use website ID as job ID for uniqueness
            },
        );
    }
    console.log("All active websites scheduled");
}

// Schedule jobs on startup
scheduleWebsiteChecks();
