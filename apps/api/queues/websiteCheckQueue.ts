import { Queue } from "bullmq";
import redisConnection from "../lib/redis";

const checkQueue = new Queue("website-checks", { connection: redisConnection });

export async function addOrUpdateWebsiteJob(site: {
    id: string;
    interval: number;
}) {
    const repeatableJobs = await checkQueue.getRepeatableJobs();
    const existingJob = repeatableJobs.find(
        (job) => job.id === `website-check-${site.id}`,
    );

    if (existingJob?.key) {
        await checkQueue.removeRepeatableByKey(existingJob.key);
    }

    await checkQueue.add(
        "check",
        { websiteId: site.id },
        {
            repeat: { every: site.interval * 1000 },
            jobId: `website-check-${site.id}`,
        },
    );
}

export async function deleteWebsiteJob(siteId: string) {
    const repeatableJobs = await checkQueue.getRepeatableJobs();
    const jobToDelete = repeatableJobs.find(
        (job) => job.id === `website-check-${siteId}`,
    );

    if (jobToDelete?.key) {
        await checkQueue.removeRepeatableByKey(jobToDelete.key);
    }
}
