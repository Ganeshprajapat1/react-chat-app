import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { subscribeToUsers } from "../services/userListener";
import { setUsers } from "../store/userSlice";

const UserListener = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = subscribeToUsers((users) => {
      dispatch(setUsers(users));
    });

    return unsubscribe;
  }, [dispatch]);

  return children;
};

export default UserListener;