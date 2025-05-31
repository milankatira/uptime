import axios from "axios";
import { Worker } from "bullmq";
import { prismaClient } from "@repo/db/client";
import redisConnection from "./lib/redis";
import { WebsiteStatus } from "@repo/shared/types/website";
const worker = new Worker(
    "website-checks",
    async (job) => {
        console.log(`Processing job for websiteId: ${job.data.websiteId}`);
        const { websiteId } = job.data as { websiteId: string };
        const site = await prismaClient.website.findUnique({
            where: { id: websiteId },
        });
        if (!site) {
            console.log(`No site found for websiteId: ${websiteId}`);
            return;
        }

        const start = Date.now();
        let status: WebsiteStatus = WebsiteStatus.Good;
        try {
            const resp = await axios.get(site.url, {
                timeout: site.interval * 1000,
            });
            if (resp.status >= 400) status = WebsiteStatus.Bad;
        } catch (error: any) {
            console.error(`Error fetching site: ${error?.message}`);
            status = WebsiteStatus.Bad;
        } finally {
            const latency = Date.now() - start;
            try {
                await prismaClient.websiteTick.create({
                    data: {
                        websiteId,
                        status,
                        latency,
                        createdAt: new Date(),
                    },
                });
            } catch (error) {
                console.error(`Error creating websiteTick: ${error}`);
            }
            console.log(
                `Job completed for websiteId: ${websiteId} with status: ${status}`,
            );
        }
    },
    { connection: redisConnection },
);

console.log("🔨 Validator running…");
