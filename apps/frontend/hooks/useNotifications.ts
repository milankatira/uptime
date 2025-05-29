"use client";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { messaging } from "@/lib/firebase";
import { getToken, Messaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { toast } from "sonner";

export function useNotifications() {
    const instance = useAxiosInstance();

    useEffect(() => {
        if (!messaging) {
            console.warn("Firebase messaging not available");
            return;
        }

        const registerServiceWorker = async () => {
            if ("serviceWorker" in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register(
                        "/firebase-messaging-sw.js",
                    );
                    console.log(
                        "ServiceWorker registration successful",
                        registration,
                    );
                } catch (err) {
                    console.error("ServiceWorker registration failed:", err);
                }
            }
        };

        const requestPermission = async () => {
            try {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                    const token = await getToken(messaging as Messaging, {
                        vapidKey:
                            "BGmtT0TIEBeTzfvU5l_mvAZsEz5MAksrDNYqihTquxpYHmz4DGdTgtTP8v2NAi0HN-NaUUs4-5dgUKtOTjTKg2w",
                    });
                    console.log("FCM Token:", token);
                    await sendTokenToServer(token);
                }
            } catch (error) {
                console.error("Notification permission error:", error);
            }
        };

        const sendTokenToServer = async (token: string) => {
            try {
                await instance.put("/api/v1/user/fcm-token", { token });
            } catch (error) {
                console.error("Error sending token to server:", error);
            }
        };

        const messageListener = onMessage(messaging as Messaging, (payload) => {
            console.log("Foreground message received:", payload);

            const notificationTitle =
                payload.notification?.title || "New notification";
            const notificationOptions = {
                body: payload.notification?.body || "",
                icon: "/favicon.ico",
            };

            if (Notification.permission === "granted") {
                new Notification(notificationTitle, notificationOptions);
                toast(notificationTitle, {
                    description: notificationOptions.body,
                    duration: 5000,
                    position: "top-right",
                });
            }
        });

        registerServiceWorker();
        requestPermission();

        return () => {
            messageListener();
        };
    }, []);
}
