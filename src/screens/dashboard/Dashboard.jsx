/********
 *
 * DASHBOARD => COMPANY LIST AND FUNCTIONAL AREA SCREEN
 *
 *
 * **********/

import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import DashboardData from "../../components/DashboardData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
      <section className="dashboard_main">
        <div className="row mx-0">
          <SideBar />
          <DashboardData />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
