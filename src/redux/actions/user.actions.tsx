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
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
  userFetchRequest,
  userFetchSuccess,
  userFetchFail,
} from "../reducers/user.reducers";

import { RootStateOrAny } from "react-redux";
import {
  IProfilePictureUploadDispatchActionData,
  IUserDispatchActionData,
} from "@types";
import { toast } from "react-toastify";

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

      axiosInstance.defaults.headers.common[
        "authorization"
      ] = `Bearer ${data.token}`;

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

export const updateUser = (userDispatchActionData: IUserDispatchActionData) => {
  return async (dispatch: Dispatch, getState: RootStateOrAny) => {
    const { data: userData, onSuccess, onError } = userDispatchActionData;
    try {
      dispatch(userUpdateRequest());
      console.log(getState().user.data);
      const { token } = getState().user.data;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosInstance.put(
        "/users/profile/update",
        userData,
        config
      );

      dispatch(userUpdateSuccess(data));
      localStorage.setItem("userAuthData", JSON.stringify(data));

      onSuccess && onSuccess(data);
      toast.success("Profile updated successfully");

      dispatch<any>(fetchUser());
    } catch (error: any) {
      onError && onError(error);
      toast.error(`Sorry! ${error.response && error.response.data.message}`);
      dispatch(userUpdateFail(error.response && error.response.data.message));
    }
  };
};

export const updateProfilePicture = (
  userDispatchActionData: IProfilePictureUploadDispatchActionData
) => {
  return async (dispatch: Dispatch, getState: RootStateOrAny) => {
    const { data: userData, onSuccess, onError } = userDispatchActionData;
    try {
      dispatch(userUpdateRequest());
      console.log(getState().user.data);
      const { token } = getState().user.data;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosInstance.put(
        "/users/profile/picture",
        userData,
        config
      );

      dispatch(userUpdateSuccess(data));
      localStorage.setItem("userAuthData", JSON.stringify(data));

      onSuccess && onSuccess(data);
      toast.success("Profile updated successfully");

      dispatch<any>(fetchUser());
    } catch (error: any) {
      onError && onError(error);
      toast.error(`Sorry! ${error.response && error.response.data.message}`);
      dispatch(userUpdateFail(error.response && error.response.data.message));
    }
  };
};

//Fetch user
export const fetchUser = () => {
  return async (dispatch: Dispatch, getState: RootStateOrAny) => {
    try {
      dispatch(userFetchRequest());
      const { userInfo } = getState().userLogin;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axiosInstance.get(`/profile`, config);

      dispatch(userFetchSuccess(data));
    } catch (error: any) {
      dispatch(userFetchFail(error.response && error.response.data.message));
    }
  };
};
