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

interface ITodoCategory {
  name?: string;
  color?: string;
}

//Create todoCategory

export const createTodoCategory = (todoCategoryData: ITodoCategory) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(todoCategoryCreateRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        process.env.REACT_APP_API_URL + "/todo_categories",
        todoCategoryData,
        config
      );
      toast.success("Todo category created successfully");
      dispatch(todoCategoryCreateSuccess(data));
    } catch (error: any) {
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
    } catch (error: any) {
      dispatch(todoCategoryDeleteFail(error.response.data.message));
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
      dispatch(todoCategoryUpdateRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosInstance.put(
        `/todo_categories/${id}`,
        todoCategoryData,
        config
      );
      const { data: newData } = await axiosInstance.get(`/todo_categories`);
      dispatch(todoCategoryUpdateSuccess(newData));
    } catch (error: any) {
      dispatch(todoCategoryUpdateFail(error.response.data.message));
    }
  };
};
