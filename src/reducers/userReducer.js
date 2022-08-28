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
  // LIST_USER_REQUEST,
  // LIST_USER_SUCCESS,
  // LIST_USER_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  CREATE_USER_RESET,
  // UPDATE_USER_REQUEST,
  // UPDATE_USER_SUCCESS,
  // UPDATE_USER_FAILED,
  // UPDATE_USER_RESET,
  // DELETE_USER_REQUEST,
  // DELETE_USER_SUCCESS,
  // DELETE_USER_FAILED,
  // DELETE_USER_RESET,
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

// export const showUserReducer = (state = { showUsers: [] }, action) => {
//   switch (action.type) {
//     case LIST_USER_REQUEST:
//       return {
//         loading: true,
//         showUsers: [],
//       };
//     case LIST_USER_SUCCESS:
//       return {
//         loading: false,
//         showUsers: action.payload,
//       };
//     case LIST_USER_FAILED:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

export const addUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        addedUser: action.payload,
      };
    case CREATE_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_USER_RESET:
      return (state = {});
    default:
      return state;
  }
};

// export const updateUserReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_USER_REQUEST:
//       return {
//         loading: true,
//       };
//     case UPDATE_USER_SUCCESS:
//       return {
//         loading: false,
//         updateUser: action.payload,
//       };
//     case UPDATE_USER_FAILED:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case UPDATE_USER_RESET:
//       return (state = {});
//     default:
//       return state;
//   }
// };

// export const deleteUserReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_USER_REQUEST:
//       return {
//         loading: true,
//       };
//     case DELETE_USER_SUCCESS:
//       return {
//         loading: false,
//         deleteUser: action.payload,
//       };
//     case DELETE_USER_FAILED:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_USER_RESET:
//       return (state = {});
//     default:
//       return state;
//   }
// };
