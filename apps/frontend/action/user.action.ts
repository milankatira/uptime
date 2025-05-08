'use server';

import prismaClient from '@/lib/prisma';

export async function addUserIfNotExists(email: string) {
    const existingUser = await prismaClient.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return existingUser;
    }

    const newUser = await prismaClient.user.create({
        data: { email },
    });

    return newUser;
}
