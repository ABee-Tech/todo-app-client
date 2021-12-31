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

export const completedTodoReducer = (
  state = { data: [], error: [], loading: false },
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
    case TODO_CREATE_REQUEST:
      return {
        loading: true,
      };
    case TODO_CREATE_SUCCESS:
      return {
        todo: action.payload,
        loading: false,
      };
    case TODO_CREATE_FAIL:
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
    case TODO_FETCH_REQUEST:
      return {
        loading: true,
      };
    case TODO_FETCH_SUCCESS:
      return {
        todos: action.payload,
        loading: false,
      };
    case TODO_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
