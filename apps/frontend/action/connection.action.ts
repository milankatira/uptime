'use server';

import { prismaClient } from "db/client";
import { getUserFromDb } from './user.action';

export async function addEmailConnection(email: string) {
  const auth = await getUserFromDb();
  if (!auth?.id) return;
  if (!auth?.id) throw new Error('Unauthorized');

  return await prismaClient.connections.create({
    data: {
      type: 'Email',
      email,
      userId: auth?.id,
    },
  });
}

export async function removeEmailConnection(id: string) {
  const auth = await getUserFromDb();
  if (!auth?.id) throw new Error('Unauthorized');

  return await prismaClient.connections.delete({
    where: {
      id,
      userId: auth.id,
    },
  });
}

export async function findConnectionByUserId() {
  try {
    const auth = await getUserFromDb();
    const connection = await prismaClient.connections.findMany({
      where: { userId: auth?.id },
    });

    return connection;
  } catch (error) {
    console.error('Error finding connection by userId:', error);
    throw new Error('Unable to find connection');
  }
}
