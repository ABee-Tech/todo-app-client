import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";

function ProtectedRoute({ component: Component, ...rest }) {
  const { data: userInfo } = useSelector((state) => state.userInfo);

  const isAuthenticated = !_.isEmpty(userInfo);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
