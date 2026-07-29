import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { subscribeUserChats } from "../services/chatListService";
import { subscribeToMessages } from "../services/messageService";
import { addNotification } from "../../notifications/store/notificationSlice";

const GlobalMessageListener = ({ children }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);

  // Keep track of active room listeners
  const roomListeners = useRef({});

  // Keep track of last message processed in each room
  const lastMessageIds = useRef({});

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribeChats = subscribeUserChats(
      currentUser.uid,
      (rooms) => {

        Object.keys(rooms).forEach((roomId) => {

          if (roomListeners.current[roomId]) return;

          const otherUserId = rooms[roomId].otherUserId;

          roomListeners.current[roomId] = subscribeToMessages(
            currentUser.uid,
            otherUserId,
            (messages) => {

              if (messages.length === 0) return;

              const latest =
                messages[messages.length - 1];

              // Ignore our own messages
              if (latest.senderId === currentUser.uid) return;

              // Prevent duplicate notifications
              if (
                lastMessageIds.current[roomId] === latest.id
              ) {
                return;
              }

              lastMessageIds.current[roomId] = latest.id;

              const sender = users.find(
                (u) => u.uid === latest.senderId
              );

              dispatch(
                addNotification({
                  id: latest.id,
                  type: "message",
                  senderId: latest.senderId,
                  senderName:
                    sender?.name || "Unknown User",
                  senderPhoto:
                    sender?.photoURL || "",
                  text: latest.text,
                  roomId,
                  createdAt: latest.createdAt,
                })
              );
            }
          );

        });

      }
    );

    return () => {

      unsubscribeChats();

      Object.values(roomListeners.current).forEach(
        (unsubscribe) => unsubscribe()
      );

      roomListeners.current = {};
    };

  }, [currentUser, users, dispatch]);

  return children;
};

export default GlobalMessageListener;