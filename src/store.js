import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  userLoginReducer,
  userForgetPasswordInitiateReducer,
  userNewPasswordReducer,
} from "./reducers/userReducer";
import {
  addCompanyReducer,
  listCompanyReducer,
  updateCompanyReducer,
  deleteCompanyReducer,
} from "./reducers/dashboardReducer";
import {
  listCampaignReducer,
  addCampaignReducer,
  updateCampaignReducer,
  deleteCampaignReducer,
} from "./reducers/campaignsReducer";

const rootReducer = combineReducers({
  userLoginReducer,
  userForgetPasswordInitiateReducer,
  userNewPasswordReducer,
  addCompanyReducer,
  listCompanyReducer,
  updateCompanyReducer,
  deleteCompanyReducer,
  listCampaignReducer,
  addCampaignReducer,
  updateCampaignReducer,
  deleteCampaignReducer,
});

const checkUserInfoDML = localStorage.getItem("userInfoDML")
  ? JSON.parse(localStorage.getItem("userInfoDML"))
  : null;

const checkForget_passwordUserInitiated = localStorage.getItem(
  "forget_passwordUserInitiated"
)
  ? JSON.parse(localStorage.getItem("forget_passwordUserInitiated"))
  : null;

const initialState = {
  userForgetPasswordInitiateReducer: {
    forgotPasswordInitiated: checkForget_passwordUserInitiated,
  },
  userLoginReducer: {
    loginUser: checkUserInfoDML,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
