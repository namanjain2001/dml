import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_FORGET_PASSWORD_INITIATE_REQUEST,
  USER_FORGET_PASSWORD_INITIATE_SUCCESS,
  USER_FORGET_PASSWORD_INITIATE_FAILED,
  USER_FORGET_PASSWORD_INITIATE_RESET,
  USER_NEW_PASSWORD_REQUEST,
  USER_NEW_PASSWORD_SUCCESS,
  USER_NEW_PASSWORD_FAILED,
  USER_NEW_PASSWORD_RESET,
} from "../constants/userConstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        loginUser: action.payload,
      };
    case USER_LOGIN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return (state = {});
    default:
      return state;
  }
};

export const userForgetPasswordInitiateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGET_PASSWORD_INITIATE_REQUEST:
      return {
        loading: true,
      };
    case USER_FORGET_PASSWORD_INITIATE_SUCCESS:
      return {
        loading: false,
        forgotPasswordInitiated: action.payload,
      };
    case USER_FORGET_PASSWORD_INITIATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_FORGET_PASSWORD_INITIATE_RESET:
      return (state = {});
    default:
      return state;
  }
};

export const userNewPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NEW_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case USER_NEW_PASSWORD_SUCCESS:
      return {
        loading: false,
        userNewPassword: action.payload,
      };
    case USER_NEW_PASSWORD_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_NEW_PASSWORD_RESET:
      return (state = {});
    default:
      return state;
  }
};
