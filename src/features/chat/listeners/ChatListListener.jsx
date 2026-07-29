import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { subscribeChats } from "../services/chatService";
import { setChats } from "../store/chatListSlice";

const ChatListListener = ({ children }) => {

  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  useEffect(() => {

    if (!currentUser) return;

    const unsubscribe = subscribeChats(
      (chats) => {

        const list = Object.entries(chats)
          .filter(([_, chat]) =>
            chat.participants?.[currentUser.uid]
          )
          .map(([roomId, chat]) => ({
            roomId,
            ...chat,
          }))
          .sort(
            (a, b) =>
              b.lastMessageTime -
              a.lastMessageTime
          );

        dispatch(setChats(list));

      }
    );

    return unsubscribe;

  }, [currentUser, dispatch]);

  return children;

};

export default ChatListListener;