import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/user.actions";
import ErrorMessage from "../../components/DisplayMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import _ from "lodash";
import FormInput from "../../components/FormInput/FormInput";
import { PrimaryButton } from "../../styles/styles";
import { Link } from "react-router-dom";
import ToastContainer from "../../components/ToastContainer/ToastContainer";
import { RouteComponentProps } from "react-router-dom";
import { UserInfoState } from "../../redux/store/store";

interface IChildProps extends RouteComponentProps {}

const Login: React.FC<IChildProps> = ({ history }) => {
  const dispatch = useDispatch();

  //Before login in we will check if you have login the we redirect you

  const {
    loading,
    data: userInfo,
    error,
  } = useSelector((state: RootStateOrAny) => state.userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //submit form
  const submitFormHandler = ({ email, password }: any) => {
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      history.push("/");
      window.location.reload();
    }
  }, [userInfo, history]);

  return (
    <div className="row h-screen flex items-center justify-center bg-bluish-200">
      <ToastContainer />
      <div className="col-lg-6 col-md-6 m-auto w-3/4 md:w-2/4 lg:w-1/3 bg-white rounded-xl shadow-lg relative overflow-hidden">
        {loading && (
          <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
            <Loading />
          </div>
        )}
        <div className="container">
          {error && <ErrorMessage message={error} />}
          <div className="border-b">
            <h1 className="text-center font-bold text-2xl my-4">
              <span className="text-green-500">TO</span>
              <span>DO</span> <span className="text-orange-300">+</span>
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(submitFormHandler)}
            className="container my-4"
          >
            <h1 className="font-light text-center text-2xl mb-3">Login</h1>
            <fieldset className="mb-5">
              <div className="form-group">
                <FormInput
                  type="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="on"
                  errorText={errors?.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email is invalid",
                    },
                  })}
                />
              </div>
              <div className="form-group">
                <FormInput
                  type="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="on"
                  errorText={errors?.password?.message}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>

              <PrimaryButton type="submit" className="w-full">
                Login
              </PrimaryButton>
            </fieldset>
          </form>
          <div className="border-t mt-2">
            <p className="text-center text-gray-500 py-4">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
