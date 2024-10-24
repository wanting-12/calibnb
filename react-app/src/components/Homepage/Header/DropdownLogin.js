import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../../store/session";
import "./DropdownLogin.css";

function DropdownLogin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();

    dispatch(logout());

    history.push("/");
    window.scrollTo(0, 0);
  };

  const handleAccount = (e) => {
    e.preventDefault();
    history.push("/users/profile");
    window.scrollTo(0, 0);
  };

  const handleCalibnb = (e) => {
    e.preventDefault();
    history.push("/users/calibnb");
    window.scrollTo(0, 0);
  };

  const handleTrips = (e) => {
    e.preventDefault();
    history.push("/users/trips");
    window.scrollTo(0, 0);
  };

  const handleWishlists = (e) => {
    e.preventDefault();
    history.push("/users/wishlists");
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex-column ptb mt login-dropdown">
      <div className="top flex-column">
        {/* <div className="text-hover flex center">
          <div className="top-text-login">Messages</div>
        </div> */}
        {/* <div className="text-hover flex center">
          <div className="top-text-login">Notifications</div>
        </div> */}
        <div className="text-hover flex center" onClick={handleTrips}>
          <div className="top-text-login">Trips</div>
        </div>
        <div className="text-hover flex center" onClick={handleWishlists}>
          <div className="top-text-login">Wishlists</div>
        </div>
      </div>
      <div className="mid flex-column">
        <div className="text-hover flex center" onClick={handleCalibnb}>
          <div className="top-text">Calibnb your home</div>
        </div>
        {/* <div className="text-hover flex center">
          <div className="top-text">Share your experience</div>
        </div> */}
        <div className="text-hover flex center" onClick={handleAccount}>
          <div className="top-text">Account</div>
        </div>
      </div>
      <div className="bottom flex-column">
        <div className="text-hover flex center" onClick={handleLogout}>
          <div className="top-text" onClick={handleLogout}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownLogin;
