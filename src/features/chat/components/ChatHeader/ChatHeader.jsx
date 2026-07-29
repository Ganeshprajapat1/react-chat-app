import {
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiArrowLeft,
  FiTrash2,
  FiCopy,
} from "react-icons/fi";
import { PiShareFatLight } from "react-icons/pi";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { clearSelectedUser } from "../../../users/store/userSlice";
import { clearMessageSelection } from "../../store/messageActionSlice";

import formatLastSeen from "../../utils/formatLastSeen";

import DeleteMessageDialog from "../DeleteMessageDialog/DeleteMessageDialog.jsx";

import { deleteMessagesForEveryone } from "../../services/messageService";

import "../../styles/chat.css";

const ChatHeader = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const selectedUser = useSelector(
    (state) => state.users.selectedUser
  );

  const isTyping = useSelector(
    (state) => state.typing.isTyping
  );

  const { selectionMode, selectedMessages } = useSelector(
    (state) => state.messageAction
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // const [showMenu, setShowMenu] = useState(false);

  const selectedCount = selectedMessages.length;

  // const singleSelection = selectedCount === 1;

  const allText = selectedMessages.every(
    (msg) => msg.type === "text"
  );

  // const allMine = selectedMessages.every(
  //   (msg) => msg.senderId === currentUser.uid
  // );

  // const hasImages = selectedMessages.some(
  //   (msg) => msg.type === "image"
  // );

  const canDeleteForEveryone =
    selectedMessages.every(
      (msg) => msg.senderId === currentUser.uid
    );

  const handleDeleteForEveryone = async () => {
  //   console.log(currentUser);
  // console.log(selectedUser);
  // console.log(selectedMessages);
    try {
      await deleteMessagesForEveryone({
        senderId: currentUser.uid,
        receiverId: selectedUser.uid,
        messageIds: selectedMessages.map(
          (message) => message.id
        ),
      });
      
      toast.success("Message deleted");
      
      setShowDeleteDialog(false);

      dispatch(clearMessageSelection());
      
      
    } catch (error) {
      console.error(error);
      
      toast.error("Failed to delete message");
    }
  };
  
  console.log("Selected User", selectedUser);
  const multiple = selectedMessages.length > 1;

  if (!selectedUser) return null;

  if (selectionMode) {
    return (
      <header className="chat-header selection-mode">

        <button
          className="back-btn"
          onClick={() => dispatch(clearMessageSelection())}
        >
          <FiArrowLeft />
        </button>

        <div className="selection-info">
          <h3>{selectedMessages.length} selected</h3>
        </div>

        <div className="chat-actions">

          <button title="Delete" onClick={() => setShowDeleteDialog(true)}>
            <FiTrash2 />
          </button>

          <button title="Forward">
            <PiShareFatLight />
          </button>

          {allText && (
            <button title="Copy">
              <FiCopy />
            </button>
          )}

          <button title="More">
            <FiMoreVertical />
          </button>
        
        </div>
        <DeleteMessageDialog
          open={showDeleteDialog}
          multiple={multiple}
          canDeleteForEveryone={canDeleteForEveryone}
          onCancel={() => setShowDeleteDialog(false)}
          onDeleteForEveryone={handleDeleteForEveryone}
        />
      </header>
    );
  }

  const handleComingSoon = (feature) => {
    toast(`${feature} feature is coming soon.`, {
      icon: "ℹ️",
    });
  };

  return (
    <header className="chat-header">

      <button
        className="back-btn"
        onClick={() => dispatch(clearSelectedUser())}
      >
        <FiArrowLeft />
      </button>

      <div className="chat-user">
        <div className="chat-avatar">
          
            {selectedUser?.photoURL ? (
            
                <img
                    src={selectedUser.photoURL}
                    alt={selectedUser.name}
                />
            
            ) : (
            
                <span>
                    {selectedUser?.name?.charAt(0)}
                </span>
        
            )}
        
        </div>

        <div>

          <h3>{selectedUser.name}</h3>

          <span
            className={
              isTyping
                ? "typing-status"
                : ""
            }
          >
            {isTyping
              ? "Typing..."
              : selectedUser.isOnline
              ? "Online"
              : formatLastSeen(
                  selectedUser.lastSeen
                )}
          </span>

        </div>

      </div>

      <div className="chat-actions">

        <button
          onClick={() =>
            handleComingSoon("Voice Call")
          }
        >
          <FiPhone />
        </button>

        <button
          onClick={() =>
            handleComingSoon("Video Call")
          }
        >
          <FiVideo />
        </button>

        <button
          onClick={() =>
            handleComingSoon("More Options")
          }
        >
          <FiMoreVertical />
        </button>

      </div>

    </header>
  );
};

export default ChatHeader;