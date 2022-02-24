import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoState } from "../../types";

interface ITodoSliceState {
  data: Partial<ITodoState>;
  loading: boolean;
  error: string;
}

interface ITodoListSliceState {
  data: ITodoState[];
  loading: boolean;
  error: string;
}

const todoInitialState: ITodoSliceState = {
  data: {},
  loading: false,
  error: "",
};

const todoListInitialState: ITodoListSliceState = {
  data: [],
  loading: false,
  error: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: todoInitialState,
  reducers: {
    todoRequest: (state) => {
      state.loading = true;
    },
    todoSuccess: (state, action: PayloadAction<ITodoState>) => {
      state.loading = false;
      state.data = action.payload;
    },
    todoFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const todoListSlice = createSlice({
  name: "todoList",
  initialState: todoListInitialState,
  reducers: {
    // Fetch Todos
    todoListFetchRequest: (state) => {
      state.loading = true;
    },
    todoListFetchSuccess: (state, action: PayloadAction<ITodoState[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    todoListFetchFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Create
    todoCreateRequest: (state) => {
      state.loading = true;
    },
    todoCreateSuccess: (state, action: PayloadAction<ITodoState>) => {
      state.loading = false;
      state.data = [...state.data, action.payload];
    },
    todoCreateFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update
    todoUpdateRequest: (state) => {
      state.loading = true;
    },
    todoUpdateSuccess: (state, action: PayloadAction<ITodoState>) => {
      state.loading = false;
      state.data = state?.data?.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    },
    todoUpdateFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Complete
    todoCompleteRequest: (state) => {
      state.loading = true;
    },
    todoCompleteSuccess: (state, action: PayloadAction<ITodoState>) => {
      state.loading = false;
      state.data = state?.data?.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    },
    todoCompleteFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete
    todoDeleteRequest: (state) => {
      state.loading = true;
    },
    todoDeleteSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state?.data?.filter((todo) => todo._id !== action.payload);
    },
    todoDeleteFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { todoRequest, todoSuccess, todoFail } = todoSlice.actions;
export const {
  todoListFetchRequest,
  todoListFetchSuccess,
  todoListFetchFail,
  todoCreateRequest,
  todoCreateSuccess,
  todoCreateFail,
  todoUpdateRequest,
  todoUpdateSuccess,
  todoUpdateFail,
  todoCompleteRequest,
  todoCompleteSuccess,
  todoCompleteFail,
  todoDeleteRequest,
  todoDeleteSuccess,
  todoDeleteFail,
} = todoListSlice.actions;
