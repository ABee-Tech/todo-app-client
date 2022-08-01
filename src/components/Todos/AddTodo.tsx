import React from "react";
import { createTodo } from "../../redux/actions/todo.actions";
import _ from "lodash";
import TodoForm from "./TodoForm";

interface IAddTodoProps {
  setOpen: any;
}

const AddTodo = ({ setOpen }: IAddTodoProps) => {
  return (
    <>
      <TodoForm
        setOpen={setOpen}
        formDispatchAction={createTodo}
        onError={() => {}}
        onSuccess={() => {}}
      />
    </>
  );
};

export default AddTodo;
