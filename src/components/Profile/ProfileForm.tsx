import FormInput from "../FormInput/FormInput";
import React from "react";
import {
  Heading,
  HeadingWithoutAction,
  PrimaryButton,
} from "../../styles/styles";
import { useForm } from "react-hook-form";
import { RootStateOrAny, useDispatch } from "react-redux";
import _ from "lodash";
import { Dispatch } from "redux";
import { IUserDispatchActionData, IUserState } from "@types";
interface IProfileFormProps {
  formDispatchAction: (
    data: IUserDispatchActionData
  ) => (dispatch: Dispatch, getState: RootStateOrAny) => Promise<void>;
  onError: (err: any) => void;
  onSuccess: (res: any) => void;
  state?: Partial<IUserState>;
}
const ProfileForm: React.FC<IProfileFormProps> = (props: IProfileFormProps) => {
  const { formDispatchAction, onError, onSuccess, state } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const dispatch = useDispatch();

  //submit form
  const formSubmitHandler = ({ name, email }: any) => {
    const data = {
      ...(state && state._id && { _id: state._id }),
      name,
      email,
    };
    dispatch(formDispatchAction({ data, onSuccess, onError }));
  };
  return (
    <div>
      <HeadingWithoutAction>
        <Heading className="uppercase">Profile</Heading>
      </HeadingWithoutAction>
      <form>
        <fieldset>
          <FormInput
            type="text"
            id="name"
            placeholder="Name"
            defaultValue={state?.name}
            errorText={errors?.name?.message}
            {...register("name", {
              required: "Name is required",
            })}
          />
        </fieldset>
        <fieldset>
          <FormInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={state?.email}
            errorText={errors?.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
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
    </div>
  );
};

export default ProfileForm;
