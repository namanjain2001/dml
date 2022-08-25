import React from "react";
import { Link } from "react-router-dom";
import SiteRoutes from "../../routes/SiteRoutes";

const Header = () => {
  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-expand-lg custom_navbar p-3">
          <div className="container-fluid">
            <Link to="/" className="d-flex align-items-center logo_main">
              <img src="assets/img/logo.svg" alt="logo" />
              <span className="d-inline-block fw-bold ms-2">DML</span>
            </Link>
          </div>
        </nav>
      </header>
      <SiteRoutes />
    </React.Fragment>
  );
};

export default Header;
