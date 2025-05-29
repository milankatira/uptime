import { verifyToken } from "@clerk/backend";
import type { NextFunction, Request, Response } from "express";
import { CLERK_PEM_PUBLIC_KEY } from "./config";

/**
 * Express middleware that authenticates incoming requests using a Bearer token from the `Authorization` header.
 *
 * Verifies the token using a configured JWT public key and optional authorized parties. If verification succeeds and the token contains a user ID, attaches the user ID to the request object as `userId` and calls the next middleware. If authentication fails at any step, responds with HTTP 401 and an appropriate error message.
 *
 * @remark
 * Responds with HTTP 401 if the `Authorization` header is missing, malformed, the token is invalid, or the verified token lacks a user ID.
 */
export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ error: "Unauthorized: No valid token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token found" });
    }

    try {
        const verifiedToken = await verifyToken(token, {
            jwtKey: CLERK_PEM_PUBLIC_KEY,

            authorizedParties: process.env.CLERK_AUTHORIZED_PARTIES
                ? process.env.CLERK_AUTHORIZED_PARTIES.split(",")
                : undefined,

            clockSkewInMs: 5000,
        });

        if (!verifiedToken.sub) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Missing user ID" });
        }

        req.userId = verifiedToken.sub;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);

        return res
            .status(401)
            .json({ error: "Unauthorized: Token verification failed" });
    }
}
