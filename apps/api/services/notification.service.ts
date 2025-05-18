import admin from "firebase-admin";

const serviceAccount = require("../firebase/uptime-2139b-firebase-adminsdk-fbsvc-f6b128b0d5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
