// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface ITodoDetailState {
//   id?: number;
//   title?: string;
//   description?: string;
//   completed?: boolean;
// }

// interface ITodoDetailSliceState {
//   data: ITodoDetailState;
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
  TODO_COMPLETE_REQUEST,
  TODO_COMPLETE_SUCCESS,
  TODO_COMPLETE_FAIL,
  TODO_CREATE_FAIL,
  TODO_CREATE_REQUEST,
  TODO_CREATE_SUCCESS,
  TODO_DETAIL_FAIL,
  TODO_DETAIL_REQUEST,
  TODO_DETAIL_SUCCESS,
  TODO_FETCH_FAIL,
  TODO_FETCH_REQUEST,
  TODO_FETCH_SUCCESS,
} from "../actionTypes";

export const todoDetailReducer = (state = {}, action: any) => {
  switch (action.type) {
    // Detail
    case TODO_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case TODO_DETAIL_SUCCESS:
      return {
        data: action.payload,
        loading: false,
      };
    case TODO_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const todosListReducer = (
  state = { loading: false, data: [], error: "" },
  action: any
) => {
  switch (action.type) {
    // Fetch Todos
    case TODO_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TODO_FETCH_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case TODO_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Todo
    case TODO_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TODO_CREATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case TODO_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Completed Update Todo
    case TODO_COMPLETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TODO_COMPLETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case TODO_COMPLETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
