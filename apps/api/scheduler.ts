import { Queue } from "bullmq";
import prismaClient from "./lib/prisma";
import redisConnection from "./lib/redis";

const checkQueue = new Queue("website-checks", { connection: redisConnection });

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
