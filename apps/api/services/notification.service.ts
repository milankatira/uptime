import admin from "firebase-admin";

const serviceAccount = require("../firebase/uptime-2139b-firebase-adminsdk-fbsvc-f6b128b0d5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

/**
 * Sends a push notification with the specified title and body to a device using its token via Firebase Cloud Messaging.
 *
 * @param token - The recipient device's FCM token.
 * @param title - The notification title.
 * @param body - The notification body content.
 */
export async function sendPushNotification(
    token: string,
    title: string,
    body: string,
) {
    try {
        await admin.messaging().send({
            token,
            notification: { title, body },
        });
    } catch (error) {
        console.error("Error sending notification:", error);
    }
}
