import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/user.actions";
import ErrorMessage from "../../components/DisplayMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import _ from "lodash";

const Login = ({ history }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  //Before login in we will check if you have login the we redirect you

  const { loading, userInfo, error } = useSelector((state) => state.userInfo);

  //submit form
  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  console.log(loading);

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      history.push("/");
      window.location.reload();
    }
  }, [userInfo]);

  return (
    <div className="row container-height">
      <div className="col-lg-6 col-md-6 m-auto">
        <div className="container">
          {loading && <Loading />}
          {error && <ErrorMessage error={error} />}
          <h1 className="text-center">Login</h1>
          <form onSubmit={submitFormHandler}>
            <fieldset>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>

              <button type="submit" className="btn btn-primary m-auto">
                Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
