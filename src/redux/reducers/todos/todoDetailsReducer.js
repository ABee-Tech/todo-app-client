import {
  TODO_DETAIL_FAIL,
  TODO_DETAIL_REQUEST,
  TODO_DETAIL_SUCCESS,
} from "../../actions/actionTypes";

const todoDetailReducer = (state = {}, action) => {
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

export default todoDetailReducer;
