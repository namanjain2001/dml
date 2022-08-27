import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/Loader";
import { listCompanyAction } from "../../actions/dashboardAction";
import {
  updateCampaignAction,
  deleteCampaignAction,
} from "../../actions/campaignsAction";
import Alert from "../../components/shared/Alert";

const ViewCampaigns = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { getThisCamp } = location.state;
  const [addSelectVal, setAddSelectVal] = useState(null);

  const updateCampaignReducer = useSelector(
    (store) => store.updateCampaignReducer
  );

  const deleteCampaignReducer = useSelector(
    (store) => store.deleteCampaignReducer
  );

  const { loading, error, updateCampaign } = updateCampaignReducer;
  const {
    loading: deleteLoading,
    error: deleteError,
    deleteCampaign,
  } = deleteCampaignReducer;

  const listCompanyReducer = useSelector((store) => store.listCompanyReducer);
  const { loading: listCamLoader, listedCompany } = listCompanyReducer;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      chooseCompany: getThisCamp.companyObjId,
      companyName: getThisCamp.campaignName,
      campaignRemarks: getThisCamp.campaignRemarks,
    },
  });

  const updateCampaignSubmit = (data) => {
    const { chooseCompany, companyName, campaignRemarks } = data;
    dispatch(
      updateCampaignAction(
        chooseCompany,
        companyName,
        campaignRemarks,
        getThisCamp._id
      )
    );
  };

  const userLoginReducer = useSelector((store) => store.userLoginReducer);
  const { loginUser } = userLoginReducer;
  useEffect(() => {
    setAddSelectVal(getThisCamp.companyObjId);
    if (!loginUser) {
      navigate("/");
    }
    dispatch(listCompanyAction());
    if (updateCampaign) {
      setTimeout(() => {
        navigate("/campaigns");
      }, 1500);
    }
    if (deleteCampaign) {
      navigate("/campaigns");
    }
  }, [loginUser, updateCampaign, deleteCampaign]);

  return (
    <React.Fragment>
      {loading && <Loader />}
      {deleteLoading && <Loader />}
      <section className="dashboard_main">
        <div className="row mx-0">
          <SideBar />
          <div className="dashboardData p-4">
            <div className="view_company">
              <div className="dashboardData_header d-flex flex-wrap justify-content-between">
                <div className="dashboardData_heading">
                  <h3 className="border-bottom pb-3 mb-5">
                    Campaign Name :
                    <span style={{ color: "#fa5252" }}>
                      &nbsp;{getThisCamp.campaignName}
                    </span>
                  </h3>
                </div>
                <div className="deleteCampaign">
                  <button
                    className="linkStyleBtn text-danger border-0"
                    onClick={() =>
                      dispatch(deleteCampaignAction(getThisCamp._id))
                    }
                  >
                    <i className="material-symbols-outlined">delete</i> Delete
                    this company
                  </button>
                </div>
              </div>

              <div className="custom_form_style">
                {updateCampaign && (
                  <Alert
                    variant={"alert-success mt-0 mb-4"}
                    children={updateCampaign.message}
                  />
                )}
                {error && (
                  <Alert variant={"alert-danger mt-0 mb-4"} children={error} />
                )}
                {deleteError && (
                  <Alert variant={"alert-danger mt-0 mb-4"} children={error} />
                )}
                <form onSubmit={handleSubmit(updateCampaignSubmit)}>
                  <div className="form-group mb-3">
                    <label
                      htmlFor="chooseCompany"
                      className="form-label fw-semibold"
                    >
                      Choose company
                    </label>
                    <select
                      id="chooseCompany"
                      className={`form-select${
                        errors.chooseCompany ? " is-invalid" : ""
                      }`}
                      value={addSelectVal}
                      {...register("chooseCompany", {
                        onChange: (e) => setAddSelectVal(e.target.value),
                        required: "This field is required",
                      })}
                    >
                      {listCamLoader ? (
                        <option disabled>Loading...</option>
                      ) : (
                        listedCompany.map((allListedCom, indexNumber) => {
                          return (
                            <React.Fragment key={indexNumber}>
                              <option value={allListedCom._id}>
                                {allListedCom.companyName}
                              </option>
                            </React.Fragment>
                          );
                        })
                      )}
                    </select>
                    {errors.chooseCompany && (
                      <div className="invalid-feedback">
                        {errors.chooseCompany.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label
                      htmlFor="campaignName"
                      className="form-label fw-semibold"
                    >
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      id="campaignName"
                      className={`form-control${
                        errors.campaignName ? " is-invalid" : ""
                      }`}
                      {...register("companyName", {
                        required: "This field is required",
                      })}
                    />
                    {errors.campaignName && (
                      <div className="invalid-feedback">
                        {errors.campaignName.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label
                      htmlFor="campaignRemarks"
                      className="form-label fw-semibold"
                    >
                      Campaign Remarks
                    </label>
                    <input
                      type="text"
                      id="campaignRemarks"
                      className={`form-control${
                        errors.campaignRemarks ? " is-invalid" : ""
                      }`}
                      {...register("campaignRemarks", {
                        required: "This field is required",
                      })}
                    />
                    {errors.campaignRemarks && (
                      <div className="invalid-feedback">
                        {errors.campaignRemarks.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group d-flex flex-wrap justify-content-end pt-4">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        navigate("/campaigns");
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="ms-2 btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ViewCampaigns;
