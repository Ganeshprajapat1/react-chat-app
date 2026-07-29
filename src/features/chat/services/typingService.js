import { ref, set, onValue } from "firebase/database";

import { database } from "../../../firebase/firebaseConfig";
import generateRoomId from "../utils/generateRoomId";

// Update Typing Status

export const setTypingStatus = async (
  currentUserId,
  otherUserId,
  isTyping
) => {

  const roomId = generateRoomId(
    currentUserId,
    otherUserId
  );

  await set(
    ref(database, `typing/${roomId}/${currentUserId}`),
    isTyping
  );
};

// Listen Typing Status

export const subscribeTypingStatus = (
  currentUserId,
  otherUserId,
  callback
) => {

  const roomId = generateRoomId(
    currentUserId,
    otherUserId
  );

  return onValue(
    ref(database, `typing/${roomId}`),
    (snapshot) => {

      if (!snapshot.exists()) {
        callback(false);
        return;
      }

      const typing = snapshot.val();

      callback(
        typing?.[otherUserId] || false
      );

    }
  );
};