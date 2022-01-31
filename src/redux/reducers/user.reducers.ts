// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface IUserInfoState {
//   id?: number;
//   title?: string;
//   description?: string;
//   completed?: boolean;
// }

// interface IUserInfoSliceState {
//   data: IUserInfoState;
//   loading: boolean;
//   error: string;
// }

// interface ITodoListSliceState {
//   data: ITodoDetailState[];
//   loading: boolean;
//   error: string;
// }

// const todoDetailInitialState: ITodoDetailSliceState = {
//   data: {},
//   loading: false,
//   error: "",
// };

// const todoListInitialState: ITodoListSliceState = {
//   data: [],
//   loading: false,
//   error: "",
// };

// export const todoDetailSlice = createSlice({
//   name: "todoDetail",
//   initialState: todoDetailInitialState,
//   reducers: {
//     todoDetailRequest: (state) => {
//       state.loading = true;
//     },
//     todoDetailSuccess: (state, action: PayloadAction<ITodoDetailState>) => {
//       state.loading = false;
//       state.data = action.payload;
//     },
//     todoDetailFail: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const todoListSlice = createSlice({
//   name: "todoList",
//   initialState: todoListInitialState,
//   reducers: {
//     todoListFetchRequest: (state) => {
//       state.loading = true;
//     },
//     todoListFetchSuccess: (
//       state,
//       action: PayloadAction<ITodoDetailState[]>
//     ) => {
//       state.loading = false;
//       state.data = action.payload;
//     },
//     todoListFetchFail: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // Create
//     todoCreateRequest: (state) => {
//       state.loading = true;
//     },
//     todoCreateSuccess: (state, action: PayloadAction<ITodoDetailState>) => {
//       state.loading = false;
//       state.data = [...state.data, action.payload];
//     },
//     todoCreateFail: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // Update
//     todoUpdateRequest: (state) => {
//       state.loading = true;
//     },
//     todoUpdateSuccess: (state, action: PayloadAction<ITodoDetailState>) => {
//       state.loading = false;
//       state.data = state.data.map((todo) =>
//         todo.id === action.payload.id ? action.payload : todo
//       );
//     },
//     todoUpdateFail: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // Complete
//     todoCompleteRequest: (state) => {
//       state.loading = true;
//     },
//     todoCompleteSuccess: (state, action: PayloadAction<ITodoDetailState>) => {
//       state.loading = false;
//       state.data = state.data.map((todo) =>
//         todo.id === action.payload.id ? action.payload : todo
//       );
//     },
//     todoCompleteFail: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { todoDetailRequest, todoDetailSuccess, todoDetailFail } =
//   todoDetailSlice.actions;
// export const {
//   todoListFetchRequest,
//   todoListFetchSuccess,
//   todoListFetchFail,
//   todoCreateRequest,
//   todoCreateSuccess,
//   todoCreateFail,
//   todoUpdateRequest,
//   todoUpdateSuccess,
//   todoUpdateFail,
//   todoCompleteRequest,
//   todoCompleteSuccess,
//   todoCompleteFail,
// } = todoListSlice.actions;

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAIL,
  USER_FETCH_REQUEST,
  USER_FETCH_FAIL,
  USER_FETCH_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../actionTypes";

export const userInfoReducer = (
  state = { loading: false, data: {}, error: "" },
  action: any
) => {
  switch (action.type) {
    // Register
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Login
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Logout
    case USER_LOGOUT:
      return { loading: false, data: {}, error: "" };

    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action: any) => {
  switch (action.type) {
    // Profile
    case USER_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        payload: action.payload,
      };
    default:
      return state;
  }
};

export const userListReducer = (state = [], action: any) => {
  switch (action.type) {
    // Register
    case USER_FETCH_REQUEST:
      return { loading: true };
    case USER_FETCH_SUCCESS:
      return {
        users: action.payload,
      };
    case USER_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
