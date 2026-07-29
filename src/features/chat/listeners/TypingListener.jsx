import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { subscribeTypingStatus } from "../services/typingService";
import { setTyping } from "../store/typingSlice";

const TypingListener = ({ children }) => {

  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const selectedUser = useSelector(
    (state) => state.users.selectedUser
  );

  useEffect(() => {

    if (!currentUser || !selectedUser) return;

    const unsubscribe = subscribeTypingStatus(
      currentUser.uid,
      selectedUser.uid,
      (typing) => {
        dispatch(setTyping(typing));
      }
    );

    return unsubscribe;

  }, [
    currentUser,
    selectedUser,
    dispatch,
  ]);

  return children;

};

export default TypingListener;