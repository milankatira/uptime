importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDbcgmlDm5oEPYnPvWXVejX69XTX1Z_tpk",
  authDomain: "uptime-2139b.firebasestorage.app",
  projectId: "uptime-2139b",
  storageBucket: "uptime-2139b.firebasestorage.app",
  messagingSenderId: "834427646922",
  appId: "1:834427646922:web:79e6c09b996fc615e15533",
  measurementId: "G-2YRN895L79"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'New notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.ico',
    data: {
      url: payload.data?.url || '/'
    }
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions)
    .then(() => console.log('Notification shown successfully'))
    .catch(err => console.error('Failed to show notification:', err));

  // Add click handler
  self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event.notification);
    event.notification.close();
    if (event.notification.data?.url) {
      event.waitUntil(
        clients.openWindow(event.notification.data.url)
      );
    }
  });
});