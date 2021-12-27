import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Todo from "./Todo";
import { fetchTodos, deleteTodo } from "../../redux/actions/todos/todoActions";
import Loading from "../Loading/Loading";

import { Heading, HeadingWithAction } from "../../styles/styles";

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
      <div className="row">
        <HeadingWithAction>
          <Heading className="uppercase">Today's Tasks</Heading>
          <Link to="/addtodo" className="uppercase">
            + Add Todo
          </Link>
        </HeadingWithAction>
        <div className="col">
          {todos && todos.length ? (
            todos.map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })
          ) : (
            <p>No Todos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
