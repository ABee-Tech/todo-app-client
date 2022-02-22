import { axiosInstance } from "../../utils/axios";
import { Dispatch } from "redux";
import {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
} from "../reducers/userInfo.reducers";

import {
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
import { RootStateOrAny } from "react-redux";

export const registerUser = (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userRegisterRequest());

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
      dispatch(userRegisterSuccess(data));

      localStorage.setItem("userAuthData", JSON.stringify(data));
    } catch (error: any) {
      console.log("mongodb error", error);
      dispatch(
        userRegisterFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userLoginRequest());

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

      dispatch(userLoginSuccess(data));
    } catch (error: any) {
      dispatch(userLoginFail(error.response.data.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    localStorage.removeItem("userAuthData");
    try {
      dispatch(userLogout());
    } catch (error) {}
  };
};

export const getUserProfile = () => {
  return async (dispatch: Dispatch, getState: RootStateOrAny) => {
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
    } catch (error: any) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

export const updateUser = (name: string, email: string, password: string) => {
  return async (dispatch: Dispatch, getState: RootStateOrAny) => {
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
    } catch (error: any) {
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
