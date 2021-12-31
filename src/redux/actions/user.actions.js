import { axiosInstance } from "../../utils/axios";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_FETCH_REQUEST,
  USER_FETCH_FAIL,
  USER_FETCH_SUCCESS,
} from "../actionTypes";

export const registerUser = (name, email, password, role) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axiosInstance.post(
        process.env.REACT_APP_API_URL + "/api/users",
        {
          name,
          email,
          password,
          role,
        },
        config
      );
      console.log(name, email, password);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userAuthData", JSON.stringify(data));
    } catch (error) {
      console.log("mongdb error", error);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        process.env.REACT_APP_API_URL + "/api/users/login",
        { email, password },
        config
      );
      localStorage.setItem("userAuthData", JSON.stringify(data));

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("userAuthData");
    try {
      dispatch({
        type: USER_LOGOUT,
      });
      window.location.reload();
    } catch (error) {}
  };
};

export const getUserProfile = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: USER_PROFILE_REQUEST,
      });
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/api/users/profile",
        config
      );
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

export const updateUser = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
        loading: true,
      });

      const { userInfo } = getState().userLogin;
      console.log(userInfo.token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axiosInstance.put(
        process.env.REACT_APP_API_URL + "/api/users/profile/update",
        { name, email, password },
        config
      );
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_FETCH_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/api/users",
        config
      );
      dispatch({
        type: USER_FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_FETCH_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};
