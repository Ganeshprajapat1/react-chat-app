import { ref, update, get } from "firebase/database";

import { updateProfile } from "firebase/auth";
import { auth, database } from "../../../firebase/firebaseConfig";

//  Get User Profile

export const getUserProfile = async (uid) => {
  try {
    const snapshot = await get(
      ref(database, `users/${uid}`)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val();

  } catch (error) {
    throw error;
  }
};

//  Update User Profile

export const updateUserProfile = async (
  uid,
  data
) => {
  try {
    await update(
      ref(database, `users/${uid}`),
      data
    );

    return true;

  } catch (error) {
    throw error;
  }
};

//  Update Name

export const updateUserName = async (
    uid, 
    name
) => {

    await update(
        ref(database, `users/${uid}`),
        {
            name,
        }
    );

    if (auth.currentUser) {

        await updateProfile(
            auth.currentUser,
            {
                displayName: name,
            }
        );

    }

};

//   Update About


export const updateUserAbout = async (
  uid,
  about
) => {

  return updateUserProfile(uid, {
    about,
  });

};

//  Update Profile Photo
 
export const updateProfilePhoto = async (
  uid,
  photoURL
) => {

  return updateUserProfile(uid, {
    photoURL,
  });

};