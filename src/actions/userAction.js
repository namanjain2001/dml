import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_FORGET_PASSWORD_INITIATE_REQUEST,
  USER_FORGET_PASSWORD_INITIATE_SUCCESS,
  USER_FORGET_PASSWORD_INITIATE_FAILED,
  USER_NEW_PASSWORD_REQUEST,
  USER_NEW_PASSWORD_SUCCESS,
  USER_NEW_PASSWORD_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
} from "../constants/userConstant";

import axios from "axios";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.type === 1) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfoDML", JSON.stringify(data.data[0]));
    } else {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error,
    });
  }
};

export const userForgetPasswordInitiateAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGET_PASSWORD_INITIATE_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/resetInitiate`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.type === 1) {
      dispatch({
        type: USER_FORGET_PASSWORD_INITIATE_SUCCESS,
        payload: data,
      });

      localStorage.setItem(
        "forget_passwordUserInitiated",
        JSON.stringify(data.data)
      );
    } else {
      dispatch({
        type: USER_FORGET_PASSWORD_INITIATE_FAILED,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_FORGET_PASSWORD_INITIATE_FAILED,
      payload: error,
    });
  }
};

export const userNewPasswordAction =
  (OTP, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_NEW_PASSWORD_REQUEST });

      const { userForgetPasswordInitiateReducer } = getState();
      const { forgotPasswordInitiated } = userForgetPasswordInitiateReducer;

      let token = forgotPasswordInitiated.data[0].r;

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/restPassword`,
        {
          OTP,
          password,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.type === 1) {
        dispatch({
          type: USER_NEW_PASSWORD_SUCCESS,
          payload: data,
        });
      } else {
        console.log("2", data);
        dispatch({
          type: USER_NEW_PASSWORD_FAILED,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_NEW_PASSWORD_FAILED,
        payload: "Something went worng. Please try again.",
      });
    }
  };

export const addUserAction =
  (name, phone, email, password, profilePic, companyObjId, roleObjId) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_USER_REQUEST });

      const { userLoginReducer } = getState();
      const { loginUser } = userLoginReducer;

      let token = loginUser.r || loginUser.data[0].r;

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/signup`,
        {
          name,
          phone,
          email,
          password,
          profilePic,
          companyObjId,
          roleObjId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (data.type === 1) {
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: CREATE_USER_FAILED,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILED,
        payload: error,
      });
    }
  };
