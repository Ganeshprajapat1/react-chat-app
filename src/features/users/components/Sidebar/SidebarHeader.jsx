import { FiSettings, FiLogOut, FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logoutUser } from '../../../auth/store/authThunk';

import '../../../chat/styles/chat.css';

const SidebarHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);
  
  return (
    <div className="sidebar-header">

      <div className="profile">

        <div className="profile-avatar">
            {user?.photoURL ? (
                <img
                    src={user.photoURL}
                    alt={user.name}
                />
            ) : (
                <span>
                    {user?.name?.charAt(0)?.toUpperCase()}
                </span>
            )}
        </div>

        <div className="profile-info">

          <h3>{user?.name}</h3>

          <span>Available</span>

        </div>

      </div>

      <div className="header-actions" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
        >
          <FiMoreVertical />
        </button>
        {showMenu && (
          <div className="sidebar-menu">
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/settings");
              }}
            >
              <FiSettings />
              <span>Settings</span>
            </button>
            <hr />
            <button onClick={handleLogout}>
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarHeader;