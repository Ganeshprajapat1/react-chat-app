import { useMemo } from "react";
import { useSelector } from "react-redux";

import UserCard from "../UserCard/UserCard";

const UserList = ({ mode = "sidebar" }) => {
  const { users, search } = useSelector((state) => state.users);

  const currentUser = useSelector((state) => state.auth.user);

  const filteredUsers = useMemo(() => {
    const keyword = (search || "").toLowerCase();

    return users.filter((user) => {
      if (!user.uid || !user.name || !user.email) {
        return false;
      }

      if (user.uid === currentUser?.uid) {
        return false;
      }

      return (
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
      );
    });
  }, [users, search, currentUser]);

  if (filteredUsers.length === 0) {
    return <div className="empty-users">No users found</div>;
  }

  return (
    <div className="user-list">
      {filteredUsers.map((user) => (
        <UserCard
          key={user.uid}
          user={user}
          mode={mode}
        />
      ))}
    </div>
  );
};

export default UserList;