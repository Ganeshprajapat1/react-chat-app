import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    sendEmailVerification,
    reload,
} from "firebase/auth";

import { ref, set, get, update } from "firebase/database";
import {auth, database} from "../../../firebase/firebaseConfig";

export const signup = async ({name, email, password}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await updateProfile(
            user,
            {
                displayName: name,
            }
        );

        await createUserProfile(user);

        const snapshot = await get(
          ref(database, `users/${user.uid}`)
        );

        return {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        
          ...snapshot.val(),
        };
    } catch (error) {
        throw error;
    }
};

export const createUserProfile = async (user) => {
    const userRef = ref(database, `users/${user.uid}`);

    const snapshot = await get(userRef); // check profile already exists

    if(snapshot.exists()) {
        return false;
    }

    await set(userRef,{
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    isOnline: true,
    lastSeen: Date.now(),
    createdAt: Date.now(),
    photoURL: user.photoURL || "",
    about: "Hey there! I am using ReactChat.",
    });

    return true;
};

export const login = async ({ email, password }) => {

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  const authUser = userCredential.user;

  const userRef = ref(
    database,
    `users/${authUser.uid}`
  );

  const snapshot = await get(userRef);

  let userData = {};

  if (snapshot.exists()) {

    userData = snapshot.val();

    await update(userRef, {
      isOnline: true,
      lastSeen: Date.now(),
    });

  }

  return {
    uid: authUser.uid,
    email: authUser.email,
    emailVerified: authUser.emailVerified,
    ...userData,
  };

};

export const forgotPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
};

export const sendVerificationEmail = async (user) => {
  await sendEmailVerification(user);
};

export const checkEmailVerification = async (user) => {
  await reload(user);

  return user.emailVerified;
};

export const logout = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      const userRef = ref(database, `users/${user.uid}`);

      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        await update(userRef, {
          isOnline: false,
          lastSeen: Date.now(),
        });
      }

      await signOut(auth);
    }
  } catch (error) {
    throw error;
  }
};