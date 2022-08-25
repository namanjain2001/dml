import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCompanyAction } from "../actions/dashboardAction";
import Loader from "./shared/Loader";
import Alert from "./shared/Alert";
import { useNavigate } from "react-router-dom";

const AddCompanyData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addCompanyReducer = useSelector((store) => store.addCompanyReducer);

  const { loading, error, addedCompany } = addCompanyReducer;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const addCompanySubmit = async (data) => {
    const { companyName, website, companyAddress, companyEmail, companyPhone } =
      data;
    dispatch(
      addCompanyAction(
        companyName,
        website,
        companyAddress,
        companyEmail,
        companyPhone
      )
    );

    reset();
  };

  useEffect(() => {
    if (addedCompany) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  }, [addedCompany]);

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
          {addedCompany && (
            <Alert
              variant={"alert-success mt-0 mb-4"}
              children={addedCompany.message}
            />
          )}
          {error && (
            <Alert variant={"alert-danger mt-0 mb-4"} children={error} />
          )}
          <form onSubmit={handleSubmit(addCompanySubmit)}>
            <div className="form-group mb-3">
              <label htmlFor="companyName" className="form-label fw-semibold">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className={`form-control${
                  errors.companyName ? " is-invalid" : ""
                }`}
                {...register("companyName", {
                  required: "This field is required",
                })}
              />
              {errors.companyName && (
                <div className="invalid-feedback">
                  {errors.companyName.message}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="website" className="form-label fw-semibold">
                Website
              </label>
              <input
                type="text"
                id="website"
                className={`form-control${errors.website ? " is-invalid" : ""}`}
                {...register("website", {
                  required: "This field is required",
                })}
              />
              {errors.website && (
                <div className="invalid-feedback">{errors.website.message}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label
                htmlFor="companyAddress"
                className="form-label fw-semibold"
              >
                Address
              </label>
              <input
                type="text"
                id="companyAddress"
                className={`form-control${
                  errors.companyAddress ? " is-invalid" : ""
                }`}
                {...register("companyAddress", {
                  required: "This field is required",
                })}
              />
              {errors.companyAddress && (
                <div className="invalid-feedback">
                  {errors.companyAddress.message}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="companyEmail" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                id="companyEmail"
                className={`form-control${
                  errors.companyEmail ? " is-invalid" : ""
                }`}
                {...register("companyEmail", {
                  required: "This field is required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.companyEmail && (
                <div className="invalid-feedback">
                  {errors.companyEmail.message}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="companyPhone" className="form-label fw-semibold">
                Phone
              </label>
              <input
                type="number"
                id="companyPhone"
                className={`form-control${
                  errors.companyPhone ? " is-invalid" : ""
                }`}
                {...register("companyPhone", {
                  required: "This field is required",
                })}
              />
              {errors.companyPhone && (
                <div className="invalid-feedback">
                  {errors.companyPhone.message}
                </div>
              )}
            </div>

            <div className="form-group d-flex flex-wrap justify-content-end pt-4">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  navigate("/dashboard");
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

export default AddCompanyData;
