import React, { useEffect, useState } from "react";
import { createTodo } from "../../redux/actions/todo.actions";
import { useDispatch, useSelector } from "react-redux";
import { SecondaryButton } from "../../styles/styles";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { ITodoState } from "@types";
import Select from "../SelectWithLabel/SelectWithLabel";
import { RootState } from "src/redux/store/store";
import _ from "lodash";

interface IEditTodoProps {
  setOpen: any;
  state?: ITodoState;
}
interface ITodoCategoryOption {
  label: string;
  value: string;
}

const EditTodo = ({ setOpen, state }: IEditTodoProps) => {
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
  } = useForm();

  //submit form
  const formSubmitHandler = ({ title, category }: Partial<ITodoState>) => {
    const data = {
      title,
      category,
    };
    console.log(data, "data");
    dispatch(createTodo(data));
    setOpen(false);
  };

  console.log(state, "state");

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
          defaultValue={state?.title || ""}
          {...register("title", {
            required: "Todo is required",
          })}
        />
      </fieldset>
      <fieldset>
        {/* {_.isEmpty(todoCategoryList) ? (
          <Select
            disabled={true}
            options={[{ label: "No categories", value: "" }]}
            label="Category"
            errorText={errors?.category?.message}
            {...register("category", {
              required: "Category is required",
            })}
          />
        ) : (
          <Select
            options={[{ label: "", value: "" }, ...todoCategoryList]}
            label="Category"
            errorText={errors?.category?.message}
            defaultValue={state?.category?._id || ""}
            {...register("category", {
              required: "Category is required",
            })}
          />
        )} */}
      </fieldset>
      <SecondaryButton
        disabled={errors?.title || errors?.category}
        onClick={handleSubmit(formSubmitHandler)}
        className="w-full"
      >
        Edit
      </SecondaryButton>
    </form>
  );
};

export default EditTodo;
