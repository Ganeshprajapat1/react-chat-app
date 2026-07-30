import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";

import { FiSmile, FiPaperclip, FiSend, FiX  } from "react-icons/fi";

import {
  sendMessage,
  sendImageMessage,
} from "../../services/messageService";

import { setTypingStatus } from "../../services/typingService";
import ImagePreview from "../ImagePreview/ImagePreview";
import { clearReplyMessage } from "../../store/replySlice";

import '../../styles/chat.css';
const MessageInput = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [sendingImage, setSendingImage] = useState(false);
  
  const [previewImage, setPreviewImage] = useState(null);
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();
  
  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const selectedUser = useSelector(
    (state) => state.users.selectedUser
  );

  const replyMessage = useSelector(
    (state) => state.reply.replyMessage
  );

  const fileInputRef = useRef(null);
  const typingTimeout = useRef(null);

  // --------------------------
  // Handle Typing
  // --------------------------

  const handleChange = (e) => {
    const value = e.target.value;

    setText(value);

    if (!currentUser || !selectedUser) return;

    setTypingStatus(
      currentUser.uid,
      selectedUser.uid,
      true
    );

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setTypingStatus(
        currentUser.uid,
        selectedUser.uid,
        false
      );
    }, 2000);
  };

  // --------------------------
  // Send Text Message
  // --------------------------

  const handleSend = async () => {
    if (!text.trim()) return;
    if (!currentUser || !selectedUser) return;

    try {
      await sendMessage({
        senderId: currentUser.uid,
        receiverId: selectedUser.uid,
        text: text.trim(),
        reply: replyMessage,
      });

      setText("");

      dispatch(clearReplyMessage());

      await setTypingStatus(
        currentUser.uid,
        selectedUser.uid,
        false
      );

      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    } catch (error) {
      console.error("Send Message Error:", error);
    }
  };

  // --------------------------
  // Select Image
  // --------------------------

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // --------------------------
  // Send Image
  // --------------------------

  const handleSendImage = async () => {
    if (!selectedImage) return;
    if (!currentUser || !selectedUser) return;
    if (sendingImage) return;

    try {
      setSendingImage(true);

      await sendImageMessage({
        senderId: currentUser.uid,
        receiverId: selectedUser.uid,
        image: selectedImage,
        caption,
        reply: replyMessage,
      });

      dispatch(clearReplyMessage());

      await setTypingStatus(
        currentUser.uid,
        selectedUser.uid,
        false
      );

      setSelectedImage(null);
      setCaption("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Image Send Error:", error);
    } finally {
      setSendingImage(false);
    }
  };

  // --------------------------
  // Cleanup
  // --------------------------

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }

      if (currentUser && selectedUser) {
        setTypingStatus(
          currentUser.uid,
          selectedUser.uid,
          false
        );
      }
    };
  }, [currentUser, selectedUser]);

  return (
    <>
      {replyMessage && (
        <div className="reply-preview">
          <div className="reply-content">
            <span className="reply-title">
              Replying to{" "}
              {replyMessage.senderId === currentUser.uid ? "You" : selectedUser.name}
            </span>
      
            {replyMessage.type === "text" ? (
              <p>{replyMessage.text}</p>
            ) : (
              <p>📷 Photo</p>
            )}
          </div>
          
          <button
            className="reply-close"
            onClick={() => dispatch(clearReplyMessage())}
          >
            <FiX />
          </button>
        </div>
      )}
      <div className="message-input">

        <button>
          <FiSmile />
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
        >
          <FiPaperclip />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageSelect}
        />

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button onClick={handleSend}>
          <FiSend />
        </button>

      </div>

      <ImagePreview
        image={selectedImage}
        caption={caption}
        setCaption={setCaption}
        onCancel={() => {
          setSelectedImage(null);
          setCaption("");

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
        onSend={handleSendImage}
      />
    </>
  );
};

export default MessageInput;