import { axiosInstance } from "../../utils/axios";
import { Dispatch } from "redux";
import {
  todoCategoryListFetchRequest,
  todoCategoryListFetchSuccess,
  todoCategoryListFetchFail,
  todoCategoryCreateRequest,
  todoCategoryCreateSuccess,
  todoCategoryCreateFail,
  todoCategoryUpdateRequest,
  todoCategoryUpdateSuccess,
  todoCategoryUpdateFail,
  todoCategoryDeleteRequest,
  todoCategoryDeleteSuccess,
  todoCategoryDeleteFail,
} from "../reducers/todoCategory.reducers";
import { toast } from "react-toastify";
import { ITodoCategoryDispatchActionData } from "@types";
import { fetchTodos } from "./todo.actions";

interface ITodoCategory {
  name?: string;
  color?: string;
}

//Create todoCategory

export const createTodoCategory = (
  todoCategoryDispatchActionData: ITodoCategoryDispatchActionData
) => {
  return async (dispatch: Dispatch) => {
    const {
      data: todoCategoryData,
      onSuccess,
      onError,
    } = todoCategoryDispatchActionData;
    try {
      dispatch(todoCategoryCreateRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.post(
        process.env.REACT_APP_API_URL + "/todo_categories",
        todoCategoryData,
        config
      );

      const { data } = res;

      onSuccess && onSuccess(res);
      toast.success("Todo category created successfully");
      dispatch(todoCategoryCreateSuccess(data));
    } catch (error: any) {
      onError && onError(error);
      toast.error(`Sorry! ${error.response.data.message}`);
      dispatch(todoCategoryCreateFail(error.response.data.message));
    }
  };
};

//Fetch all todo_categories

export const fetchTodoCategories = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(todoCategoryListFetchRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/todo_categories",
        config
      );

      dispatch(todoCategoryListFetchSuccess(data));
    } catch (error: any) {
      dispatch(todoCategoryListFetchFail(error.response.data.message));
    }
  };
};

//delete a todoCategory

export const deleteTodoCategory = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(todoCategoryDeleteRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosInstance.delete(`/todo_categories/${id}`, config);

      dispatch(todoCategoryDeleteSuccess(id));
      dispatch<any>(fetchTodos());
    } catch (error: any) {
      dispatch(todoCategoryDeleteFail(error.response.data.message));
    }
  };
};

//UPDATE TODO_CATEGORY

export const updateTodoCategory = (
  todoDispatchActionData: ITodoCategoryDispatchActionData
) => {
  return async (dispatch: Dispatch) => {
    const {
      data: todoCategoryData,
      onSuccess,
      onError,
    } = todoDispatchActionData;
    try {
      dispatch(todoCategoryUpdateRequest());

      const id = todoCategoryData._id;
      delete todoCategoryData._id;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.put(
        `/todo_categories/${id}`,
        todoCategoryData,
        config
      );

      const { data } = res;

      dispatch(todoCategoryUpdateSuccess(data));

      onSuccess && onSuccess(res);
      toast.success("Todo category edited successfully");

      dispatch<any>(fetchTodos());
    } catch (error: any) {
      onError && onError(error);
      toast.error(`Sorry! ${error.response && error.response.data.message}`);
      dispatch(todoCategoryUpdateFail(error.response.data.message));
    }
  };
};
