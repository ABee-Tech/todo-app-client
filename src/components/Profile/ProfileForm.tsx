import FormInput from "../FormInput/FormInput";
import React, { useRef } from "react";
import {
  Heading,
  HeadingWithoutAction,
  PrimaryButton,
} from "../../styles/styles";
import { useForm } from "react-hook-form";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Dispatch } from "redux";
import { IImage, IUserDispatchActionData, IUserState } from "@types";
import { BsCamera } from "react-icons/bs";
import { updateProfilePicture } from "src/redux/actions/user.actions";
import { RootState } from "src/redux/store/store";

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
  const profilePictureUploadRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = new FormData();
    if (event?.target?.files && event?.target?.files.length > 0) {
      data.append("upload", event?.target?.files?.[0]);
      dispatch(updateProfilePicture({ data, onSuccess, onError }));
    }
    console.log(event?.target?.files?.[0]?.name);
  };

  const { data: userData } = useSelector((state: RootState) => state.user);
  const avatarURL =
    "https://ui-avatars.com/api/?name=" +
    userData?.name?.replace(" ", "+") +
    "&size=" +
    110;
  const profilePicture = userData
    ? import.meta.env.VITE_UPLOADS_URL +
      "/" +
      (userData?.profile_picture as IImage)?.img?.imageUrl
    : avatarURL;
  return (
    <div>
      <HeadingWithoutAction className="mb-4">
        <Heading className="uppercase">Profile</Heading>
      </HeadingWithoutAction>
      <form>
        <div className="block md:flex">
          <div
            className="mr-4 mb-4 relative"
            style={{ width: "110px", height: "110px" }}
          >
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={profilePicture}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="absolute bottom-0 right-0">
              <input
                ref={profilePictureUploadRef}
                onChange={handleProfilePictureUpload}
                type="file"
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="flex justify-center items-center rounded-full w-8 h-8 bg-darkblue-900"
                onClick={() => profilePictureUploadRef.current?.click()}
              >
                <BsCamera color="white" />
              </button>
            </div>
          </div>
          <div className="flex-1">
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
          </div>
        </div>
        <PrimaryButton
          disabled={!_.isEmpty(errors)}
          onClick={handleSubmit(formSubmitHandler)}
          className=""
        >
          Submit
        </PrimaryButton>
      </form>
    </div>
  );
};

export default ProfileForm;
