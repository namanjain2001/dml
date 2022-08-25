import {
  LIST_CAMPAIGNS_REQUEST,
  LIST_CAMPAIGNS_SUCCESS,
  LIST_CAMPAIGNS_FAILED,
  ADD_CAMPAIGN_REQUEST,
  ADD_CAMPAIGN_SUCCESS,
  ADD_CAMPAIGN_FAILED,
  ADD_CAMPAIGN_RESET,
  UPDATE_CAMPAIGN_REQUEST,
  UPDATE_CAMPAIGN_SUCCESS,
  UPDATE_CAMPAIGN_FAILED,
  UPDATE_CAMPAIGN_RESET,
  DELETE_CAMPAIGN_REQUEST,
  DELETE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_FAILED,
  DELETE_CAMPAIGN_RESET,
} from "../constants/campaignsConstant";

export const listCampaignReducer = (state = { listedCampaign: [] }, action) => {
  switch (action.type) {
    case LIST_CAMPAIGNS_REQUEST:
      return {
        loading: true,
        listedCampaign: [],
      };
    case LIST_CAMPAIGNS_SUCCESS:
      return {
        loading: false,
        listedCampaign: action.payload,
      };
    case LIST_CAMPAIGNS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addCampaignReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };
    case ADD_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        addedCampaign: action.payload,
      };
    case ADD_CAMPAIGN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_CAMPAIGN_RESET:
      return (state = {});
    default:
      return state;
  }
};

export const updateCampaignReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        updateCampaign: action.payload,
      };
    case UPDATE_CAMPAIGN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_CAMPAIGN_RESET:
      return (state = {});
    default:
      return state;
  }
};

export const deleteCampaignReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };
    case DELETE_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        deleteCampaign: action.payload,
      };
    case DELETE_CAMPAIGN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_CAMPAIGN_RESET:
      return (state = {});
    default:
      return state;
  }
};
