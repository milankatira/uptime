import type { Request, Response } from "express";
import { websiteService } from "../services/websiteService";
import redis from "../lib/redis";
import { CACHE_TTL } from "../constant";

/**
 * Creates a new website for the authenticated user.
 *
 * Expects a `url` in the request body and optionally an `orgId` in the request headers. Responds with the created website data as JSON on success.
 *
 * @remark
 * Returns HTTP 400 if the `url` is missing from the request body. Returns HTTP 500 with an error message if website creation fails.
 */
export async function createWebsite(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const { url } = req.body;
        const orgId = req.headers["orgid"] as string | undefined;

        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const result = await websiteService.createWebsite(userId, url, orgId);
        await redis.del(`websites:${userId}:${orgId ?? "all"}`);
        return res.json(result);
    } catch (error) {
        console.error("Error creating website:", error);
        return res.status(500).json({ error: "Failed to create website" });
    }
}

/**
 * Retrieves status data for a website by its ID and an optional duration, returning the result as JSON.
 *
 * If the `websiteId` query parameter is missing, responds with HTTP 400. If no status data is found for the given website, responds with HTTP 404.
 *
 * @param req - Express request with `websiteId` and optional `duration` in the query parameters.
 * @param res - Express response used to send the status data or an error response.
 */
export async function getWebsiteStatus(req: Request, res: Response) {
    try {
        const websiteId = req.query.websiteId as string;
        const duration = (req.query.duration as string) || "1w";

        if (!websiteId) {
            return res.status(400).json({ error: "Website ID is required" });
        }

        const cacheKey = `status:${websiteId}:${duration}`;
        const cached = await redis.get(cacheKey);
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        const data = await websiteService.getWebsiteStatus(websiteId, duration);

        if (!data) {
            return res.status(404).json({ error: "Website not found" });
        }

        await redis.set(cacheKey, JSON.stringify(data), "EX", CACHE_TTL);

        return res.json(data);
    } catch (error) {
        console.error("Error getting website status:", error);
        return res.status(500).json({ error: "Failed to get website status" });
    }
}

/**
 * Retrieves the last 30 error records for a website and returns them as JSON.
 *
 * Returns HTTP 400 if the `websiteId` query parameter is missing, or HTTP 500 if an internal error occurs.
 */
export async function getErrorGraphData(req: Request, res: Response) {
    try {
        const websiteId = req.query.websiteId as string;

        if (!websiteId) {
            return res.status(400).json({ error: "Website ID is required" });
        }

        const cacheKey = `errors:last30:${websiteId}`;
        const cached = await redis.get(cacheKey);
        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const data = await websiteService.getLast30Errors(websiteId);

        await redis.set(cacheKey, JSON.stringify(data), "EX", CACHE_TTL);
        return res.json(data);
    } catch (error) {
        console.error("Error getting error graph data:", error);
        return res.status(500).json({ error: "Failed to get error data" });
    }
}

/**
 * Retrieves all websites associated with the authenticated user.
 *
 * Responds with a JSON array of website data for the user, optionally filtered by organization if an org ID is provided in the request headers.
 */
export async function getAllWebsites(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const orgId = req.headers["orgid"] as string | undefined;
        const cacheKey = `websites:${userId}:${orgId ?? "all"}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            console.log("return cached data");
            return res.json(JSON.parse(cached));
        }

        const result = await websiteService.getAllWebsites(userId, orgId);

        await redis.set(cacheKey, JSON.stringify(result), "EX", CACHE_TTL);

        return res.json(result);
    } catch (error) {
        console.error("Error getting websites:", error);
        return res.status(500).json({ error: "Failed to get websites" });
    }
}

/**
 * Performs a soft delete of a website for the authenticated user.
 *
 * Responds with a 400 status if the website ID is missing from the request body, or a 500 status if an internal error occurs.
 */
export async function deleteWebsite(req: Request, res: Response) {
    try {
        const websiteId = req.body.websiteId;
        const userId = req.userId!;
        const orgId = req.headers["orgid"] as string | undefined;

        if (!websiteId) {
            return res.status(400).json({ error: "Website ID is required" });
        }

        const result = await websiteService.deleteWebsite(websiteId, userId);

        await redis.del(`websites:${userId}:${orgId ?? "all"}`);

        return res.json(result);
    } catch (error) {
        console.error("Error deleting website:", error);
        return res.status(500).json({ error: "Failed to delete website" });
    }
}

/**
 * Handles updating a website's URL and monitoring interval for the authenticated user.
 *
 * Expects `websiteId` in the URL parameters and both `url` and `interval` in the request body. Responds with the updated website data as JSON on success, or an error message with an appropriate HTTP status code if validation fails or an internal error occurs.
 */
export async function updateWebsite(req: Request, res: Response) {
    try {
        const orgId = req.headers["orgid"] as string | undefined;
        const userId = req.userId!;
        const { websiteId } = req.params;
        const { url, interval } = req.body;

        if (!websiteId) {
            return res.status(400).json({ error: "Website ID is required" });
        }
        if (!url || !interval) {
            return res
                .status(400)
                .json({ error: "URL and Interval are required" });
        }

        const result = await websiteService.updateWebsite(
            userId,
            websiteId,
            url,
            interval,
        );
        await redis.del(`websites:${userId}:${orgId ?? "all"}`);
        return res.json(result);
    } catch (error) {
        console.error("Error updating website:", error);
        return res.status(500).json({ error: "Failed to update website" });
    }
}

/**
 * Handles the creation of a new heartbeat for the authenticated user.
 *
 * Expects `name`, `interval`, and `gracePeriod` in the request body. Optional fields include `escalation`, `maintenance`, `metadata`, and `orgId` in headers.
 *
 * Responds with the created heartbeat data as JSON, or an error message if required fields are missing or creation fails.
 */
export async function createHeartbeat(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const {
            name,
            interval,
            gracePeriod,
            escalation,
            maintenance,
            metadata,
        } = req.body;
        const orgId = req.headers["orgid"] as string | undefined;

        if (!name || !interval || !gracePeriod) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await websiteService.createHeartbeat(
            userId,
            name,
            interval,
            gracePeriod,
            escalation,
            maintenance,
            metadata,
            orgId,
        );
        return res.json(result);
    } catch (error) {
        console.error("Error creating heartbeat:", error);
        return res.status(500).json({ error: "Failed to create heartbeat" });
    }
}

/**
 * Creates a new maintenance window for the authenticated user.
 *
 * Expects `date` and `timeSlot` in the request body. Optionally accepts `repeat` in the body and `orgId` in the request headers.
 *
 * @returns The created maintenance window as JSON.
 *
 * @remark Responds with status 400 if `date` or `timeSlot` is missing.
 */
export async function createMaintenanceWindow(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const { date, timeSlot, repeat } = req.body;
        const orgId = req.headers["orgid"] as string | undefined;

        if (!date || !timeSlot) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await websiteService.createMaintenanceWindow(
            userId,
            new Date(date),
            timeSlot,
            repeat ?? null,
            orgId,
        );
        return res.json(result);
    } catch (error) {
        console.error("Error creating maintenance window:", error);
        return res
            .status(500)
            .json({ error: "Failed to create maintenance window" });
    }
}

/**
 * Retrieves all maintenance windows associated with the authenticated user.
 *
 * @returns A JSON array of maintenance window objects for the user.
 */
export async function getAllMaintenanceWindows(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const orgId = req.headers["orgid"] as string | undefined;
        const result = await websiteService.getAllMaintenanceWindows(
            userId,
            orgId,
        );
        return res.json(result);
    } catch (error) {
        console.error("Error getting maintenance windows:", error);
        return res
            .status(500)
            .json({ error: "Failed to get maintenance windows" });
    }
}

/**
 * Retrieves heartbeat data for the authenticated user and optional organization.
 *
 * Responds with the heartbeat data as JSON if found, or a 404 error if not found.
 */
export async function getHeartbeat(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const orgId = req.headers["orgid"] as string | undefined;

        const cacheKey = `heartbeat:${userId}:${orgId ?? "all"}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const data = await websiteService.getHeartbeat(userId, orgId);

        await redis.set(cacheKey, JSON.stringify(data), "EX", CACHE_TTL);
        if (!data) {
            return res.status(404).json({ error: "Heartbeat not found" });
        }

        return res.json(data);
    } catch (error) {
        console.error("Error getting heartbeat:", error);
        return res.status(500).json({ error: "Failed to get heartbeat" });
    }
}

/**
 * Updates the status of a heartbeat and responds with a styled HTML confirmation page.
 *
 * Updates the status of the heartbeat identified by the provided `heartbeatId` and `status` in the URL parameters. On success, returns an HTML page confirming the update; on failure, returns an HTML error page.
 */
export async function updateHeartbeatStatus(req: Request, res: Response) {
    try {
        const { heartbeatId, status } = req.params;

        // Update the status
        const result = await websiteService.updateHeartbeatStatus(
            heartbeatId,
            status,
        );

        // Render HTML response
        res.setHeader("Content-Type", "text/html");
        return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Heartbeat Status Updated</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #0f1117;
            color: #ffffff;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .back-link {
            padding: 20px;
            display: flex;
            align-items: center;
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
          }

          .back-link svg {
            margin-right: 8px;
          }

          .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
          }

          .logo {
            margin-bottom: 30px;
          }

          .title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 16px;
          }

          .description {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 30px;
            line-height: 1.5;
          }

          .button {
            background-color: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: none;
            border-radius: 6px;
            padding: 10px 20px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .button:hover {
            background-color: rgba(255, 255, 255, 0.15);
          }

          .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
          }

          .footer a {
            color: rgba(255, 255, 255, 0.5);
            text-decoration: none;
            margin: 0 5px;
          }

          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <a href="/heartbeats" class="back-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to Heartbeats
        </a>

        <div class="content">
          <div class="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 13.3333L26.6667 20L33.3333 13.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 20L13.3333 13.3333L6.66666 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 26.6667L26.6667 20L33.3333 26.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 20L13.3333 26.6667L6.66666 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <h1 class="title">Heartbeat ${status.toLowerCase()} recorded!</h1>

          <p class="description">
            Heartbeat status was successfully updated<br>
            to ${status}.
          </p>

          <button class="button" onclick="window.location.href='/heartbeats'">Back to heartbeats</button>
        </div>

        <div class="footer">
          <a href="#">Terms of Service</a> · <a href="#">Privacy Policy</a> · <a href="#">GDPR</a>
        </div>
      </body>
      </html>
    `);
    } catch (error) {
        console.error("Error updating heartbeat status:", error);
        res.setHeader("Content-Type", "text/html");
        return res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #0f1117;
            color: #ffffff;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .error {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            color: #ff5555;
          }
        </style>
      </head>
      <body>
        <div class="error">Failed to update heartbeat status</div>
      </body>
      </html>
    `);
    }
}

/**
 * Handles an HTTP request to retrieve detailed information for a specific heartbeat.
 *
 * Responds with a 400 status if the heartbeat ID is missing, or with the heartbeat details as JSON if found.
 */
export async function getHeartbeatDetails(req: Request, res: Response) {
    try {
        const { heartbeatId } = req.params;

        if (!heartbeatId) {
            return res.status(400).json({ error: "Heartbeat ID is required" });
        }

        const cacheKey = `heartbeat:detail:${heartbeatId}`;
        const cached = await redis.get(cacheKey);
        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const data = await websiteService.getHeartbeatDetails(heartbeatId);

        await redis.set(cacheKey, JSON.stringify(data), "EX", CACHE_TTL);

        return res.json(data);
    } catch (error) {
        console.error("Error getting heartbeat details:", error);
        return res
            .status(500)
            .json({ error: "Failed to get heartbeat details" });
    }
}
