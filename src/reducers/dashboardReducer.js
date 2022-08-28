import {
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILED,
  ADD_COMPANY_RESET,
  LIST_COMPANY_REQUEST,
  LIST_COMPANY_SUCCESS,
  LIST_COMPANY_FAILED,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILED,
  UPDATE_COMPANY_RESET,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAILED,
  DELETE_COMPANY_RESET,
  LIST_ROLE_REQUEST,
  LIST_ROLE_SUCCESS,
  LIST_ROLE_FAILED,
} from "../constants/dashboardConstants";

export const addCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMPANY_REQUEST:
      return {
        loading: true,
      };
    case ADD_COMPANY_SUCCESS:
      return {
        loading: false,
        addedCompany: action.payload,
      };
    case ADD_COMPANY_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_COMPANY_RESET:
      return (state = {});
    default:
      return state;
  }
};

export const listCompanyReducer = (state = { listedCompany: [] }, action) => {
  switch (action.type) {
    case LIST_COMPANY_REQUEST:
      return {
        loading: true,
        listedCompany: [],
      };
    case LIST_COMPANY_SUCCESS:
      return {
        loading: false,
        listedCompany: action.payload,
      };
    case LIST_COMPANY_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COMPANY_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_COMPANY_SUCCESS:
      return {
        loading: false,
        updateCompany: action.payload,
      };
    case UPDATE_COMPANY_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_COMPANY_RESET:
      return (state = {});
    default:
      return state;
  }
};

export const deleteCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMPANY_REQUEST:
      return {
        loading: true,
      };
    case DELETE_COMPANY_SUCCESS:
      return {
        loading: false,
        deleteCompany: action.payload,
      };
    case DELETE_COMPANY_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_COMPANY_RESET:
      return (state = {});
    default:
      return state;
  }
};

export const roleReducer = (state = { userRole: [] }, action) => {
  switch (action.type) {
    case LIST_ROLE_REQUEST:
      return {
        loading: true,
        userRole: [],
      };
    case LIST_ROLE_SUCCESS:
      return {
        loading: false,
        userRole: action.payload,
      };
    case LIST_ROLE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
