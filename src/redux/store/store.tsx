import { configureStore } from "@reduxjs/toolkit";
import { todoListSlice, todoSlice } from "../reducers/todo.reducers";
import { userSlice } from "../reducers/user.reducers";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    todoList: todoListSlice.reducer,
    todo: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
