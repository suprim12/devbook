import axios from "axios";
import * as types from "./types";
// GET Porfile
export const getprofile = () => dispatch => {
  dispatch(setProfileloading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_PROFILE,
        payload: {}
      })
    );
};

//Profile loading
export const setProfileloading = () => {
  return {
    type: types.PROFILE_LOADING
  };
};

// Clear Profile
export const clearprofile = () => {
  return {
    type: types.CLEAR_CURRENT_PROFILE
  };
};
