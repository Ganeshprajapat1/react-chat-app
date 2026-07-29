import { useMemo } from "react";
import { useSelector } from "react-redux";

import UserCard from '../../../users/components/UserCard/UserCard';

const ChatList = () => {

  const chats = useSelector(
    (state) => state.chatList.chats
  );

  const users = useSelector(
    (state) => state.users.users
  );

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const search = useSelector(
    (state) => state.users.search
  );

  const conversationList = useMemo(() => {

    return chats
      .map((chat) => {

        const otherUserId = Object.keys(
          chat.participants
        ).find(
          (id) => id !== currentUser.uid
        );

        const user = users.find(
          (u) => u.uid === otherUserId
        );

        if (!user) return null;

        return {

          ...user,

          roomId: chat.roomId,

          lastMessage: chat.lastMessage,

          lastMessageType: chat.lastMessageType,

          lastMessageTime: chat.lastMessageTime,

          unreadCount:
            chat.unreadCount?.[
              currentUser.uid
            ] || 0,

          lastSenderId:
            chat.lastSenderId,

        };

      })
      .filter(Boolean)
      .filter((chat) => {

        const keyword =
          search.toLowerCase();

        return (

          chat.name
            .toLowerCase()
            .includes(keyword)

          ||

          chat.email
            .toLowerCase()
            .includes(keyword)

        );

      });

  }, [
    chats,
    users,
    currentUser,
    search,
  ]);

  if (
    conversationList.length === 0
  ) {

    return (
      <div className="empty-users">
        No conversations yet
      </div>
    );

  }

  return (

    <div className="user-list">

      {conversationList.map(
        (chat) => (

          <UserCard
            key={chat.roomId}
            user={chat}
          />
        )
      )}
    </div>
  );
};

export default ChatList;