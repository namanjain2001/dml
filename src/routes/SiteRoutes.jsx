import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import ForgotPasswordOTP from "../screens/ForgotPasswordOTP";
import Dashboard from "../screens/dashboard/Dashboard";
import AddCompany from "../screens/dashboard/AddCompany";
import ViewCompany from "../screens/dashboard/ViewCompany";
import Campaigns from "../screens/campaigns/Campaigns";
import AddCampaigns from "../screens/campaigns/AddCampaigns";
import ViewCampaigns from "../screens/campaigns/ViewCampaigns";
import Users from "../screens/users/Users";

const SiteRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forget-password" element={<ForgotPassword />} />
        <Route
          exact
          path="/verify-forgot-password"
          element={<ForgotPasswordOTP />}
        />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/add-company" element={<AddCompany />} />
        <Route exact path="/view-company" element={<ViewCompany />} />

        <Route exact path="/users" element={<Users />} />

        <Route exact path="/campaigns" element={<Campaigns />} />
        <Route exact path="/add-campaigns" element={<AddCampaigns />} />
        <Route exact path="/view-campaigns" element={<ViewCampaigns />} />
      </Routes>
    </React.Fragment>
  );
};

export default SiteRoutes;
