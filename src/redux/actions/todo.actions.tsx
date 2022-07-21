import { axiosInstance } from "../../utils/axios";
import { Dispatch } from "redux";
import { ITodoState } from "@types";
import {
  todoCompleteFail,
  todoCompleteRequest,
  todoCompleteSuccess,
  todoCreateFail,
  todoCreateRequest,
  todoCreateSuccess,
  todoDeleteFail,
  todoDeleteRequest,
  todoDeleteSuccess,
  todoFail,
  todoListFetchFail,
  todoListFetchRequest,
  todoListFetchSuccess,
  todoRequest,
  todoSuccess,
} from "../reducers/todo.reducers";
import { fetchTodoCategories } from "./todoCategory.actions";
import { toast } from "react-toastify";

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
      const { data } = await axiosInstance.post("/todos", todoData, config);

      dispatch(todoCreateSuccess(data));
      toast.success("Todo added successfully");

      dispatch<any>(fetchTodoCategories());
    } catch (error: any) {
      toast.error(`Sorry! ${error.response && error.response.data.message}`);
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
      const { data } = await axiosInstance.get("/todos", config);

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
      dispatch(todoDeleteRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosInstance.delete(`/todos/${id}`, config);
      dispatch(todoDeleteSuccess(id));
      dispatch<any>(fetchTodoCategories());
    } catch (error: any) {
      dispatch(todoDeleteFail(error.response && error.response.data.message));
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
      const { data } = await axiosInstance.get(`/todos/${id}`, config);

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
      const { data } = await axiosInstance.put(
        `/todos/${id}/completed`,
        { completed },
        config
      );
      dispatch(todoCompleteSuccess(data));
      dispatch<any>(fetchTodoCategories());
    } catch (error: any) {
      dispatch(todoCompleteFail(error.response && error.response.data.message));
    }
  };
};
