import {
  FiCopy,
  FiTrash2,
  FiCornerUpLeft,
  FiSend,
  FiX,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { closeMessageMenu } from "../../store/messageActionSlice";

import "../../styles/messageActionMenu.css";

const MessageActionMenu = () => {

  const dispatch = useDispatch();

  const {
    actionMenuOpen,
    selectedMessage,
  } = useSelector(
    (state) => state.messageAction
  );

  if (!actionMenuOpen) return null;

  return (
    <div
      className="menu-overlay"
      onClick={() =>
        dispatch(closeMessageMenu())
      }
    >
      <div
        className="menu-sheet"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button>
          <FiCopy />
          Copy
        </button>

        <button>
          <FiCornerUpLeft />
          Reply
        </button>

        <button>
          <FiSend />
          Forward
        </button>

        <button className="delete">
          <FiTrash2 />
          Delete
        </button>

        <button
          onClick={() =>
            dispatch(closeMessageMenu())
          }
        >
          <FiX />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MessageActionMenu;