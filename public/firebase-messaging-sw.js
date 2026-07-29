/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAhTxumDKP-OvkXapya51i7b00XbOFw8Tw",
  authDomain: "react-chat-app-ec1c4.firebaseapp.com",
  databaseURL: "https://react-chat-app-ec1c4-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-ec1c4",
  storageBucket: "react-chat-app-ec1c4.firebasestorage.app",
  messagingSenderId: "978551296771",
  appId: "1:978551296771:web:e0788652610c8bded58f36"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle =
    payload.notification?.title || "ReactChat";

  const notificationOptions = {
    body: payload.notification?.body || "New Message",
    icon: "/logo192.png",
    badge: "/logo192.png",
    data: payload.data,
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});