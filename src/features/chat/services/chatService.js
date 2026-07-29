import { ref, onValue } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";

export const subscribeChats = (
  callback
) => {

  const chatsRef = ref(
    database,
    "chats"
  );

  return onValue(
    chatsRef,
    (snapshot) => {

      if (!snapshot.exists()) {
        callback([]);
        return;
      }
      callback(snapshot.val());

    }
  );

};