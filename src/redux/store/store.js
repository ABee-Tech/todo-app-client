import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userInfoReducer,
  userProfileReducer,
  userUpdateReducer,
  usersListReducer,
} from "../reducers/user.reducers";
import {
  createdTodoReducer,
  todosListReducer,
  todoDetailReducer,
} from "../reducers/todo.reducers";

const middleware = [thunk];

const reducer = combineReducers({
  userInfo: userInfoReducer,
  userProfile: userProfileReducer,
  updatedUser: userUpdateReducer,
  todoCreated: createdTodoReducer,
  todosList: todosListReducer,
  todoDetails: todoDetailReducer,
  usersList: usersListReducer,
});

//store
//Initial state

//This is the initial state for all the reducers. NOTE the keys of the reducers above must be the same as the one you will pass as initialstate
//The key must be the same and secondly look at the way the structure of the data in the store

//Get the user in local storage

const userAuthFromStorage = localStorage.getItem("userAuthData")
  ? JSON.parse(localStorage.getItem("userAuthData"))
  : {};

const initialState = {
  userInfo: { loading: false, userInfo: userAuthFromStorage, error: "" },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
