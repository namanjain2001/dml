import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCampaignAction } from "../../actions/campaignsAction";
import { listCompanyAction } from "../../actions/dashboardAction";
import Loader from "../shared/Loader";
import Alert from "../shared/Alert";
import { useNavigate } from "react-router-dom";

const AddCampaignsData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addCampaignReducer = useSelector((store) => store.addCampaignReducer);

  const { loading, error, addedCampaign } = addCampaignReducer;

  const listCompanyReducer = useSelector((store) => store.listCompanyReducer);
  const { loading: listCamLoader, listedCompany } = listCompanyReducer;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const addCampaignSubmit = async (data) => {
    const { chooseCompany, companyName, campaignRemarks } = data;
    dispatch(addCampaignAction(chooseCompany, companyName, campaignRemarks));

    reset();
  };

  useEffect(() => {
    dispatch(listCompanyAction());
    if (addedCampaign) {
      setTimeout(() => {
        navigate("/campaigns");
      }, 1500);
    }
  }, [dispatch, addedCampaign]);

  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className="addCompany addData_section">
        <div className="dashboardData_header">
          <div className="dashboardData_heading">
            <h3 className="border-bottom pb-3 mb-5">Add new company</h3>
          </div>
        </div>
        <div className="custom_form_style">
          {addedCampaign && (
            <Alert
              variant={"alert-success mt-0 mb-4"}
              children={addedCampaign.message}
            />
          )}
          {error && (
            <Alert variant={"alert-danger mt-0 mb-4"} children={error} />
          )}
          <form onSubmit={handleSubmit(addCampaignSubmit)}>
            <div className="form-group mb-3">
              <label htmlFor="chooseCompany" className="form-label fw-semibold">
                Choose company
              </label>
              <select
                id="chooseCompany"
                className={`form-select${
                  errors.chooseCompany ? " is-invalid" : ""
                }`}
                {...register("chooseCompany", {
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
              <label htmlFor="campaignName" className="form-label fw-semibold">
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
                Add Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddCampaignsData;
