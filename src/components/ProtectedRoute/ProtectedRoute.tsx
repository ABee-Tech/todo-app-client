import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import _ from "lodash";

interface IProtectedRouteProps extends RouteProps {
  component: any;
}

function ProtectedRoute({
  component: Component,
  ...rest
}: IProtectedRouteProps) {
  const { data: user } = useSelector((state: RootStateOrAny) => state.user);

  const isAuthenticated = !_.isEmpty(user);
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
