import { axiosInstance } from "../../utils/axios";
import { Dispatch } from "redux";
import { ISettingDispatchActionData } from "@types";
import {
  settingUpdateRequest,
  settingUpdateSuccess,
  settingUpdateFail,
  settingFetchFail,
  settingFetchRequest,
  settingFetchSuccess,
} from "../reducers/setting.reducers";
import { toast } from "react-toastify";
import { AxiosRequestConfig } from "axios";
import { darkMode } from "@utils/darkMode";

// Update setting

export const updateSettings = (
  settingDispatchActionData: ISettingDispatchActionData
) => {
  return async (dispatch: Dispatch) => {
    const { data: settingData, onSuccess, onError } = settingDispatchActionData;

    try {
      dispatch(settingUpdateRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.put(`/settings`, settingData, config);
      const { data } = res;

      if (settingData?.theme) {
        localStorage.setItem("theme", settingData.theme);
        darkMode();
      }

      dispatch(settingUpdateSuccess(data));
      onSuccess && onSuccess(res);
      toast.success("Settings updated successfully");
    } catch (error: any) {
      onError && onError(error);
      toast.error(`Sorry! ${error.response && error.response.data.message}`);
      dispatch(settingUpdateFail(error.response && error.response.data));
    }
  };
};

// Fetch setting

export const fetchSettings = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(settingFetchRequest());

      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get("/settings", config);

      if (data?.theme) {
        localStorage.setItem("theme", data.theme);
        darkMode();
      }
      dispatch(settingFetchSuccess(data));
    } catch (error: any) {
      dispatch(settingFetchFail(error.response && error.response.data));
    }
  };
};
