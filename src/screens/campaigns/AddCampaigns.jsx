import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import AddCampaignsData from "../../components/campaigns/AddCampaignsData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCampaigns = () => {
  const navigate = useNavigate();

  const userLoginReducer = useSelector((store) => store.userLoginReducer);
  const { loginUser } = userLoginReducer;

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    }
  }, [loginUser]);

  return (
    <section className="dashboard_main">
      <div className="row mx-0">
        <SideBar />
        <div className="dashboardData p-4">
          <AddCampaignsData />
        </div>
      </div>
    </section>
  );
};

export default AddCampaigns;
