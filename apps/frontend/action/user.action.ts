'use server';

import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function syncUserInDb() {
    const auth = await currentUser();
    if (!auth?.id) return;
    const user = await prisma.user.findFirst({
      where: { externalId: auth.id },
    });

    if (!user) {
      return await prisma.user.create({
        data: {
          externalId: auth?.id,
          imageUrl: auth.imageUrl!,
          email: auth.emailAddresses[0].emailAddress!,
        },
      });
    }

    return user;
  }
