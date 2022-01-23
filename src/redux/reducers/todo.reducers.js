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

export const todoDetailReducer = (state = {}, action) => {
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
  action
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
        // data: state.data.filter((data) => data.id !== action.payload.id),
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
