import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../../firebase/firebaseConfig";

export const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};