import { useNavigate } from "react-router-dom";
import { MdChat } from "react-icons/md";

import '../../../chat/styles/chat.css';

const NewChatButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="new-chat-btn"
      onClick={() => navigate("/new-chat")}
      title="Start New Chat"
    >
      <MdChat size={28} />
    </button>
  );
};

export default NewChatButton;