import { axiosInstance } from "../axios";
import {
  CREATE_TODO_FAIL,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  FETCH_TODO_FAIL,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
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

//Create todo

export const createTodo = (todoData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_TODO_REQUEST,
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
        type: CREATE_TODO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_TODO_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch all todos

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_TODO_REQUEST,
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
        type: FETCH_TODO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_TODO_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//delete a todo

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_TODO_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(`/api/todos/${id}`, config);
      dispatch({
        type: DELETE_TODO_SUCCESS,
        payload: data,
      });

      const { data: newData } = await axiosInstance.get(`/api/todos`, config);
      dispatch({
        type: FETCH_TODO_SUCCESS,
        payload: newData,
      });
    } catch (error) {
      dispatch({
        type: DELETE_TODO_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch a signle todo
export const fetchTodo = (id, todoData) => {
  return async (dispatch) => {
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
        todoData,
        config
      );

      dispatch({
        type: TODO_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TODO_DETAIL_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//UPDATE TODO

export const updateTodo = (id, todoData) => {
  return async (dispatch) => {
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
    } catch (error) {
      dispatch({
        type: TODO_UPDATE_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//COMPLETE TODO

export const completeTodo = (id, completed) => {
  return async (dispatch) => {
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
      await axiosInstance.put(`/api/todos/${id}`, { completed }, config);
      const { data: newData } = await axiosInstance.get(`/api/todos`);
      dispatch({
        type: TODO_COMPLETE_SUCCESS,
        payload: newData,
      });
    } catch (error) {
      dispatch({
        type: TODO_COMPLETE_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};
