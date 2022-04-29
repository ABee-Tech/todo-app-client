import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoCategoryState } from "../../types";

interface ITodoCategorySliceState {
  data: Partial<ITodoCategoryState>;
  loading: boolean;
  error: string;
}

interface ITodoCategoryListSliceState {
  data: ITodoCategoryState[];
  loading: boolean;
  error: string;
}

const todoCategoryInitialState: ITodoCategorySliceState = {
  data: {},
  loading: false,
  error: "",
};

const todoCategoryListInitialState: ITodoCategoryListSliceState = {
  data: [],
  loading: false,
  error: "",
};

export const todoCategorySlice = createSlice({
  name: "todoCategory",
  initialState: todoCategoryInitialState,
  reducers: {
    todoCategoryRequest: (state) => {
      state.loading = true;
    },
    todoCategorySuccess: (state, action: PayloadAction<ITodoCategoryState>) => {
      state.loading = false;
      state.data = action.payload;
    },
    todoCategoryFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const todoCategoryListSlice = createSlice({
  name: "todoCategoryList",
  initialState: todoCategoryListInitialState,
  reducers: {
    // Fetch TodoCategorys
    todoCategoryListFetchRequest: (state) => {
      state.loading = true;
    },
    todoCategoryListFetchSuccess: (
      state,
      action: PayloadAction<ITodoCategoryState[]>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    todoCategoryListFetchFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Create
    todoCategoryCreateRequest: (state) => {
      state.loading = true;
    },
    todoCategoryCreateSuccess: (
      state,
      action: PayloadAction<ITodoCategoryState>
    ) => {
      state.loading = false;
      state.data = [...state.data, action.payload];
    },
    todoCategoryCreateFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update
    todoCategoryUpdateRequest: (state) => {
      state.loading = true;
    },
    todoCategoryUpdateSuccess: (
      state,
      action: PayloadAction<ITodoCategoryState>
    ) => {
      state.loading = false;
      state.data = state?.data?.map((todoCategory) =>
        todoCategory._id === action.payload._id ? action.payload : todoCategory
      );
    },
    todoCategoryUpdateFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete
    todoCategoryDeleteRequest: (state) => {
      state.loading = true;
    },
    todoCategoryDeleteSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state?.data?.filter(
        (todoCategory) => todoCategory._id !== action.payload
      );
    },
    todoCategoryDeleteFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { todoCategoryRequest, todoCategorySuccess, todoCategoryFail } =
  todoCategorySlice.actions;
export const {
  todoCategoryListFetchRequest,
  todoCategoryListFetchSuccess,
  todoCategoryListFetchFail,
  todoCategoryCreateRequest,
  todoCategoryCreateSuccess,
  todoCategoryCreateFail,
  todoCategoryUpdateRequest,
  todoCategoryUpdateSuccess,
  todoCategoryUpdateFail,
  todoCategoryDeleteRequest,
  todoCategoryDeleteSuccess,
  todoCategoryDeleteFail,
} = todoCategoryListSlice.actions;
