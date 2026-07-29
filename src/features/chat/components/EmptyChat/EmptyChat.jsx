import { FiMessageCircle } from "react-icons/fi";

const EmptyChat = () => {
  return (

    <div className="empty-chat">
      <FiMessageCircle className="empty-icon"/>
      <h2>Welcome to ReactChat</h2>
      <p>Select a conversation and start chatting.</p>
    </div>
  );
};

export default EmptyChat;