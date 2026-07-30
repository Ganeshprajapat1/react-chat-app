import { RiChatDeleteFill } from "react-icons/ri";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import ImageViewer from "../ImageViewer/ImageViewer";
// import { openMessageMenu } from "../../store/messageActionSlice";
import { toggleMessageSelection } from "../../store/messageActionSlice";
import '../../styles/message.css';

const MessageBubble = ({ message }) => {

  const dispatch = useDispatch();

  const { selectionMode, selectedMessages} = useSelector(
    (state) => state.messageAction
  );

  const isSelected = selectedMessages.some(
    (item) => item.id === message.id
  );
  
  const longPressTimer = useRef(null);
  
  const currentUser = useSelector((state) => state.auth.user);

  const [viewerImage, setViewerImage] = useState(null);

  const isSender = message.senderId === currentUser.uid;

  const handleContextMenu = (e) => {
    if (message.type === "deleted") return;
    e.preventDefault();

    dispatch(
      toggleMessageSelection(message)
    );
  };

  const handleTouchStart = () => {
    if (message.type === "deleted") return;
    if (selectionMode) return;

    clearLongPress();

    longPressTimer.current = setTimeout(() => {
      dispatch(toggleMessageSelection(message));
    }, 500);
  };

  const clearLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleMessageClick = () => {
    if (message.type === "deleted") return;

    if (selectionMode) {
      dispatch(toggleMessageSelection(message));
      return;
    }
  };


  return (
      <div
        className={`message-row ${
          isSender ? "sent" : "received"
        } ${isSelected ? "selected" : ""}`}
        onClick={handleMessageClick}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={clearLongPress}
        onTouchMove={clearLongPress}
      >
        <div className={`message-bubble ${isSender ? "sent-bubble" : "received-bubble"}`}>
            {message.type === "text" && (
              <p>{message.text}</p>
            )}
            
            {message.type === "image" && (
              <>
              <img 
                src={message.image}
                alt="Chat"
                className="chat-image"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectionMode) {
                    dispatch(toggleMessageSelection(message));
                    return;
                  }
                  setViewerImage(message.image);
                }}
              />
              <ImageViewer
                image={viewerImage}
                onClose={() => setViewerImage(null)}
              />

              {message.caption && (
                <p className="image-caption">
                  {message.caption}
                </p>
              )}
              </>
            )}

            {message.reply && (
                <div className="reply-box">
                    <div className="reply-line"></div>
            
                    <div className="reply-body">
                        <span className="reply-sender">
                            {message.reply.senderId === currentUser.uid
                                ? "You"
                                : message.reply.senderName}
                        </span>
                            
                        <p>
                            {message.reply.type === "image"
                                ? "📷 Photo"
                                : message.reply.text}
                        </p>
                    </div>
                </div>
            )}

            {message.type === "deleted" && (
              <div className="deleted-message">
                <span><RiChatDeleteFill /></span>
                <p>This message was deleted </p>
              </div>
            )}
            {message.type !== "deleted" && (
                <div className="message-footer">
                  <span>
                    {format(message.createdAt, "hh:mm a")}
                  </span>
              
                  {isSender && (
                    <span className="seen"> {message.seen ? "✓✓" : "✓"} </span>
                  )}
                </div>
            )}
        </div>
    </div>
  );
};

export default MessageBubble;