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

interface ITodo {
  title?: string;
  description?: string;
  completed?: string;
}

//Create todo

export const createTodo = (todoData: ITodo) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_CREATE_REQUEST,
        loading: true,
      });
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

      dispatch({
        type: TODO_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_CREATE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch all todos

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_FETCH_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/api/todos",
        config
      );

      dispatch({
        type: TODO_FETCH_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_FETCH_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//delete a todo

export const deleteTodo = (id: number) => {
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

      const { data: newData } = await axiosInstance.get(`/api/todos`, config);
      dispatch({
        type: TODO_FETCH_SUCCESS,
        payload: newData,
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
export const fetchTodo = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_DETAIL_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/todos/${id}`,
        config
      );

      dispatch({
        type: TODO_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_DETAIL_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//UPDATE TODO

export const updateTodo = (id: number, todoData: ITodo) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_UPDATE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosInstance.put(`/api/todos/${id}`, todoData, config);
      const { data: newData } = await axiosInstance.get(`/api/todos`);
      dispatch({
        type: TODO_UPDATE_SUCCESS,
        payload: newData,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_UPDATE_FAIL,
        loading: false,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//COMPLETE TODO

export const completeTodo = (id: number, completed: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_COMPLETE_REQUEST,
        loading: true,
      });

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
      const { data: newData } = await axiosInstance.get(`/api/todos`);
      console.log(newData, "newData");
      dispatch({
        type: TODO_COMPLETE_SUCCESS,
        payload: { ...newData, completed },
      });
    } catch (error: any) {
      dispatch({
        type: TODO_COMPLETE_FAIL,
        loading: false,
        payload: error.response && error.response.data.message,
      });
    }
  };
};
