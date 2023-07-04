import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETheme, IApiError, ISettingState } from "../../types";

interface ISettingSliceState {
  data: Partial<ISettingState>;
  loading: boolean;
  error: Partial<IApiError>;
}

const theme: ETheme =
  (localStorage.getItem("theme") as ETheme) || ("light" as ETheme);

const settingInitialState: ISettingSliceState = {
  data: {
    theme,
  },
  loading: false,
  error: {},
};

export const settingSlice = createSlice({
  name: "setting",
  initialState: settingInitialState,
  reducers: {
    // Fetch Setting
    settingFetchRequest: (state) => {
      state.loading = true;
    },
    settingFetchSuccess: (state, action: PayloadAction<ISettingState>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = {};
    },
    settingFetchFail: (state, action: PayloadAction<IApiError>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update
    settingUpdateRequest: (state) => {
      state.loading = true;
    },
    settingUpdateSuccess: (state, action: PayloadAction<ISettingState>) => {
      state.loading = false;
      state.data = { ...state.data, ...action.payload };
    },
    settingUpdateFail: (state, action: PayloadAction<IApiError>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  settingFetchRequest,
  settingFetchSuccess,
  settingFetchFail,
  settingUpdateRequest,
  settingUpdateSuccess,
  settingUpdateFail,
} = settingSlice.actions;
