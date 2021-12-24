import React, { useState } from "react";
import { createTodo } from "../../redux/actions/todos/todoActions";
import { useDispatch, useSelector } from "react-redux";

const AddTodo = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //Get the user id from store

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  //dispatch action
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    const data = {
      title,
      description,
      createdBy: userInfo && userInfo._id,
    };
    e.preventDefault();
    dispatch(createTodo(data));
    history.push("/");
  };
  return (
    <div className="container">
      <div className="">
        <h1 className="text-center">Add Todo</h1>
        <form onSubmit={formSubmitHandler}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Todo description"
              />
            </div>
            <button type="submit" className="btn btn-warning m-auto">
              Create Todo
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
