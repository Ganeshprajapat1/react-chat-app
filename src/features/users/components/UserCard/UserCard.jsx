import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setSelectedUser, toggleChatSelection } from "../../store/userSlice";

import '../../styles/usercard.css';

const UserCard = ({
  user,
  mode = "sidebar",
}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timerRef = useRef(null);
  const longPressTriggered = useRef(false);

  const {
    selectedUser,
    selectedChats,
    selectionMode,
  } = useSelector((state) => state.users);

  const isActive =
    selectedUser?.uid === user.uid;

  const isSelected =
    selectedChats.includes(user.uid);

  // ------------------------
  // Normal Click
  // ------------------------

  const handleClick = () => {

    // Ignore click after long press
    if (longPressTriggered.current) {
      longPressTriggered.current = false;
      return;
    }

    if (selectionMode) {
      dispatch(toggleChatSelection(user.uid));
      return;
    }

    dispatch(setSelectedUser(user));

    if (mode === "new-chat") {
      navigate("/chat");
    }
  };

  // ------------------------
  // Desktop Right Click
  // ------------------------

  const handleContextMenu = (e) => {
    e.preventDefault();

    dispatch(toggleChatSelection(user.uid));
  };

  // ------------------------
  // Mobile Long Press
  // ------------------------

  const handleTouchStart = () => {

    longPressTriggered.current = false;

    timerRef.current = setTimeout(() => {

      longPressTriggered.current = true;

      dispatch(toggleChatSelection(user.uid));

    }, 600);

    };

  const handleTouchEnd = () => {

    clearTimeout(timerRef.current);

  };

  const handleTouchMove = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <div 
      className={`user-card 
        ${isActive ? "active" : ""}
        ${isSelected ? "selected" : ""}
      `}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchEnd}
    >
    <div className="avatar">
        {user.photoURL ? (
            <img
                src={user.photoURL}
                alt={user.name}
            />
        ) : (
            <span>
                {user.name.charAt(0)}
            </span>
        )}

    </div>

      <div className="user-content">

        <div className="user-top">

          <h4>{user.name}</h4>

          {mode === "sidebar" && (
            <span className="time">
              {user.lastMessageTime || ""}
            </span>
          )}

        </div>

        {mode === "sidebar" && (

          <div className="user-bottom">

            <p>
              {user.lastMessage ||
                "Start chatting..."}
            </p>

            <div className="right-side">

              {user.unreadCount > 0 && (

                <span className="badge">
                  {user.unreadCount}
                </span>

              )}

              <span
                className={`status ${
                  user.isOnline
                    ? "online"
                    : "offline"
                }`}
              />

            </div>

          </div>

        )}

        {mode === "new-chat" && (

          <div className="user-bottom">

            <p>{user.email}</p>

            <span
              className={`status ${
                user.isOnline
                  ? "online"
                  : "offline"
              }`}
            />

          </div>

        )}

      </div>

    </div>
  );
};

export default UserCard;