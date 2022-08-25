import {
  LIST_CAMPAIGNS_REQUEST,
  LIST_CAMPAIGNS_SUCCESS,
  LIST_CAMPAIGNS_FAILED,
  ADD_CAMPAIGN_REQUEST,
  ADD_CAMPAIGN_SUCCESS,
  ADD_CAMPAIGN_FAILED,
  UPDATE_CAMPAIGN_REQUEST,
  UPDATE_CAMPAIGN_SUCCESS,
  UPDATE_CAMPAIGN_FAILED,
  DELETE_CAMPAIGN_REQUEST,
  DELETE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_FAILED,
} from "../constants/campaignsConstant";
import axios from "axios";

export const listCampaignAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_CAMPAIGNS_REQUEST });

    const { userLoginReducer } = getState();
    const { loginUser } = userLoginReducer;

    let token = loginUser.r || loginUser.data[0].r;

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/campaign/read`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (data.type === 1) {
      dispatch({
        type: LIST_CAMPAIGNS_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: LIST_CAMPAIGNS_FAILED,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LIST_CAMPAIGNS_FAILED,
      payload: error,
    });
  }
};

export const addCampaignAction =
  (companyObjId, campaignName, campaignRemarks) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_CAMPAIGN_REQUEST });

      const { userLoginReducer } = getState();
      const { loginUser } = userLoginReducer;

      let token = loginUser.r || loginUser.data[0].r;

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/campaign/save`,
        {
          companyObjId,
          campaignName,
          campaignRemarks,
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
          type: ADD_CAMPAIGN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: ADD_CAMPAIGN_FAILED,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_CAMPAIGN_FAILED,
        payload: error,
      });
    }
  };

export const updateCampaignAction =
  (companyObjId, campaignName, campaignRemarks, _id) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CAMPAIGN_REQUEST });

      const { userLoginReducer } = getState();
      const { loginUser } = userLoginReducer;

      let token = loginUser.r || loginUser.data[0].r;

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/campaign/update`,
        { companyObjId, campaignName, campaignRemarks, _id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (data.type === 1) {
        dispatch({
          type: UPDATE_CAMPAIGN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: UPDATE_CAMPAIGN_FAILED,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_CAMPAIGN_FAILED,
        payload: error,
      });
    }
  };

export const deleteCampaignAction = (_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CAMPAIGN_REQUEST });

    const { userLoginReducer } = getState();
    const { loginUser } = userLoginReducer;

    let token = loginUser.r || loginUser.data[0].r;

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/campaign/delete`,
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
        type: DELETE_CAMPAIGN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: DELETE_CAMPAIGN_FAILED,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_CAMPAIGN_FAILED,
      payload: error,
    });
  }
};
