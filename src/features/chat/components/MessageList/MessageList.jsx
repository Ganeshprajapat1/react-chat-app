import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageBubble from "../MessageBubble/MessageBubble";
import { prependMessages, setLoadingOlder, setHasMore } from "../../store/messageSlice";

import { loadOlderMessages } from "../../services/messageService";

import '../../styles/message.css';

const MessageList = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state)=>state.auth.user
  );

  const selectedUser = useSelector(
    (state)=>state.users.selectedUser
  );

  const oldestMessage = useSelector(
    (state)=>state.messages.oldestMessage
  );

  const hasMore = useSelector(
    (state)=>state.messages.hasMore
  );

  const messages = useSelector(
    (state) => state.messages.messages
  );

  const loadingOlder = useSelector(
    (state) => state.messages.loadingOlder
  );

  const listRef = useRef(null);
  const bottomRef = useRef(null);

  const previousLength = useRef(0);

  useEffect(() => {

    if (messages.length === 0) return;

    // Don't scroll when loading older messages
    if (loadingOlder) {
      previousLength.current = messages.length;
      return;
    }

    // Initial load
    if (previousLength.current === 0) {
      bottomRef.current?.scrollIntoView({
        behavior: "auto",
      });

      previousLength.current = messages.length;
      return;
    }

    // New message received
    if (messages.length > previousLength.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }

    previousLength.current = messages.length;

  }, [messages, loadingOlder]);

  if (messages.length === 0) {
    return (
      <div className="empty-messages">
        Start your conversation
      </div>
    );
  }
  const handleScroll = async () => {
    if(!listRef.current) return;

    if(listRef.current.scrollTop!==0) return;

    if(!hasMore) return;

    if(!oldestMessage) return;

    dispatch(setLoadingOlder(true));

    const previousHeight = listRef.current.scrollHeight;

      const olderMessages =
        await loadOlderMessages(
          currentUser.uid,
          selectedUser.uid,
          oldestMessage.createdAt
        );

      if(olderMessages.length===0){

          dispatch(setHasMore(false));
          dispatch(setLoadingOlder(false));
          return;
      }
      dispatch(
          prependMessages(olderMessages)
      );
      requestAnimationFrame(()=>{
          const newHeight = listRef.current.scrollHeight;

          listRef.current.scrollTop = newHeight-previousHeight;
      });

      dispatch(setLoadingOlder(false));
  };

  return (
    <div
      className="message-list"
      ref={listRef}
      onScroll={handleScroll}
    >

      {loadingOlder && (
        <div className="loading-older">
          Loading older messages...
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      <div ref={bottomRef} />

    </div>
  );
};

export default MessageList;