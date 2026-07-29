import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ChatLayout from "../layout/ChatLayout.jsx";
import ChatHeader from '../components/ChatHeader/ChatHeader.jsx';
import EmptyChat from '../components/EmptyChat/EmptyChat.jsx';
import MessageInput from '../components/MessageInput/MessageInput.jsx';
import MessageList from '../components/MessageList/MessageList.jsx';
// import MessageActionMenu from "../components/MessageActionMenu/MessageActionMenu.jsx";

import MessageListener from '../components/MessageListener/MessageListener.jsx';

import '../styles/message.css';
import '../styles/chat.css';

const Chat = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const selectedUser = useSelector(
    state => state.users.selectedUser
  );
  return (
    <MessageListener>
      <ChatLayout>
        {
          selectedUser ?
          <>
            <ChatHeader/>
            <MessageList/>
            <MessageInput/>
            {/* <MessageActionMenu/> */}
          </>
          :
          <EmptyChat/>
        }
      </ChatLayout>
    </MessageListener>
  );
};

export default Chat;