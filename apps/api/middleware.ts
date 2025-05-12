import { verifyToken } from "@clerk/backend";
import type { NextFunction, Request, Response } from "express";
import { CLERK_PEM_PUBLIC_KEY } from "./config";

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
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
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
