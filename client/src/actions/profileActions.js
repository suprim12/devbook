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
// Create Profile
export const createprofile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
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

// Delete Account & Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure this will be permanent")) {
    axios
      .delete("/api/profile/")
      .then(res =>
        dispatch({
          type: types.SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: types.GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Add Expierence Actions
export const addExperience = (data, history) => dispatch => {
  axios
    .post("/api/profile/exprience", data)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Add Education
export const addEducation = (data, history) => dispatch => {
  axios
    .post("/api/profile/education", data)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Delete Experience
export const deleteExprience = id => dispatch => {
  axios
    .delete(`/api/profile/exprience/${id}`)
    .then(res =>
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get Profiles
export const getProfiles = () => dispatch => {
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: types.GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_PROFILES,
        payload: null
      })
    );
};
// Get Profile By Handle
export const getProfileByHandle = handle => dispatch => {
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_PROFILE,
        payload: null
      })
    );
};
