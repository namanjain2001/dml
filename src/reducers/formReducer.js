import {
  LIST_FORM_REQUEST,
  LIST_FORM_SUCCESS,
  LIST_FORM_FAILED,
} from "../constants/formConstant";

export const listFormReducer = (state = { listedForm: [] }, action) => {
  switch (action.type) {
    case LIST_FORM_REQUEST:
      return {
        loading: true,
        listedForm: [],
      };
    case LIST_FORM_SUCCESS:
      return {
        loading: false,
        listedForm: action.payload,
      };
    case LIST_FORM_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
