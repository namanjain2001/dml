import {
  LIST_FORM_REQUEST,
  LIST_FORM_SUCCESS,
  LIST_FORM_FAILED,
} from "../constants/formConstant";
import axios from "axios";

export const listFormAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_FORM_REQUEST });

    const { userLoginReducer } = getState();
    const { loginUser } = userLoginReducer;

    let token = loginUser.r || loginUser.data[0].r;

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/forms/read`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (data.type === 1) {
      dispatch({
        type: LIST_FORM_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: LIST_FORM_FAILED,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LIST_FORM_FAILED,
      payload: error,
    });
  }
};
