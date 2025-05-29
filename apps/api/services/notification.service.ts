import admin from "firebase-admin";

const serviceAccount = require("../firebase/uptime-2139b-firebase-adminsdk-fbsvc-f6b128b0d5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

/**
 * Sends a push notification with a given title and body to a device identified by its FCM token using Firebase Cloud Messaging.
 *
 * @param token - The FCM token of the target device.
 * @param title - The title of the notification.
 * @param body - The body content of the notification.
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
