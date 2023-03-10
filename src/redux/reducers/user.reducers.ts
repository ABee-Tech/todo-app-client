import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../../types";

interface IUserSliceState {
  data: Partial<IUserState>;
  loading: boolean;
  error: string;
}

//Get the user in local storage

const userAuthData = localStorage.getItem("userAuthData");

const userAuthFromStorage = userAuthData ? JSON.parse(userAuthData) : {};

const userInitialState: IUserSliceState = {
  data: userAuthFromStorage,
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    // Register
    userRegisterRequest: (state) => {
      state.loading = true;
    },
    userRegisterSuccess: (state, action: PayloadAction<IUserState>) => {
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
    userLoginSuccess: (state, action: PayloadAction<IUserState>) => {
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
    userUpdateSuccess: (state, action: PayloadAction<IUserState>) => {
      state.loading = false;
      state.data = action.payload;
    },
    userUpdateFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Fetch User
    userFetchRequest: (state) => {
      state.loading = true;
    },
    userFetchSuccess: (state, action: PayloadAction<IUserState>) => {
      state.loading = false;
      state.data = action.payload;
    },
    userFetchFail: (state, action: PayloadAction<string>) => {
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
  userFetchRequest,
  userFetchSuccess,
  userFetchFail,
} = userSlice.actions;
