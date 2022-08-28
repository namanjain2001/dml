import {
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILED,
  LIST_COMPANY_REQUEST,
  LIST_COMPANY_SUCCESS,
  LIST_COMPANY_FAILED,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILED,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAILED,
  LIST_ROLE_REQUEST,
  LIST_ROLE_SUCCESS,
  LIST_ROLE_FAILED,
} from "../constants/dashboardConstants";
import axios from "axios";

export const addCompanyAction =
  (companyName, website, address, email, phone) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_COMPANY_REQUEST });

      const { userLoginReducer } = getState();
      const { loginUser } = userLoginReducer;

      let token = loginUser.r || loginUser.data[0].r;

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/company/save`,
        {
          companyName,
          website,
          address,
          email,
          phone,
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
          type: ADD_COMPANY_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: ADD_COMPANY_FAILED,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_COMPANY_FAILED,
        payload: error,
      });
    }
  };

export const listCompanyAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_COMPANY_REQUEST });

    const { userLoginReducer } = getState();
    const { loginUser } = userLoginReducer;

    let token = loginUser.r || loginUser.data[0].r;

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/company/read`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (data.type === 1) {
      dispatch({
        type: LIST_COMPANY_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: LIST_COMPANY_FAILED,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LIST_COMPANY_FAILED,
      payload: error,
    });
  }
};

export const updateCompanyAction =
  (companyName, website, address, email, phone, _id) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_COMPANY_REQUEST });

      const { userLoginReducer } = getState();
      const { loginUser } = userLoginReducer;

      let token = loginUser.r || loginUser.data[0].r;

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/company/update`,
        { companyName, website, address, email, phone, _id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (data.type === 1) {
        dispatch({
          type: UPDATE_COMPANY_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: UPDATE_COMPANY_FAILED,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_COMPANY_FAILED,
        payload: error,
      });
    }
  };

export const deleteCompanyAction = (_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_COMPANY_REQUEST });

    const { userLoginReducer } = getState();
    const { loginUser } = userLoginReducer;

    let token = loginUser.r || loginUser.data[0].r;

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/company/delete`,
      { _id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (data.type === 1) {
      dispatch({
        type: DELETE_COMPANY_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: DELETE_COMPANY_FAILED,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_COMPANY_FAILED,
      payload: error,
    });
  }
};

export const roleAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_ROLE_REQUEST });

    const { userLoginReducer } = getState();
    const { loginUser } = userLoginReducer;

    let token = loginUser.r || loginUser.data[0].r;

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/roles/read`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (data.type === 1) {
      dispatch({
        type: LIST_ROLE_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: LIST_ROLE_FAILED,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LIST_ROLE_FAILED,
      payload: error,
    });
  }
};
