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
  action
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

export const userProfileReducer = (state = {}, action) => {
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

export const usersListReducer = (state = [], action) => {
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

export const userUpdateReducer = (state = {}, action) => {
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
