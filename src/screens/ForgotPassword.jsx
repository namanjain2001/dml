/********
 *
 * FORGOT PASSWORD SCREEN
 *
 *
 * **********/

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userForgetPasswordInitiateAction } from "../actions/userAction";
import Loader from "../components/shared/Loader";
import Alert from "../components/shared/Alert";
import { USER_NEW_PASSWORD_RESET } from "../constants/userConstant";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userForgetPasswordInitiateReducer = useSelector(
    (store) => store.userForgetPasswordInitiateReducer
  );
  const { loading, error, forgotPasswordInitiated } =
    userForgetPasswordInitiateReducer;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const ForgetPasswordSubmit = (data) => {
    if (data) {
      dispatch(userForgetPasswordInitiateAction(data.forgetEmail));
    }
  };

  useEffect(() => {
    dispatch({ type: USER_NEW_PASSWORD_RESET });
    if (userForgetPasswordInitiateReducer) {
      if (forgotPasswordInitiated) {
        navigate("/verify-forgot-password");
      }
    }
  }, [userForgetPasswordInitiateReducer]);

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
                    <form onSubmit={handleSubmit(ForgetPasswordSubmit)}>
                      <div className="form-group mb-3">
                        <label
                          htmlFor="forgetEmail"
                          className="form-label fw-semibold"
                        >
                          Email Your Registered Email Address
                        </label>
                        <input
                          type="email"
                          id="forgetEmail"
                          placeholder="Enter email"
                          className={`form-control${
                            errors.forgetEmail ? " is-invalid" : ""
                          }`}
                          {...register("forgetEmail", {
                            required: "This feild is required",
                            pattern: {
                              value:
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                              message: "Please enter a valid email address.",
                            },
                          })}
                        />
                        {errors.forgetEmail && (
                          <div className="invalid-feedback">
                            {errors.forgetEmail.message}
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
                  {error && <Alert variant="alert-danger" children={error} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ForgotPassword;
