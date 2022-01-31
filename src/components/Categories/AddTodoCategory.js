import React from "react";
import { createTodoCategory } from "../../redux/actions/todo.actions";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../../styles/styles";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

const AddTodoCategory = ({ setOpen }) => {
  //dispatch action
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //submit form
  const formSubmitHandler = ({ title }) => {
    const data = {
      title,
    };
    dispatch(createTodoCategory(data));
    setOpen(false);
  };

  return (
    <form>
      <fieldset>
        <FormInput
          type="text"
          id="title"
          placeholder="TodoCategory"
          errorText={errors?.title?.message}
          {...register("title", {
            required: "TodoCategory is required",
          })}
        />
      </fieldset>
      <PrimaryButton
        onClick={handleSubmit(formSubmitHandler)}
        className="w-full"
      >
        Add
      </PrimaryButton>
    </form>
  );
};

export default AddTodoCategory;
