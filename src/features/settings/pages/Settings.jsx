import { useSelector } from "react-redux";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../styles/settings.css";

const Settings = () => {
    const navigate = useNavigate();

    const user = useSelector(
        state => state.auth.user
    );

    return (

        <div className="settings-page">

            <div className="settings-header">
                <button
                    className="settings-back-btn"
                    onClick={() => navigate("/chat")}
                >
                    <FiArrowLeft />
                </button>
                <h2>Settings</h2>
            </div>
            <div className="profile-card">
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
                <div className="profile-details">
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                </div>
            </div>
            <div className="settings-list">
                <Link
                    to="/settings/profile"
                    className="setting-item"
                >
                    <span>Profile</span>
                    <FiChevronRight />
                </Link>

                <div className="setting-item">

                    <span>Notifications</span>

                    <FiChevronRight />

                </div>

                <div className="setting-item">

                    <span>Privacy</span>

                    <FiChevronRight />

                </div>

                <div className="setting-item">

                    <span>Appearance</span>

                    <FiChevronRight />

                </div>

                <div className="setting-item">

                    <span>About</span>

                    <FiChevronRight />

                </div>

            </div>

        </div>

    );

};

export default Settings;