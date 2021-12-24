import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Todo from "./Todo";
import { fetchTodos, deleteTodo } from "../../redux/actions/todos/todoActions";
import Loading from "../Loading/Loading";

import tw from "twin.macro";
import styled from "styled-components";

const Heading = styled.h1`
  ${tw`text-sm font-bold text-gray-400`}
`;

const Todos = () => {
  const dispatch = useDispatch();

  const todoslist = useSelector((state) => state.todosList);
  const { todos, loading } = todoslist;

  const handlerDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const isAdmin = useSelector((state) => state?.userLogin?.userInfo?.role);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div>
      {loading && <Loading />}
      {todos !== undefined && todos.length === 0 ? (
        <Heading className="uppercase">No tasks for today.</Heading>
      ) : (
        <div className="row">
          <Heading className="uppercase">Today's Tasks</Heading>
          <div className="col">
            {todos &&
              todos.map((todo) => {
                return <Todo key={todo.id} todo={todo} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
