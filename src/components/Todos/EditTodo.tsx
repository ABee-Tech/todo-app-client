import React from "react";
import { updateTodo } from "../../redux/actions/todo.actions";
import { ITodoState } from "@types";
import _ from "lodash";
import TodoForm from "./TodoForm";

interface IEditTodoProps {
  setOpen: any;
  state?: ITodoState;
}

const EditTodo = ({ setOpen, state: todoEditState }: IEditTodoProps) => {
  return (
    <>
      <TodoForm
        setOpen={setOpen}
        formDispatchAction={updateTodo}
        onError={() => {}}
        onSuccess={() => {}}
        state={todoEditState}
      />
    </>
  );
};

export default EditTodo;
