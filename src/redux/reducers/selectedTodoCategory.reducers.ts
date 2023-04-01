import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedTodoCategoryState } from "../../types";

interface ISelectedTodoCategorySliceState extends ISelectedTodoCategoryState {}

const selectedTodoCategoryInitialState: ISelectedTodoCategorySliceState = {
  selected_category_id: undefined,
};

export const selectedTodoCategorySlice = createSlice({
  name: "selectedTodoCategory",
  initialState: selectedTodoCategoryInitialState,
  reducers: {
    todoCategorySelect: (state, action: PayloadAction<string>) => {
      state.selected_category_id = action.payload;
    },
    todoCategoryDeselect: (state) => {
      state.selected_category_id = undefined;
    },
  },
});

export const { todoCategorySelect, todoCategoryDeselect } =
  selectedTodoCategorySlice.actions;
