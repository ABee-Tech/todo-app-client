import React, { useEffect, useState } from "react";
import { createTodo } from "../../redux/actions/todo.actions";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../styles/styles";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { ITodoState } from "@types";
import { SelectWithLabelWithControl } from "../SelectWithLabel/SelectWithLabel";
import { RootState } from "src/redux/store/store";
import _ from "lodash";

interface IAddTodoProps {
  setOpen: any;
}
interface ITodoCategoryOption {
  label: string;
  value: string;
}

const AddTodo = ({ setOpen }: IAddTodoProps) => {
  const [todoCategoryList, setTodoCategoryList] = useState<
    ITodoCategoryOption[]
  >([]);

  const dispatch = useDispatch();

  const { data: todoCategories } = useSelector(
    (state: RootState) => state.todoCategoryList
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  //submit form
  const formSubmitHandler = ({ title, category }: Partial<ITodoState>) => {
    const data = {
      title,
      category: category.value,
    };
    console.log(data, "data");
    dispatch(createTodo(data));
    setOpen(false);
  };

  useEffect(() => {
    setTodoCategoryList(
      todoCategories.map((category: any) => ({
        label: category.name,
        value: category._id,
      }))
    );
  }, []);

  return (
    <form>
      <fieldset>
        <FormInput
          type="text"
          id="title"
          placeholder="Todo"
          errorText={errors?.title?.message}
          {...register("title", {
            required: "Todo is required",
          })}
        />
      </fieldset>
      <fieldset>
        <SelectWithLabelWithControl
          options={
            todoCategoryList && todoCategoryList[0]
              ? [...todoCategoryList]
              : [{ value: "", label: "" }]
          }
          control={control}
          rules={{ required: "Category is required" }}
          id="category"
          label="Category"
          errorText={errors?.category?.message}
        />
      </fieldset>
      <PrimaryButton
        disabled={errors?.title || errors?.category}
        onClick={handleSubmit(formSubmitHandler)}
        className="w-full"
      >
        Add
      </PrimaryButton>
    </form>
  );
};

export default AddTodo;
