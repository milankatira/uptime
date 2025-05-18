import { Queue } from "bullmq";
import prismaClient from "./lib/prisma";
import redisConnection from "./lib/redis";

const checkQueue = new Queue("website-checks", { connection: redisConnection });

async function enqueueAll() {
  console.log("Enqueuing all websites for checks");
  const sites = await prismaClient.website.findMany({
    where: { disabled: false },
  });
  for (let site of sites) {
    console.log(`Adding websiteId: ${site.id} to the queue`);
    await checkQueue.add("check", { websiteId: site.id }, { delay: 0 });
  }
  console.log("All websites enqueued");
}

// Enqueue immediately, then every minute
enqueueAll();
setInterval(enqueueAll, 30_000);
