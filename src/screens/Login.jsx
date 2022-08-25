/********
 *
 * LOGIN SCREEN
 *
 *
 * **********/

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../actions/userAction";
import Loader from "../components/shared/Loader";
import Alert from "../components/shared/Alert";
import {
  USER_FORGET_PASSWORD_INITIATE_RESET,
  USER_NEW_PASSWORD_RESET,
} from "../constants/userConstant";

const Login = () => {
  const [showHidePassword, setShowHidePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoginReducer = useSelector((store) => store.userLoginReducer);
  const { loading, error, loginUser } = userLoginReducer;

  const userNewPasswordReducer = useSelector(
    (store) => store.userNewPasswordReducer
  );
  const { userNewPassword } = userNewPasswordReducer;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const LoginSubmit = (data) => {
    if (data) {
      const { loginEmail, loginPassword } = data;
      console.log(loginEmail, loginPassword);
      dispatch(userLoginAction(loginEmail, loginPassword));
    }
  };

  useEffect(() => {
    dispatch({ type: USER_FORGET_PASSWORD_INITIATE_RESET });
    window.localStorage.removeItem("forget_passwordUserInitiated");
    if (loginUser) {
      navigate("/dashboard");
    }

    if (userNewPassword) {
      setTimeout(() => {
        dispatch({ type: USER_NEW_PASSWORD_RESET });
      }, 1500);
    }
  }, [loginUser, userNewPassword]);

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
                  <h1 className="heading_main mb-0">Login</h1>
                  {userNewPassword && (
                    <Alert
                      variant="alert-success my-3"
                      children={userNewPassword.message}
                    />
                  )}
                  <div className="custom_form_style p-3 mt-3">
                    <form onSubmit={handleSubmit(LoginSubmit)}>
                      <div className="form-group mb-3">
                        <label
                          htmlFor="loginEmail"
                          className="form-label fw-semibold"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="loginEmail"
                          placeholder="Enter email"
                          className={`form-control${
                            errors.loginEmail ? " is-invalid" : ""
                          }`}
                          {...register("loginEmail", {
                            required: "This feild is required",
                            pattern: {
                              value:
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                              message: "Please enter a valid email address.",
                            },
                          })}
                        />
                        {errors.loginEmail && (
                          <div className="invalid-feedback">
                            {errors.loginEmail.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group mb-4 position-relative">
                        <label
                          htmlFor="loginPassword"
                          className="form-label fw-semibold"
                        >
                          Password
                        </label>
                        <input
                          type={showHidePassword ? "text" : "password"}
                          id="loginPassword"
                          placeholder="Enter password"
                          className={`form-control${
                            errors.loginPassword ? " is-invalid" : ""
                          }`}
                          {...register("loginPassword", {
                            required: "This feild is required",
                          })}
                        />
                        <i
                          className="material-symbols-outlined showHidePassword text-muted"
                          onClick={() => setShowHidePassword(!showHidePassword)}
                        >
                          {showHidePassword ? "visibility_off" : "visibility"}
                        </i>
                        {errors.loginPassword && (
                          <div className="invalid-feedback">
                            {errors.loginPassword.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary w-100">
                          Login
                        </button>
                        <Link
                          to="/forget-password"
                          className="textPrimary fw-bold mt-3 d-block"
                        >
                          Forgot?
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

export default Login;
