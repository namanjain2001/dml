/********
 *
 * VERIFY USER AND SET NEW PASSWORD SCREEN
 *
 *
 * **********/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import Alert from "../components/shared/Alert";
import { userNewPasswordAction } from "../actions/userAction";

const ForgotPasswordOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [cShowHidePassword, setCShowHidePassword] = useState(false);
  const [matchedPassword, setMatchedPassword] = useState(false);

  const userForgetPasswordInitiateReducer = useSelector(
    (store) => store.userForgetPasswordInitiateReducer
  );
  const { forgotPasswordInitiated } = userForgetPasswordInitiateReducer;

  const userNewPasswordReducer = useSelector(
    (store) => store.userNewPasswordReducer
  );
  const { loading, error, userNewPassword } = userNewPasswordReducer;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const ForgotPasswordOTPSubmit = (data) => {
    const {
      OTP_digit1,
      OTP_digit2,
      OTP_digit3,
      OTP_digit4,
      OTP_digit5,
      OTP_digit6,
      newPassword,
      confirmNewPassword,
    } = data;
    const OTP =
      OTP_digit1 +
      OTP_digit2 +
      OTP_digit3 +
      OTP_digit4 +
      OTP_digit5 +
      OTP_digit6;
    if (newPassword === confirmNewPassword) {
      setMatchedPassword(false);
      dispatch(userNewPasswordAction(OTP, newPassword));
    } else {
      setMatchedPassword(true);
    }
  };

  useEffect(() => {
    if (!forgotPasswordInitiated) {
      navigate("/forget-password");
    }
    if (userNewPassword) {
      navigate("/");
    }
  }, [forgotPasswordInitiated, userNewPassword]);

  return (
    <React.Fragment>
      {loading && <Loader />}
      <section className="login_section">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="login_image border">
                <img src="assets/img/login.webp" alt="login" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="login_form d-flex flex-wrap justify-content-center">
                <div className="login_form_cont">
                  <h1 className="heading_main mb-0">Forgot your Password?</h1>
                  <div className="custom_form_style p-3 mt-3">
                    <form onSubmit={handleSubmit(ForgotPasswordOTPSubmit)}>
                      <div className="verify_otp_forgotPassword">
                        <div className="form-group mb-4">
                          <div className="row">
                            <div className="col-md-12">
                              <label className="form-label fw-semibold">
                                Enter OTP
                              </label>
                            </div>
                            <div className="col-2">
                              <input
                                type="number"
                                maxLength="1"
                                className={`form-control${
                                  errors.OTP_digit1 ? " is-invalid" : ""
                                }`}
                                {...register("OTP_digit1", {
                                  required: true,
                                })}
                              />
                              <span className="OTP_seperator">-</span>
                            </div>
                            <div className="col-2">
                              <input
                                type="number"
                                maxLength="1"
                                className={`form-control${
                                  errors.OTP_digit2 ? " is-invalid" : ""
                                }`}
                                {...register("OTP_digit2", {
                                  required: true,
                                })}
                              />
                              <span className="OTP_seperator">-</span>
                            </div>
                            <div className="col-2">
                              <input
                                type="number"
                                maxLength="1"
                                className={`form-control${
                                  errors.OTP_digit3 ? " is-invalid" : ""
                                }`}
                                {...register("OTP_digit3", {
                                  required: true,
                                })}
                              />
                              <span className="OTP_seperator">-</span>
                            </div>
                            <div className="col-2">
                              <input
                                type="number"
                                maxLength="1"
                                className={`form-control${
                                  errors.OTP_digit4 ? " is-invalid" : ""
                                }`}
                                {...register("OTP_digit4", {
                                  required: true,
                                })}
                              />
                              <span className="OTP_seperator">-</span>
                            </div>
                            <div className="col-2">
                              <input
                                type="number"
                                maxLength="1"
                                className={`form-control${
                                  errors.OTP_digit5 ? " is-invalid" : ""
                                }`}
                                {...register("OTP_digit5", {
                                  required: true,
                                })}
                              />
                              <span className="OTP_seperator">-</span>
                            </div>
                            <div className="col-2">
                              <input
                                type="number"
                                maxLength="1"
                                className={`form-control${
                                  errors.OTP_digit6 ? " is-invalid" : ""
                                }`}
                                {...register("OTP_digit6", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-4 position-relative">
                        <label
                          htmlFor="newPassword"
                          className="form-label fw-semibold"
                        >
                          Enter Your New Password
                        </label>
                        <input
                          type={showHidePassword ? "text" : "password"}
                          id="newPassword"
                          placeholder="Enter password"
                          className={`form-control${
                            errors.newPassword ? " is-invalid" : ""
                          }`}
                          {...register("newPassword", {
                            required: "This feild is required",
                          })}
                        />
                        <i
                          className="material-symbols-outlined showHidePassword text-muted"
                          onClick={() => setShowHidePassword(!showHidePassword)}
                        >
                          {showHidePassword ? "visibility_off" : "visibility"}
                        </i>
                        {errors.newPassword && (
                          <div className="invalid-feedback">
                            {errors.newPassword.message}
                          </div>
                        )}
                      </div>

                      <div className="form-group mb-4 position-relative">
                        <label
                          htmlFor="confirmNewPassword"
                          className="form-label fw-semibold"
                        >
                          Re-enter Your New Password
                        </label>
                        <input
                          type={cShowHidePassword ? "text" : "password"}
                          id="confirmNewPassword"
                          placeholder="Confirm password"
                          className={`form-control${
                            errors.confirmNewPassword ? " is-invalid" : ""
                          }`}
                          {...register("confirmNewPassword", {
                            required: "This feild is required",
                          })}
                        />
                        <i
                          className="material-symbols-outlined showHidePassword text-muted"
                          onClick={() =>
                            setCShowHidePassword(!cShowHidePassword)
                          }
                        >
                          {cShowHidePassword ? "visibility_off" : "visibility"}
                        </i>
                        {errors.confirmNewPassword && (
                          <div className="invalid-feedback">
                            {errors.confirmNewPassword.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary w-100">
                          Submit
                        </button>
                        <Link
                          to="/"
                          className="textPrimary fw-bold mt-3 d-block"
                        >
                          Go Back to Login
                        </Link>
                      </div>
                    </form>
                  </div>
                  {error && (
                    <Alert variant={"alert-danger mt-4"} children={error} />
                  )}
                  {matchedPassword && (
                    <Alert variant={"alert-danger mt-4"}>
                      Password and Confirm password must be same.
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ForgotPasswordOTP;
