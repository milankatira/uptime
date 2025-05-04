import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@clerk/backend';
import { CLERK_PEM_PUBLIC_KEY } from './config';

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Get token from Authorization header (Bearer token)
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ error: 'Unauthorized: No valid token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token found' });
    }

    try {
        console.log(CLERK_PEM_PUBLIC_KEY,"CLERK_PEM_PUBLIC_KEY",token)
        // Verify the token using Clerk's verifyToken function
        const verifiedToken = await verifyToken(token, {
            jwtKey: CLERK_PEM_PUBLIC_KEY,
            // Optional: Add authorized parties if needed
            authorizedParties: process.env.CLERK_AUTHORIZED_PARTIES
                ? process.env.CLERK_AUTHORIZED_PARTIES.split(',')
                : undefined,
            // Optional: Add clock skew tolerance (default is 5000ms)
            clockSkewInMs: 5000,
        });

        // If verification fails, verifyToken will throw an error
        // If we reach here, the token is valid

        // Set user ID from subject claim
        if (!verifiedToken.sub) {
            return res
                .status(401)
                .json({ error: 'Unauthorized: Missing user ID' });
        }

        req.userId = verifiedToken.sub;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);

        return res
            .status(401)
            .json({ error: 'Unauthorized: Token verification failed' });
    }
}
