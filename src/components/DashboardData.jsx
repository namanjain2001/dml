import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMPANY_RESET,
  UPDATE_COMPANY_RESET,
  DELETE_COMPANY_RESET,
} from "../constants/dashboardConstants";
import { listCompanyAction } from "../actions/dashboardAction";
import Loader from "./shared/Loader";
import Alert from "./shared/Alert";

const DashboardData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listCompanyReducer = useSelector((store) => store.listCompanyReducer);
  const { loading, listedCompany } = listCompanyReducer;
  const deleteCompanyReducer = useSelector(
    (store) => store.deleteCompanyReducer
  );
  const { deleteCompany } = deleteCompanyReducer;

  useEffect(() => {
    dispatch({ type: ADD_COMPANY_RESET });
    dispatch({ type: UPDATE_COMPANY_RESET });
    dispatch(listCompanyAction());
    if (deleteCompany) {
      setTimeout(() => {
        dispatch({ type: DELETE_COMPANY_RESET });
      }, 1500);
    }
  }, [dispatch, deleteCompany]);

  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className="dashboardData p-4">
        <div className="dashboardData_header d-flex flex-wrap justify-content-between align-items-center">
          <div className="dashboardData_heading">
            <h3>Company</h3>
          </div>
          <div className="dashboardData_createBtn">
            <button
              className="btn btn-secondary-custom"
              onClick={() => {
                navigate("/add-company");
              }}
            >
              Create Company
            </button>
          </div>
        </div>

        <div className="dashboardData_cont">
          {!listedCompany && (
            <div className="no_record_found">
              <div className="alert alert-warning text-center my-5">
                No company has been added yet.
              </div>
            </div>
          )}
          {listedCompany && (
            <div className="all_companies table_style mt-5">
              {deleteCompany && (
                <Alert
                  variant={"alert-success mt-0 mb-5"}
                  children={deleteCompany.message}
                />
              )}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Website</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listedCompany.map((allCompany, indexNum) => {
                      return (
                        <tr key={indexNum}>
                          <td>{allCompany.companyName}</td>
                          <td>{allCompany.website}</td>
                          <td>{allCompany.address}</td>
                          <td>{allCompany.email}</td>
                          <td>{allCompany.phone}</td>
                          <td>
                            <Link
                              className="edit_this d-block text-center"
                              to="/view-company"
                              state={{ getThisComp: allCompany }}
                              style={{ color: "#1c7ed6" }}
                            >
                              <i className="material-symbols-outlined">edit</i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardData;
