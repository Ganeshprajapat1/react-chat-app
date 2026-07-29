import { useSelector } from "react-redux";
import Sidebar from "../../users/components/Sidebar/Sidebar";
import "../styles/chat.css";

const ChatLayout = ({ children }) => {
  const selectedUser = useSelector(
    (state) => state.users.selectedUser
  );
  return (
    <div className={`chat-layout ${selectedUser ? "chat-open" : ""}`}>

      <Sidebar />

      <main className="chat-main">
        {children}
      </main>

    </div>
  );
};

export default ChatLayout;