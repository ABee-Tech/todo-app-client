import { configureStore } from "@reduxjs/toolkit";
import { todoListSlice, todoSlice } from "../reducers/todo.reducers";
// import { todosListReducer } from "../reducers/todo.reducers";
import { userInfoSlice } from "../reducers/userInfo.reducers";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    // userList: userListReducer,
    // userProfile: userProfileReducer,
    // userUpdate: userUpdateReducer,
    todoList: todoListSlice.reducer,
    todo: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { todosListReducer, todoDetailReducer } from "../reducers/todo.reducers";
// import {
//   userInfoReducer,
//   userProfileReducer,
//   userUpdateReducer,
//   userListReducer,
// } from "../reducers/user.reducers";

// const middleware = [thunk];

// const reducer = combineReducers({
//   userInfo: userInfoReducer,
//   userProfile: userProfileReducer,
//   updatedUser: userUpdateReducer,
//   todosList: todosListReducer,
//   todoDetails: todoDetailReducer,
//   usersList: userListReducer,
// });

// // Reducer Types
// export type UserInfoState = ReturnType<typeof userInfoReducer>;
// export type UserProfileState = ReturnType<typeof userProfileReducer>;
// export type UserUpdateState = ReturnType<typeof userUpdateReducer>;
// export type TodosListState = ReturnType<typeof todosListReducer>;
// export type TodoDetailsState = ReturnType<typeof todoDetailReducer>;
// export type UsersListState = ReturnType<typeof userListReducer>;

// //store
// //Initial state

// //This is the initial state for all the reducers. NOTE the keys of the reducers above must be the same as the one you will pass as initialstate
// //The key must be the same and secondly look at the way the structure of the data in the store

// //Get the user in local storage

// const userAuthData = localStorage.getItem("userAuthData");

// const userAuthFromStorage = userAuthData
//   ? JSON.parse(userAuthData)
//   : {};

// const initialState = {
//   userInfo: { loading: false, data: userAuthFromStorage, error: "" },
// };

// export const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
