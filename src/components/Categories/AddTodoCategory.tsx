import React from "react";
import { createTodoCategory } from "../../redux/actions/todoCategory.actions";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../../styles/styles";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

interface IAddTodoCategoryProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormData {
  name?: string;
  color?: string;
}

const AddTodoCategory = ({ setOpen }: IAddTodoCategoryProps) => {
  //dispatch action
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //submit form
  const formSubmitHandler = ({ name, color }: IFormData) => {
    const data = {
      name,
      color,
    };
    dispatch(createTodoCategory(data));
    setOpen(false);
  };

  return (
    <form>
      <fieldset>
        <FormInput
          type="text"
          id="name"
          placeholder="Todo Category"
          errorText={errors?.name?.message}
          {...register("name", {
            required: "Todo category is required",
          })}
        />
      </fieldset>
      <fieldset>
        <FormInput
          type="text"
          id="color"
          placeholder="Color"
          errorText={errors?.color?.message}
          {...register("color", {
            required: "Color is required",
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
