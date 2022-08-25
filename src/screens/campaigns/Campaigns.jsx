/********
 *
 * DASHBOARD => CAMPAIGNS LIST AND FUNCTIONAL AREA SCREEN
 *
 *
 * **********/

import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import CampaignsData from "../../components/campaigns/CampaignsData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
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
      <section className="dashboard_main campaigns_section">
        <div className="row mx-0">
          <SideBar />
          <CampaignsData />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Campaigns;
