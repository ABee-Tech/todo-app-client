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
} from "../reducers/user.reducers";

import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
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
        "/users",
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
        "/users/login",
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

export const updateUser = (
  name: string,
  email: string,
  oldPassword: string,
  newPassword: string
) => {
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
        "/users",
        { name, email, oldPassword, newPassword },
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
