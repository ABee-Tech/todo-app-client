import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./screens/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddTodo from "./components/Todos/AddTodo";
import TodoDetail from "./components/Todos/TodoDetail";
import Modal from "./components/Modal/Modal";

const App = () => {
  const buttons = [
    {
      name: "Add",
      onClick: () => {
        console.log("Add");
      },
      onRight: true,
    },
  ];
  return (
    <>
      <Modal
        title="Add Todo"
        description="This will permanently deactivate your account"
        buttons={buttons}
      >
        <AddTodo />
      </Modal>
      <BrowserRouter>
        <Navigation>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/addtodo" component={AddTodo} />
          <Route exact path="/todo/:id" component={TodoDetail} />
        </Navigation>
      </BrowserRouter>
    </>
  );
};

export default App;
