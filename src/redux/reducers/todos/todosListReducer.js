import {
  FETCH_TODO_FAIL,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
} from "../../actions/actionTypes";

const todosListReducer = (state = [], action) => {
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

export default todosListReducer;
