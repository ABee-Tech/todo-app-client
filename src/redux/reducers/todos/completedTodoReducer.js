import {
  TODO_COMPLETE_REQUEST,
  TODO_COMPLETE_SUCCESS,
  TODO_COMPLETE_FAIL,
} from "../../actions/actionTypes";

const completedTodoReducer = (state = {}, action) => {
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

export default completedTodoReducer;
