import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/Loader";
import {
  updateCompanyAction,
  deleteCompanyAction,
} from "../../actions/dashboardAction";
import Alert from "../../components/shared/Alert";

const ViewCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { getThisComp } = location.state;

  const updateCompanyReducer = useSelector(
    (store) => store.updateCompanyReducer
  );

  const deleteCompanyReducer = useSelector(
    (store) => store.deleteCompanyReducer
  );

  const { loading, error, updateCompany } = updateCompanyReducer;
  const {
    loading: deleteLoading,
    error: deleteError,
    deleteCompany,
  } = deleteCompanyReducer;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      companyName: getThisComp.companyName,
      website: getThisComp.website,
      companyAddress: getThisComp.address,
      companyEmail: getThisComp.email,
      companyPhone: getThisComp.phone,
    },
  });

  const updateCompanySubmit = (data) => {
    const { companyName, website, companyAddress, companyEmail, companyPhone } =
      data;
    dispatch(
      updateCompanyAction(
        companyName,
        website,
        companyAddress,
        companyEmail,
        companyPhone,
        getThisComp._id
      )
    );
  };

  useEffect(() => {
    if (updateCompany) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
    if (deleteCompany) {
      navigate("/dashboard");
    }
  }, [updateCompany, deleteCompany]);

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
                    Company Name :
                    <span style={{ color: "#fa5252" }}>
                      &nbsp;{getThisComp.companyName}
                    </span>
                  </h3>
                </div>
                <div className="deleteCompany">
                  <button
                    className="linkStyleBtn text-danger border-0"
                    onClick={() =>
                      dispatch(deleteCompanyAction(getThisComp._id))
                    }
                  >
                    <i className="material-symbols-outlined">delete</i> Delete
                    this company
                  </button>
                </div>
              </div>

              <div className="custom_form_style">
                {updateCompany && (
                  <Alert
                    variant={"alert-success mt-0 mb-4"}
                    children={updateCompany.message}
                  />
                )}

                {error && (
                  <Alert variant={"alert-danger mt-0 mb-4"} children={error} />
                )}

                {deleteError && (
                  <Alert variant={"alert-danger mt-0 mb-4"} children={error} />
                )}

                <form onSubmit={handleSubmit(updateCompanySubmit)}>
                  <div className="form-group mb-3">
                    <label
                      htmlFor="companyName"
                      className="form-label fw-semibold"
                    >
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
                      className={`form-control${
                        errors.website ? " is-invalid" : ""
                      }`}
                      {...register("website", {
                        required: "This field is required",
                      })}
                    />
                    {errors.website && (
                      <div className="invalid-feedback">
                        {errors.website.message}
                      </div>
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
                    <label
                      htmlFor="companyEmail"
                      className="form-label fw-semibold"
                    >
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
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
                    <label
                      htmlFor="companyPhone"
                      className="form-label fw-semibold"
                    >
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

export default ViewCompany;
