import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from './types';

//= ===============================
// Authentication actions
//= ===============================

// TO-DO: Add expiration to cookie
export function loginUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });
        dispatch({ type: AUTH_USER });
        window.location.href = `${CLIENT_ROOT_URL}/my-profile`;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function updateProfile({ emailQuery, firstName, age, age_pref_min, age_pref_max }) {
  return function (dispatch) {
    axios.put(`${API_URL}/user/update`, { emailQuery, firstName, age, age_pref_min, age_pref_max }, { headers: { Authorization: cookie.load('token') } })
      .then((response) => {

        window.location.href = `${CLIENT_ROOT_URL}/my-profile`;
      })
      .catch((error) => {
       errorHandler(dispatch, error.response);
      });
  };
}

export function registerUser({ email, firstName, lastInitial, password, age, is_male, seeking_male }) {
  return function (dispatch) {

    axios.post(`${API_URL}/auth/register`, { email, firstName, lastInitial, password, age, is_male, seeking_male })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });
        dispatch({ type: AUTH_USER });
        window.location.href = `${CLIENT_ROOT_URL}/my-profile`;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    window.location.href = `${CLIENT_ROOT_URL}/login`;
  };
}

export function getForgotPasswordToken({ email }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/forgot-password`, { email })
      .then((response) => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
          payload: response.data.message,
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function resetPassword(token, { password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
      .then((response) => {
        dispatch({
          type: RESET_PASSWORD_REQUEST,
          payload: response.data.message,
        });
        // Redirect to login page on successful password reset
        browserHistory.push('/login');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function protectedTest() {
  return function (dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { Authorization: cookie.load('token') },
    })
      .then((response) => {
        dispatch({
          type: PROTECTED_TEST,
          payload: response.data.content,
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {
      if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
        throw { email: 'Email already Exists' }
      }
    })
}

export default asyncValidate;