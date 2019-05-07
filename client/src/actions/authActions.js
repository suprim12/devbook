import * as types from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
// Register Users
export const registeruser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login users
export const loginuser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => { 
      // Save to localstorage
      const { token } = res.data;
      // Set to localStorage
      localStorage.setItem("jwtToken", token);
      // Set to Auth Headers
      setAuthToken(token);
      // Decode token to get users
      const decoded = jwt_decode(token);
      // Set current users
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response && err.response.data ? err.response.data : {}
      })
    );
};

// Set logged in users
export const setCurrentUser = decoded => {
  return {
    type: types.SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout users
export const logoutuser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  // Remove auth
  setAuthToken(false);
  // setcurrent user to {} which set 
  dispatch(setCurrentUser({}))
};
