import { prismaClient } from "../src";

const USER_ID = "4";

async function seed() {
  const website = await prismaClient.website.create({
    data: {
      url: "https://test.com",
      userId: USER_ID,
    },
  });

  await prismaClient.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "Good",
      createdAt: new Date(),
      latency: 100,
    },
  });

  await prismaClient.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "Good",
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
      latency: 100,
    },
  });

  await prismaClient.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "Bad",
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
      latency: 100,
    },
  });
}

seed();
