import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Todo from "./Todo";

import { fetchTodos } from "../../redux/actions/todo.actions";
import { Heading, HeadingWithAction } from "../../styles/styles";
import InfoMessage from "../DisplayMessage/InfoMessage";

function TodaysTasks() {
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state.todosList);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  if (loading) return <Loading className="text-grey-500" />;
  return (
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
          <InfoMessage message={"No tasks?? Hurray!!"} />
        )}
      </div>
    </div>
  );
}

export default TodaysTasks;
