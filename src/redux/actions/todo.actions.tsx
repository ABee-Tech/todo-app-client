import { axiosInstance } from "../../utils/axios";
import { Dispatch } from "redux";
import {
  TODO_CREATE_FAIL,
  TODO_CREATE_REQUEST,
  TODO_CREATE_SUCCESS,
  TODO_FETCH_FAIL,
  TODO_FETCH_REQUEST,
  TODO_FETCH_SUCCESS,
  TODO_DELETE_FAIL,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_REQUEST,
  TODO_DETAIL_SUCCESS,
  TODO_DETAIL_FAIL,
  TODO_DETAIL_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_FAIL,
  TODO_COMPLETE_SUCCESS,
  TODO_COMPLETE_FAIL,
  TODO_COMPLETE_REQUEST,
} from "../actionTypes";
import { ITodoState } from "@types";
import {
  todoCompleteFail,
  todoCompleteRequest,
  todoCompleteSuccess,
  todoCreateFail,
  todoCreateRequest,
  todoCreateSuccess,
  todoFail,
  todoListFetchFail,
  todoListFetchRequest,
  todoListFetchSuccess,
  todoRequest,
  todoSuccess,
} from "../reducers/todo.reducers";

//Create todo

export const createTodo = (todoData: Partial<ITodoState>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(todoCreateRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        process.env.REACT_APP_API_URL + "/api/todos",
        todoData,
        config
      );

      dispatch(todoCreateSuccess(data));
    } catch (error: any) {
      dispatch(todoCreateFail(error.response && error.response.data.message));
    }
  };
};

//Fetch all todos

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(todoListFetchRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/api/todos",
        config
      );

      dispatch(todoListFetchSuccess(data));
    } catch (error: any) {
      dispatch(
        todoListFetchFail(error.response && error.response.data.message)
      );
    }
  };
};

//delete a todo

export const deleteTodo = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_DELETE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(`/api/todos/${id}`, config);
      dispatch({
        type: TODO_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_DELETE_FAIL,
        loading: false,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch a signle todo
export const fetchTodo = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(todoRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/api/todos/${id}`, config);

      dispatch(todoSuccess(data));
    } catch (error: any) {
      dispatch(todoFail(error.response && error.response.data.message));
    }
  };
};

//COMPLETE TODO

export const completeTodo = (id: string, completed: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(todoCompleteRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosInstance.put(
        `/api/todos/${id}/completed`,
        { completed },
        config
      );
      const { data } = await axiosInstance.get(`/api/todos`);
      const newData = {
        ...data,
        completed,
      };
      dispatch(todoCompleteSuccess(newData));
    } catch (error: any) {
      dispatch(todoCompleteFail(error.response && error.response.data.message));
    }
  };
};
