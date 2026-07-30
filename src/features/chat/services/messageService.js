import {
  ref,
  push,
  set,
  onValue,
  get,
  update,
  query,
  limitToLast,
  orderByChild,
  endBefore,
  get as getData,
} from "firebase/database";

import { database } from "../../../firebase/firebaseConfig";
import generateRoomId from "../utils/generateRoomId";


  //  Send Message


export const sendMessage = async ({
  senderId,
  receiverId,
  text,
  reply = null,
}) => {
  const roomId = generateRoomId(senderId, receiverId);

  const messagesRef = ref(database, `messages/${roomId}`);
  const newMessageRef = push(messagesRef);

  const createdAt = Date.now();

  const message = {
    id: newMessageRef.key,
    senderId,
    receiverId,
    text,
    type: "text",
    seen: false,
    createdAt,
    reply: reply || null,
  };

  const chatRef = ref(database, `chats/${roomId}`);
  const chatSnapshot = await get(chatRef);

  let receiverUnread = 0;

  if (chatSnapshot.exists()) {
    receiverUnread =
      chatSnapshot.val()?.unreadCount?.[receiverId] || 0;
  }

  // STEP 1: Create/Update chat first
  await update(chatRef, {
    participants: {
      [senderId]: true,
      [receiverId]: true,
    },

    lastMessage: text,
    lastMessageType: "text",
    lastSenderId: senderId,
    lastMessageTime: createdAt,

    [`unreadCount/${senderId}`]: 0,
    [`unreadCount/${receiverId}`]: receiverUnread + 1,
  });

  // STEP 2: Save message
  await set(newMessageRef, message);

  // STEP 3: Update sender chat list
  await update(
    ref(database, `userChats/${senderId}`),
    {
      [roomId]: {
        otherUserId: receiverId,
        updatedAt: createdAt,
      },
    }
  );

  // STEP 4: Update receiver chat list
  await update(
    ref(database, `userChats/${receiverId}`),
    {
      [roomId]: {
        otherUserId: senderId,
        updatedAt: createdAt,
      },
    }
  );
};

export const sendImageMessage = async ({
  senderId,
  receiverId,
  image,
  caption,
  reply = null,
}) => {

  const roomId = generateRoomId(
    senderId,
    receiverId
  );

  const createdAt = Date.now();

  const messagesRef = ref(
    database,
    `messages/${roomId}`
  );

  const newMessageRef = push(messagesRef);

  const message = {
    id: newMessageRef.key,

    senderId,
    receiverId,

    type: "image",

    image,
    caption,

    seen: false,

    createdAt,
    reply: reply || null,
  };

  // STEP 1: Create/Update chat first
  await update(
    ref(database, `chats/${roomId}`),
    {
      participants: {
        [senderId]: true,
        [receiverId]: true,
      },

      lastMessage: "📷 Photo",

      lastMessageType: "image",

      lastSenderId: senderId,

      lastMessageTime: createdAt,
    }
  );

  // STEP 2: Save message
  await set(newMessageRef, message);

  // STEP 3: Update sender chat list
  await update(
    ref(database, `userChats/${senderId}`),
    {
      [roomId]: {
        otherUserId: receiverId,
        updatedAt: createdAt,
      },
    }
  );

  // STEP 4: Update receiver chat list
  await update(
    ref(database, `userChats/${receiverId}`),
    {
      [roomId]: {
        otherUserId: senderId,
        updatedAt: createdAt,
      },
    }
  );
};

  //  Subscribe Messages

export const subscribeToMessages = (
  senderId,
  receiverId,
  callback
) => {
  const roomId = generateRoomId(
    senderId,
    receiverId
  );

  const messagesQuery = query(
    ref(database, `messages/${roomId}`),
    orderByChild("createdAt"),
    limitToLast(30)
  );

  return onValue(messagesQuery, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const messages = Object.values(snapshot.val()).sort(
      (a, b) => a.createdAt - b.createdAt
    );

    callback(messages);
  });
};

export const loadOlderMessages = async (
  senderId,
  receiverId,
  oldestTimestamp
) => {
  const roomId = generateRoomId(
    senderId,
    receiverId
  );

  const olderQuery = query(
    ref(database, `messages/${roomId}`),
    orderByChild("createdAt"),
    endBefore(oldestTimestamp),
    limitToLast(30)
  );

  const snapshot = await getData(olderQuery);

  if (!snapshot.exists()) {
    return [];
  }

  return Object.values(snapshot.val()).sort(
    (a, b) => a.createdAt - b.createdAt
  );
};


  //  Mark Messages as Seen

export const markMessagesAsSeen = async (
  senderId,
  receiverId
) => {
  const roomId = generateRoomId(senderId, receiverId);

  const roomRef = ref(database, `messages/${roomId}`);

  const snapshot = await get(roomRef);

  if (!snapshot.exists()) return;

  const messages = snapshot.val();

  const updates = {};

  Object.keys(messages).forEach((key) => {
    const message = messages[key];

    if (
      message.senderId === senderId &&
      message.receiverId === receiverId &&
      !message.seen
    ) {
      updates[`${key}/seen`] = true;
    }
  });

  if (Object.keys(updates).length > 0) {
    await update(roomRef, updates);
  }
};

  //  Clear Unread Count

export const clearUnreadCount = async (
  currentUserId,
  otherUserId
) => {
  const roomId = generateRoomId(
    currentUserId,
    otherUserId
  );

  await update(
    ref(database, `chats/${roomId}`),
    {
      [`unreadCount/${currentUserId}`]: 0,
    }
  );
};

export const deleteMessagesForEveryone = async ({
  senderId,
  receiverId,
  messageIds,
}) => {
  const roomId = generateRoomId(senderId, receiverId);

  const updates = {};

  messageIds.forEach((id) => {
    updates[`${id}/type`] = "deleted";
    updates[`${id}/deleted`] = true;
    updates[`${id}/deletedForEveryone`] = true;
    updates[`${id}/deletedAt`] = Date.now();

    updates[`${id}/text`] = "";
    updates[`${id}/image`] = "";
    updates[`${id}/caption`] = "";
    updates[`${id}/reply`] = null;
    updates[`${id}/forwarded`] = false;
  });

  await update(
    ref(database, `messages/${roomId}`),
    updates
  );
};