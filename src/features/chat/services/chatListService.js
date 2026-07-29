import { ref, onValue } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";

export const subscribeUserChats = (
  uid,
  callback
) => {

  const chatRef = ref(
    database,
    `userChats/${uid}`
  );

  return onValue(chatRef, (snapshot) => {

    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const chats = snapshot.val();

    callback(chats);

  });

};