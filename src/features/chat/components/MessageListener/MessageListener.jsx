import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  subscribeToMessages,
  markMessagesAsSeen,
  clearUnreadCount,
} from "../../services/messageService";

import {
  setMessages,
  clearMessages,
} from "../../store/messageSlice";

import { addNotification } from "../../../notifications/store/notificationSlice";
import generateRoomId from "../../utils/generateRoomId";

const MessageListener = ({ children }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const selectedUser = useSelector(
    (state) => state.users.selectedUser
  );

  const users = useSelector(
    (state) => state.users.users
  );

  useEffect(() => {
    if (!currentUser || !selectedUser) {
      dispatch(clearMessages());
      return;
    }

    const unsubscribe = subscribeToMessages(
      currentUser.uid,
      selectedUser.uid,
      async (messages) => {

        dispatch(setMessages(messages));

        if (messages.length === 0) return;

        const latest = messages[messages.length - 1];

        // Find sender details
        const sender = users.find(
          (user) => user.uid === latest.senderId
        );

        // Show notification only for received messages
        if (latest.senderId !== currentUser.uid) {

          dispatch(
            addNotification({
              id: latest.id,
              type: "message",
              senderId: latest.senderId,
              senderName: sender?.name || "Unknown User",
              senderPhoto: sender?.photoURL || "",
              text: latest.text,
              roomId: generateRoomId(
                currentUser.uid,
                latest.senderId
              ),
              createdAt: latest.createdAt,
            })
          );
        }

        await markMessagesAsSeen(
          selectedUser.uid,
          currentUser.uid
        );
        await clearUnreadCount(
          currentUser.uid,
          selectedUser.uid
        );
      }
    );

    return unsubscribe;

  }, [currentUser, selectedUser, users, dispatch]);

  return children;
};

export default MessageListener;