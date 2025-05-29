/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

/**
 * Sends a message to a Discord channel using the provided webhook URL.
 *
 * @param webhookUrl - The Discord webhook endpoint to send the message to.
 * @param content - The message content to send.
 *
 * @remark
 * Logs a success message if the message is sent, or an error message if the request fails.
 */
export async function postMessageToDiscord(
    webhookUrl: string,
    content: string,
) {
    try {
        await axios.post(webhookUrl, { content });
        console.log("✅ Message sent to Discord");
    } catch (error: any) {
        console.error("❌ Error sending message to Discord:", error.message);
    }
}
