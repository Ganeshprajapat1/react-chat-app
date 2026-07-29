import { Link } from "react-router-dom";

import Logo from "../../../components/Logo/Logo";
import SearchBar from "../../users/components/Search/SearchBar";
import UserList from "../../users/components/UserList/UserList";

import { IoMdArrowRoundBack } from "react-icons/io";

import "../../chat/styles/chat.css";

const NewChat = () => {
  return (
    <div className="new-chat-page">

      <div className="new-chat-header">  
        <Link to="/chat" className="back-btn">
          <IoMdArrowRoundBack />
        </Link>
      <SearchBar />
      </div>


      <UserList mode="new-chat" />

    </div>
  );
};

export default NewChat;