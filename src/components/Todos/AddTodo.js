import React from "react";
import { createTodo } from "../../redux/actions/todo.actions";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../../styles/styles";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

const AddTodo = ({ setOpen }) => {
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
    dispatch(createTodo(data));
    setOpen(false);
  };

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
      <PrimaryButton
        onClick={handleSubmit(formSubmitHandler)}
        className="w-full"
      >
        Add
      </PrimaryButton>
    </form>
  );
};

export default AddTodo;
