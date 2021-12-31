import {
  TODO_COMPLETE_REQUEST,
  TODO_COMPLETE_SUCCESS,
  TODO_COMPLETE_FAIL,
  CREATE_TODO_FAIL,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  TODO_DETAIL_FAIL,
  TODO_DETAIL_REQUEST,
  TODO_DETAIL_SUCCESS,
  FETCH_TODO_FAIL,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
} from "../actionTypes";

export const completedTodoReducer = (
  state = { data: [], error: [] },
  action
) => {
  switch (action.type) {
    case TODO_COMPLETE_REQUEST:
      return {
        loading: true,
      };
    case TODO_COMPLETE_SUCCESS:
      return {
        todo: state.todo.filter((todo) => todo.id !== action.payload.id),
        loading: false,
      };
    case TODO_COMPLETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createdTodoReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TODO_REQUEST:
      return {
        loading: true,
      };
    case CREATE_TODO_SUCCESS:
      return {
        todo: action.payload,
        loading: false,
      };
    case CREATE_TODO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const todoDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case TODO_DETAIL_SUCCESS:
      return {
        todo: action.payload,
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

export const todosListReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TODO_REQUEST:
      return {
        loading: true,
      };
    case FETCH_TODO_SUCCESS:
      return {
        todos: action.payload,
        loading: false,
      };
    case FETCH_TODO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
