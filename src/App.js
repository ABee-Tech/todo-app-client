import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Register from "./components/Register/Register";
import TodoDetail from "./components/Todos/TodoDetail";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/todo/:id" component={TodoDetail} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </>
  );
};

export default App;
