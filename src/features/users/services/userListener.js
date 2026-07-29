import { ref, onValue } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";

export const subscribeToUsers = (callback) => {
    const usersRef = ref(database, "users");

    return onValue(usersRef, (snapshot) => {
        if(!snapshot.exists()){
            callback([]);
            return;
        }

        const data = snapshot.val();
        const users = Object.values(data);

        callback(users);
    });
};