import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { listCompanyAction, roleAction } from "../../actions/dashboardAction";
import { addUserAction } from "../../actions/userAction";
import imageToBase64 from "image-to-base64/browser";
import Loader from "../shared/Loader";
import Alert from "../shared/Alert";
import { CREATE_USER_RESET } from "../../constants/userConstant";

const UsersData = () => {
  const dispatch = useDispatch();

  const roleReducer = useSelector((store) => store.roleReducer);

  const { loading, error, userRole } = roleReducer;

  const listCompanyReducer = useSelector((store) => store.listCompanyReducer);
  const {
    loading: listCamLoader,
    error: listCamError,
    listedCompany,
  } = listCompanyReducer;

  const addUserReducer = useSelector((store) => store.addUserReducer);

  const {
    loading: addedUserLoading,
    error: addedUserError,
    addedUser,
  } = addUserReducer;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const addUserSubmit = async (data) => {
    //console.log(data);
    const {
      addUserEmail,
      addUserName,
      addUserPP,
      addUserPassword,
      addUserPhone,
      userChooseCompany,
      userSelectRole,
    } = data;
    let profilePicBaseURL = await imageToBase64(addUserPP);
    //console.log(profilePicBaseURL);
    dispatch(
      addUserAction(
        addUserName,
        addUserPhone,
        addUserEmail,
        addUserPassword,
        profilePicBaseURL,
        userChooseCompany,
        userSelectRole
      )
    );
    reset();
  };

  useEffect(() => {
    dispatch(listCompanyAction());
    dispatch(roleAction());
    if (addedUser) {
      setTimeout(() => {
        dispatch({ type: CREATE_USER_RESET });
      }, 1500);
    }
  }, [dispatch, addedUser]);

  return (
    <React.Fragment>
      {addedUserLoading && <Loader />}
      <div className="dashboardData p-4 campaignsData">
        <div className="dashboardData_header d-flex flex-wrap justify-content-between align-items-center">
          <div className="dashboardData_heading">
            <h3>Add user</h3>
          </div>
        </div>

        <div className="dashboardData_cont">
          {addedUser && (
            <Alert variant="alert-success my-4" children={addedUser.message} />
          )}
          {addedUserError && (
            <Alert variant="alert-danger my-4" children={addedUserError} />
          )}
          <div className="custom_form_style mt-5">
            <form onSubmit={handleSubmit(addUserSubmit)}>
              <div className="form-group mb-3">
                <label htmlFor="addUserName" className="form-label fw-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="addUserName"
                  className={`form-control${
                    errors.addUserName ? " is-invalid" : ""
                  }`}
                  {...register("addUserName", {
                    required: "This feild is required",
                  })}
                />
                {errors.addUserName && (
                  <div className="invalid-feedback">
                    {errors.addUserName.message}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="addUserPhone"
                  className="form-label fw-semibold"
                >
                  Phone
                </label>
                <input
                  type="number"
                  id="addUserPhone"
                  className={`form-control${
                    errors.addUserPhone ? " is-invalid" : ""
                  }`}
                  {...register("addUserPhone", {
                    required: "This feild is required",
                  })}
                />
                {errors.addUserPhone && (
                  <div className="invalid-feedback">
                    {errors.addUserPhone.message}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="addUserEmail"
                  className="form-label fw-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="addUserEmail"
                  className={`form-control${
                    errors.addUserEmail ? " is-invalid" : ""
                  }`}
                  {...register("addUserEmail", {
                    required: "This feild is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.addUserEmail && (
                  <div className="invalid-feedback">
                    {errors.addUserEmail.message}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="addUserPassword"
                  className="form-label fw-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="addUserPassword"
                  className={`form-control${
                    errors.addUserPassword ? " is-invalid" : ""
                  }`}
                  {...register("addUserPassword", {
                    required: "This feild is required",
                  })}
                />
                {errors.addUserPassword && (
                  <div className="invalid-feedback">
                    {errors.addUserPassword.message}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="addUserPP" className="form-label fw-semibold">
                  Upload profile picture
                </label>
                <input
                  type="file"
                  id="addUserPP"
                  className={`form-control${
                    errors.addUserPP ? " is-invalid" : ""
                  }`}
                  {...register("addUserPP", {
                    required: "This feild is required",
                  })}
                />
                {errors.addUserPP && (
                  <div className="invalid-feedback">
                    {errors.addUserPP.message}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="userChooseCompany"
                  className="form-label fw-semibold"
                >
                  Choose company
                </label>
                <select
                  id="userChooseCompany"
                  className={`form-select${
                    errors.userChooseCompany ? " is-invalid" : ""
                  }`}
                  {...register("userChooseCompany", {
                    required: "This field is required",
                  })}
                >
                  {listCamLoader ? (
                    <option disabled>Loading</option>
                  ) : listCamError ? (
                    <option disabled>
                      Something went wrong. Please try again later
                    </option>
                  ) : (
                    listedCompany.map((allListedCom, allListedComIndex) => {
                      return (
                        <React.Fragment key={allListedComIndex}>
                          <option value={allListedCom._id}>
                            {allListedCom.companyName}
                          </option>
                        </React.Fragment>
                      );
                    })
                  )}
                </select>
                {errors.userChooseCompany && (
                  <div className="invalid-feedback">
                    {errors.userChooseCompany.message}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="userSelectRole"
                  className="form-label fw-semibold"
                >
                  Choose Role
                </label>
                <select
                  id="userSelectRole"
                  className={`form-select${
                    errors.userSelectRole ? " is-invalid" : ""
                  }`}
                  {...register("userSelectRole", {
                    required: "This field is required",
                  })}
                >
                  {loading ? (
                    <option disabled>Loading</option>
                  ) : error ? (
                    <option disabled>
                      Something went wrong. Please try again later
                    </option>
                  ) : (
                    userRole.map((allRoles, roleIndex) => {
                      return (
                        <React.Fragment key={roleIndex}>
                          <option value={allRoles._id}>
                            {allRoles.roleName}
                          </option>
                        </React.Fragment>
                      );
                    })
                  )}
                </select>
                {errors.userSelectRole && (
                  <div className="invalid-feedback">
                    {errors.userSelectRole.message}
                  </div>
                )}
              </div>
              <div className="form-group d-flex flex-wrap justify-content-end pt-4">
                <button type="submit" className="btn btn-primary">
                  Add user
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UsersData;
