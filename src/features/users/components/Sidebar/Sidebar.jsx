import SidebarHeader from '../Sidebar/SidebarHeader.jsx';
import SearchBar from '../Search/SearchBar.jsx';
// import UserList from '../UserList/UserList.jsx';
import ChatList from '../../../chat/components/ChatList/ChatList.jsx';
import NewChatButton from '../NewChat/NewChatButton.jsx';

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <SidebarHeader />

      <SearchBar />

      <ChatList />
      {/* <UserList /> */}
      <NewChatButton/>

    </aside>
  );
};

export default Sidebar;