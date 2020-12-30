import axios from "axios";
import setAdminAuthToken from "../utils/setAdminAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  ADMIN_LOADING,
  SET_CURRENT_ADMIN
} from "./types";
// Register User
export const registerAdmin = (adminData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/admins/register", adminData)
    .then(res => history.push("/admin-login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginAdmin = adminData => dispatch => {
  axios
    .post("http://localhost:5000/api/admins/login", adminData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("adminjwtToken", token);
      // Set token to Auth header
      setAdminAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentAdmin(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded
  };
};
// User loading
export const setAdminLoading = () => {
  return {
    type: ADMIN_LOADING
  };
};
// Log user out
export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("adminjwtToken");
  // Remove auth header for future requests
  setAdminAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentAdmin({}));
};