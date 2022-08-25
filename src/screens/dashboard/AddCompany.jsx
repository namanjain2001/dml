import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import AddCompanyData from "../../components/AddCompanyData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCompany = () => {
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
          <AddCompanyData />
        </div>
      </div>
    </section>
  );
};

export default AddCompany;
