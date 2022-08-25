import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CAMPAIGN_RESET,
  UPDATE_CAMPAIGN_RESET,
  DELETE_CAMPAIGN_RESET,
} from "../../constants/campaignsConstant";
import { listCampaignAction } from "../../actions/campaignsAction";
import Loader from "../shared/Loader";
import Alert from "../shared/Alert";

const CampaignsData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listCampaignReducer = useSelector((store) => store.listCampaignReducer);
  const { loading, listedCampaign } = listCampaignReducer;
  const deleteCampaignReducer = useSelector(
    (store) => store.deleteCampaignReducer
  );
  const { deleteCampaign } = deleteCampaignReducer;

  useEffect(() => {
    dispatch({ type: ADD_CAMPAIGN_RESET });
    dispatch({ type: UPDATE_CAMPAIGN_RESET });
    if (deleteCampaign) {
      setTimeout(() => {
        dispatch({ type: DELETE_CAMPAIGN_RESET });
      }, 1500);
    }
    dispatch(listCampaignAction());
  }, [dispatch, deleteCampaign]);

  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className="dashboardData p-4 campaignsData">
        <div className="dashboardData_header d-flex flex-wrap justify-content-between align-items-center">
          <div className="dashboardData_heading">
            <h3>Campaigns</h3>
          </div>
          <div className="dashboardData_createBtn">
            <button
              className="btn btn-secondary-custom"
              onClick={() => {
                navigate("/add-campaigns");
              }}
            >
              Create Campaign
            </button>
          </div>
        </div>

        <div className="dashboardData_cont">
          {!listCampaignAction && (
            <div className="no_record_found">
              <div className="alert alert-warning text-center my-5">
                No campaign has been added yet.
              </div>
            </div>
          )}
          {listCampaignAction && (
            <div className="all_companies table_style mt-5">
              {deleteCampaign && (
                <Alert
                  variant={"alert-success mt-0 mb-5"}
                  children={deleteCampaign.message}
                />
              )}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Campaign Name</th>
                      <th>Campaign Remarks</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listedCampaign.map((allCompany, indexNum) => {
                      return (
                        <tr key={indexNum}>
                          <td>{allCompany.campaignName}</td>
                          <td>{allCompany.campaignRemarks}</td>
                          <td>
                            <Link
                              className="edit_this d-block text-center"
                              to="/view-campaigns"
                              state={{ getThisCamp: allCompany }}
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

export default CampaignsData;
