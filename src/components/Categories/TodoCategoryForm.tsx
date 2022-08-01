import React from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../../styles/styles";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import {
  IDropdownSelectOption,
  ITodoCategoryDispatchActionData,
  ITodoCategoryState,
} from "@types";
import _ from "lodash";
import { Dispatch } from "redux";
import { ColorSelectWithControl } from "../../components/ColorSelect/ColorSelect";

interface ITodoCategoryFormProps {
  setOpen: any;
  formDispatchAction: (
    data: ITodoCategoryDispatchActionData
  ) => (dispatch: Dispatch) => Promise<void>;
  onError: (err: any) => void;
  onSuccess: (res: any) => void;
  state?: ITodoCategoryState;
}

const TodoCategoryForm = (props: ITodoCategoryFormProps) => {
  const { setOpen, formDispatchAction, onError, onSuccess, state } = props;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  //submit form
  const formSubmitHandler = ({ name, color }: any) => {
    const data = {
      ...(state?._id && { _id: state._id }),
      name,
      color: color.value,
    };
    console.log(data, "data");
    dispatch(formDispatchAction({ data, onSuccess, onError }));
    setOpen(false);
  };

  const colors: IDropdownSelectOption[] = [
    { label: "Vivid Malachite", value: "#07bc0c" },
    { label: "Carmine Pink", value: "#e74c3c" },
    { label: "Tufts Blue", value: "#3498db" },
    { label: "Royal Pink", value: "#e84393" },
    { label: "Jonquil", value: "#f1c40f" },
    { label: "UFO Green", value: "#2ecc71" },
    { label: "Deep Lilac", value: "#9b59b6" },
  ];

  return (
    <form>
      <fieldset>
        <FormInput
          type="text"
          id="name"
          defaultValue={state?.name}
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
          defaultValue={colors.find((c) => c.value === state?.color)}
          options={colors}
          label="Color"
          rules={{ required: "Color is required" }}
          errorText={errors?.color?.message}
        />
      </fieldset>
      <PrimaryButton
        disabled={!_.isEmpty(errors)}
        onClick={handleSubmit(formSubmitHandler)}
        className="w-full"
      >
        Sumbit
      </PrimaryButton>
    </form>
  );
};

export default TodoCategoryForm;
