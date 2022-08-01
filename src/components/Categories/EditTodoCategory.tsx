import React from "react";
import { updateTodoCategory } from "../../redux/actions/todoCategory.actions";
import { ITodoCategoryState } from "@types";
import _ from "lodash";
import TodoCategoryForm from "./TodoCategoryForm";

interface IEditTodoCategoryProps {
  setOpen: any;
  state?: ITodoCategoryState;
}

const EditTodoCategory = ({
  setOpen,
  state: todoCategoryEditState,
}: IEditTodoCategoryProps) => {
  return (
    <>
      <TodoCategoryForm
        setOpen={setOpen}
        formDispatchAction={updateTodoCategory}
        onError={() => {}}
        onSuccess={() => {}}
        state={todoCategoryEditState}
      />
    </>
  );
};

export default EditTodoCategory;
