import {
  CREATE_TODO_FAIL,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
} from "../../actions/actionTypes";

const createdTodoReducer = (state = {}, action) => {
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

export default createdTodoReducer;
