import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./screens/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TodoDetail from "./components/Todos/TodoDetail";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/todo/:id" component={TodoDetail} />
        </Navigation>
      </BrowserRouter>
    </>
  );
};

export default App;
