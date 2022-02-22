import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import Todo from "./Todo";

import { fetchTodos } from "../../redux/actions/todo.actions";
import { Heading, HeadingWithAction, LinkButton } from "../../styles/styles";
import InfoMessage from "../DisplayMessage/InfoMessage";
import Modal from "../Modal/Modal";
import AddTodo from "./AddTodo";
import { RootState } from "../../redux/store/store";
import { ITodoState } from "@types";

function TodaysTasks() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { data: todos, loading } = useSelector(
    (state: RootState) => state.todoList
  );
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  // if (loading) return <Loading className="text-grey-500" />;
  return (
    <div className="row">
      <Modal title="Add Todo" open={showModal} setOpen={setShowModal}>
        <AddTodo setOpen={setShowModal} />
      </Modal>
      <HeadingWithAction>
        <Heading className="uppercase">Today's Tasks</Heading>
        <LinkButton onClick={() => setShowModal(true)}>+ Add Todo</LinkButton>
      </HeadingWithAction>
      <div className="col">
        {todos && todos.length ? (
          todos.map((todo: ITodoState) => {
            return <Todo key={todo._id} todo={todo} />;
          })
        ) : (
          <InfoMessage message={"No tasks?? Hurray!!"} />
        )}
      </div>
    </div>
  );
}

export default TodaysTasks;
