import React, { useState } from "react";
import { createTodo } from "../../redux/actions/todo.actions";
import { useDispatch, useSelector } from "react-redux";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import { PrimaryButton } from "../../styles/styles";

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
    <form onSubmit={formSubmitHandler}>
      <fieldset>
        <InputWithLabel
          label="Title"
          value={title}
          onChangeText={setTitle}
          type="text"
          id="title"
          placeholder="Title"
        />
        <InputWithLabel
          label="Description"
          value={description}
          onChangeText={setDescription}
          type="text"
          id="description"
          placeholder="Description"
        />
      </fieldset>
      <PrimaryButton onClick={formSubmitHandler}>Add</PrimaryButton>
    </form>
  );
};

export default AddTodo;
