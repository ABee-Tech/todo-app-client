import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInfoState } from "../../types";

interface IUserInfoSliceState {
  data: Partial<IUserInfoState>;
  loading: boolean;
  error: string;
}

//Get the user in local storage

const userAuthData = localStorage.getItem("userAuthData");

const userAuthFromStorage = userAuthData ? JSON.parse(userAuthData) : {};

const userInfoInitialState: IUserInfoSliceState = {
  data: userAuthFromStorage,
  loading: false,
  error: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: userInfoInitialState,
  reducers: {
    // Register
    userRegisterRequest: (state) => {
      state.loading = true;
    },
    userRegisterSuccess: (state, action: PayloadAction<IUserInfoState>) => {
      state.loading = false;
      state.data = action.payload;
    },
    userRegisterFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Login
    userLoginRequest: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action: PayloadAction<IUserInfoState>) => {
      state.loading = false;
      state.data = action.payload;
    },
    userLoginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Logout
    userLogout: (state) => {
      state.loading = false;
      state.data = {};
      state.error = "";
    },
    // Update
    userUpdateRequest: (state) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action: PayloadAction<IUserInfoState>) => {
      state.loading = false;
      state.data = action.payload;
    },
    userUpdateFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = userInfoSlice.actions;
