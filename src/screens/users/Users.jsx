/********
 *
 * DASHBOARD => USERS LIST AND FUNCTIONAL AREA SCREEN
 *
 *
 * **********/

import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersData from "../../components/users/UsersData";

const Users = () => {
  const navigate = useNavigate();

  const userLoginReducer = useSelector((store) => store.userLoginReducer);

  const { loginUser } = userLoginReducer;

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    }
  }, [loginUser]);

  return (
    <React.Fragment>
      <section className="dashboard_main users_section">
        <div className="row mx-0">
          <SideBar />
          <UsersData />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Users;
