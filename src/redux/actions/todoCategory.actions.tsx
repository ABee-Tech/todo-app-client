import { axiosInstance } from "../../utils/axios";
import { Dispatch } from "redux";
import {
  TODO_CATEGORY_CREATE_FAIL,
  TODO_CATEGORY_CREATE_REQUEST,
  TODO_CATEGORY_CREATE_SUCCESS,
  TODO_CATEGORY_FETCH_FAIL,
  TODO_CATEGORY_FETCH_REQUEST,
  TODO_CATEGORY_FETCH_SUCCESS,
  TODO_CATEGORY_DELETE_FAIL,
  TODO_CATEGORY_DELETE_SUCCESS,
  TODO_CATEGORY_DELETE_REQUEST,
  TODO_CATEGORY_DETAIL_SUCCESS,
  TODO_CATEGORY_DETAIL_FAIL,
  TODO_CATEGORY_DETAIL_REQUEST,
  TODO_CATEGORY_UPDATE_SUCCESS,
  TODO_CATEGORY_UPDATE_REQUEST,
  TODO_CATEGORY_UPDATE_FAIL,
  TODO_CATEGORY_COMPLETE_SUCCESS,
  TODO_CATEGORY_COMPLETE_FAIL,
  TODO_CATEGORY_COMPLETE_REQUEST,
} from "../actionTypes";

interface ITodoCategory {
  title?: string;
  description?: string;
  completed?: string;
}

//Create todoCategory

export const createTodoCategory = (todoCategoryData: ITodoCategory) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_CATEGORY_CREATE_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        process.env.REACT_APP_API_URL + "/api/todo_categories",
        todoCategoryData,
        config
      );

      dispatch({
        type: TODO_CATEGORY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_CATEGORY_CREATE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch all todo_categories

export const fetchTodoCategorys = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_CATEGORY_FETCH_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/api/todo_categories",
        config
      );

      dispatch({
        type: TODO_CATEGORY_FETCH_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_CATEGORY_FETCH_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//delete a todoCategory

export const deleteTodoCategory = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_CATEGORY_DELETE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/todo_categories/${id}`,
        config
      );
      dispatch({
        type: TODO_CATEGORY_DELETE_SUCCESS,
        payload: data,
      });

      const { data: newData } = await axiosInstance.get(
        `/api/todo_categories`,
        config
      );
      dispatch({
        type: TODO_CATEGORY_FETCH_SUCCESS,
        payload: newData,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_CATEGORY_DELETE_FAIL,
        loading: false,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch a signle todoCategory
export const fetchTodoCategory = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_CATEGORY_DETAIL_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/todo_categories/${id}`,
        config
      );

      dispatch({
        type: TODO_CATEGORY_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_CATEGORY_DETAIL_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//UPDATE TODO_CATEGORY

export const updateTodoCategory = (
  id: string,
  todoCategoryData: ITodoCategory
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_CATEGORY_UPDATE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosInstance.put(
        `/api/todo_categories/${id}`,
        todoCategoryData,
        config
      );
      const { data: newData } = await axiosInstance.get(`/api/todo_categories`);
      dispatch({
        type: TODO_CATEGORY_UPDATE_SUCCESS,
        payload: newData,
      });
    } catch (error: any) {
      dispatch({
        type: TODO_CATEGORY_UPDATE_FAIL,
        loading: false,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//COMPLETE TODO_CATEGORY

export const completeTodoCategory = (id: string, completed: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: TODO_CATEGORY_COMPLETE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosInstance.put(
        `/api/todo_categories/${id}/completed`,
        { completed },
        config
      );
      const { data: newData } = await axiosInstance.get(`/api/todo_categories`);
      console.log(newData, "newData");
      dispatch({
        type: TODO_CATEGORY_COMPLETE_SUCCESS,
        payload: { ...newData, completed },
      });
    } catch (error: any) {
      dispatch({
        type: TODO_CATEGORY_COMPLETE_FAIL,
        loading: false,
        payload: error.response && error.response.data.message,
      });
    }
  };
};
