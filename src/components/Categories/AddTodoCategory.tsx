import React from "react";
import { createTodoCategory } from "../../redux/actions/todoCategory.actions";
import TodoCategoryForm from "./TodoCategoryForm";

interface IAddTodoCategoryProps {
  setOpen: any;
}

const AddTodoCategory = ({ setOpen }: IAddTodoCategoryProps) => {
  return (
    <>
      <TodoCategoryForm
        setOpen={setOpen}
        formDispatchAction={createTodoCategory}
        onError={() => {}}
        onSuccess={() => {}}
      />
    </>
  );
};

export default AddTodoCategory;
