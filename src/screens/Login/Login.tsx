import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/user.actions";
import ErrorMessage from "../../components/DisplayMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import _ from "lodash";
import FormInput from "../../components/FormInput/FormInput";
import { PrimaryButton, SecondaryButton } from "../../styles/styles";
import { Link } from "react-router-dom";
import ToastContainer from "../../components/ToastContainer/ToastContainer";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../redux/store/store";
// import { UserInfoState } from "../../redux/store/store";

interface IChildProps extends RouteComponentProps {}

const Login: React.FC<IChildProps> = ({ history }) => {
  const dispatch = useDispatch();

  //Before login in we will check if you have login the we redirect you

  const {
    loading,
    data: user,
    error,
  } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //submit form
  const submitFormHandler = ({ email, password }: any) => {
    dispatch(loginUser(email, password));
  };

  const onRegisterClickHandler = () => {
    history.push("/register");
  };

  useEffect(() => {
    if (!_.isEmpty(user)) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="row h-screen flex items-center justify-center">
      <ToastContainer />
      <section className="h-full bg-green-50 dark:bg-neutral-700 w-full">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="/logo.png"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Tusky
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit(submitFormHandler)}>
                        <p className="mb-4">Please login to your account</p>
                        {/* <!--Username input--> */}
                        <FormInput
                          type="text"
                          label="Username"
                          className="mb-4"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Email is invalid",
                            },
                          })}
                        ></FormInput>

                        {/* <!--Password input--> */}
                        <FormInput
                          type="password"
                          label="Password"
                          className="mb-4"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        ></FormInput>

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <PrimaryButton className="w-full" type="submit">
                            Login
                          </PrimaryButton>

                          {/* <!--Forgot password link--> */}
                          <a href="#!">Forgot password?</a>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Don't have an account?</p>
                          <SecondaryButton
                            className="inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                            onClick={onRegisterClickHandler}
                          >
                            Register
                          </SecondaryButton>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description--> */}
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12 w-full">
                      <ol className="text-3xl flex flex-col items-center w-full">
                        <li className="mb-4">⏰ Reminders ⏰</li>
                        <li className="mb-4">🪄 Todoist 🪄</li>
                        <li className="mb-4">💾 Todo Cloud 💾</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
