import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../styles/styles";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import {
  IDropdownSelectOption,
  ITodoDispatchActionData,
  ITodoState,
} from "@types";
import { SelectWithLabelWithControl } from "../SelectWithLabel/SelectWithLabel";
import { RootState } from "src/redux/store/store";
import _ from "lodash";
import { Dispatch } from "redux";

interface ITodoFormProps {
  setOpen: any;
  formDispatchAction: (
    data: ITodoDispatchActionData
  ) => (dispatch: Dispatch, getState?: RootStateOrAny) => Promise<void>;
  onError: (err: any) => void;
  onSuccess: (res: any) => void;
  state?: ITodoState;
}

const TodoForm = (props: ITodoFormProps) => {
  const { setOpen, formDispatchAction, onError, onSuccess, state } = props;
  const [todoCategoryList, setTodoCategoryList] = useState<
    IDropdownSelectOption[]
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
  const formSubmitHandler = ({ title, category }: any) => {
    const data = {
      ...(state && state._id && { _id: state._id }),
      title,
      category: category.value,
    };
    dispatch(formDispatchAction({ data, onSuccess, onError }));
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
          defaultValue={state?.title}
          errorText={errors?.title?.message}
          {...register("title", {
            required: "Todo is required",
          })}
        />
      </fieldset>
      <fieldset>
        <SelectWithLabelWithControl
          options={
            todoCategoryList && todoCategoryList[0] ? [...todoCategoryList] : []
          }
          defaultValue={
            (state?.category && {
              value: state?.category?._id,
              label: state?.category?.name,
            }) ||
            undefined
          }
          control={control}
          rules={{ required: "Category is required" }}
          id="category"
          label="Category"
          errorText={errors?.category?.message}
        />
      </fieldset>
      <PrimaryButton
        disabled={!_.isEmpty(errors)}
        onClick={handleSubmit(formSubmitHandler)}
        className="w-full"
      >
        Submit
      </PrimaryButton>
    </form>
  );
};

export default TodoForm;
