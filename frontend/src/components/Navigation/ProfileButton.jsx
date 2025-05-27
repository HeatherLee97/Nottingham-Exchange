import  { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeDropdownMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    const handleOutsideClick = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeDropdownMenu();
  };

  const ulClassName = `profile-dropdown${showMenu ? "" : " hidden"}`;

  return (
    <div className="profile-container">
      <button
        onClick={openMenu}
        className="nav-profile-button"
        aria-haspopup="true"
        aria-expanded={showMenu}
      >
        <span className="nav-link">Account</span>
      </button>

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown-container">
            <div className="profile-dropdown-div">
              <div className="profile-dropdown-user">
                <i className="fas fa-user" />
                <span className="profile-dropdown-name">{user.username}</span>
              </div>

              <div onClick={handleLogout} className="profile-dropdown-logout">
                <i className="fas fa-sign-out-alt" />
                <span className="profile-dropdown-logout-btn">Sign Out</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-logsign-div">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeDropdownMenu}
              modalClass="login-sign-btn"
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeDropdownMenu}
              modalClass="login-sign-btn"
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

ProfileButton.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default ProfileButton;
