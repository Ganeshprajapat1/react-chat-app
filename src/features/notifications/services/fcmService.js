import app from "../../../firebase/firebaseConfig";
import {
  getMessaging,
  getToken,
  isSupported,
} from "firebase/messaging";

export const getFCMToken = async (vapidKey) => {
  try {
    const supported = await isSupported();

    if (!supported) {
      console.log("FCM is not supported on this browser.");
      return null;
    }

    // Register Service Worker
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    if (!token) {
      // console.log("No FCM token generated.");
      return null;
    }

    // console.log("FCM Token:", token);

    return token;
  } catch (error) {
    console.error("FCM Error:", error);
    return null;
  }
};