import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_LOGOUT } from "../constants/userConstant";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem("userInfoDML");
    navigate("/");
  };
  return (
    <React.Fragment>
      <div className="sidebar p-3 d-flex flex-column">
        <ul className="list-unstyled p-0 m-0">
          <li>
            <NavLink to="/dashboard">
              <i className="material-symbols-outlined">widgets</i>
              <span>Company</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/users">
              <i className="material-symbols-outlined">power</i>
              <span>Users</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/campaigns">
              <i className="material-symbols-outlined">campaign</i>
              <span>Campaigns</span>
            </NavLink>
          </li>
        </ul>
        <div className="logout_user mt-3 pt-3">
          <button
            className="btn logout_user_btn w-100 text-start"
            onClick={() => logoutUser()}
          >
            <i className="material-symbols-outlined">logout</i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
