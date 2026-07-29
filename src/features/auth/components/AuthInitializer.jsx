import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { onAuthStateChanged, reload } from "firebase/auth";
import { ref, update, get  } from "firebase/database";

import { auth, database } from "../../../firebase/firebaseConfig";
import { setUser } from "../store/authSlice";
import { getFCMToken } from "../../notifications/services/fcmService";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(setUser(null));
        return;
      }

      await reload(user);

      const userRef = ref(database, `users/${user.uid}`);

      const snapshot = await get(userRef);

      let userData = {};

      if (snapshot.exists()) {
        userData = snapshot.val();
      
        // Keep online status updated
        await update(userRef, {
          isOnline: true,
          lastSeen: Date.now(),
        });
      }

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          ...userData,
        })
      );

      // Register FCM token
      try {
        const token = await getFCMToken(
          import.meta.env.VITE_FIREBASE_VAPID_KEY
        );

        if (token) {
          await update(
            ref(database, `users/${user.uid}`),
            {
              fcmToken: token,
            }
          );

          // console.log("FCM Token Saved");
        }
      } catch (error) {
        console.error("FCM Error:", error);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return children;
};

export default AuthInitializer;