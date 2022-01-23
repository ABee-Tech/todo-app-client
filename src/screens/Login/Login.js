import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/user.actions";
import ErrorMessage from "../../components/DisplayMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import _ from "lodash";
import FormInput from "../../components/FormInput/FormInput";
import { PrimaryButton } from "../../styles/styles";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  //Before login in we will check if you have login the we redirect you

  const {
    loading,
    data: userInfo,
    error,
  } = useSelector((state) => state.userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //submit form
  const submitFormHandler = ({ email, password }) => {
    dispatch(loginUser(email, password));
  };
  console.log(loading);

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      history.push("/");
      window.location.reload();
    }
  }, [userInfo, history]);

  return (
    <div className="row container-height">
      <div className="col-lg-6 col-md-6 m-auto">
        <div className="container">
          {loading && <Loading />}
          {error && <ErrorMessage error={error} />}
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleSubmit(submitFormHandler)}>
            <fieldset>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
