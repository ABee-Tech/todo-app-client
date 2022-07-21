import React from "react";
import { createTodoCategory } from "../../redux/actions/todoCategory.actions";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../../styles/styles";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import ColorSelect, {
  ColorSelectWithControl,
} from "../ColorSelect/ColorSelect";

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
    control,
  } = useForm();

  //submit form
  const formSubmitHandler = ({ name, color }: IFormData) => {
    const data = {
      name,
      color,
    };
    console.log(data, "data");
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
        <ColorSelectWithControl
          control={control}
          id="color"
          options={[
            { label: "Vivid Malachite", value: "#07bc0c" },
            { label: "Carmine Pink", value: "#e74c3c" },
            { label: "Tufts Blue", value: "#3498db" },
            { label: "Royal Pink", value: "#e84393" },
            { label: "Jonquil", value: "#f1c40f" },
            { label: "UFO Green", value: "#2ecc71" },
            { label: "Deep Lilac", value: "#9b59b6" },
          ]}
          label="Color"
          rules={{ required: "Color is required" }}
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
