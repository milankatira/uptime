/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

/**
 * Sends a message to a Discord channel using a webhook URL.
 *
 * @param webhookUrl - The Discord webhook endpoint to send the message to.
 * @param content - The message content to be sent.
 *
 * @remark
 * Logs a confirmation message on success or an error message if the request fails.
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
