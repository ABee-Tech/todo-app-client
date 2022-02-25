import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../Todos/Todo";

import { fetchTodos } from "../../redux/actions/todo.actions";
import { Heading, HeadingWithAction, LinkButton } from "../../styles/styles";
import InfoMessage from "../DisplayMessage/InfoMessage";
import Modal from "../Modal/Modal";
import AddTodo from "../Todos/AddTodo";
import { ITodoState } from "@types";
import { RootState } from "../../redux/store/store";

function AllCategories() {
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
        <Heading className="uppercase">All Categories</Heading>
        <LinkButton onClick={() => setShowModal(true)}>
          + Add Category
        </LinkButton>
      </HeadingWithAction>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {todos && todos.length ? (
          todos.map((todo: ITodoState) => {
            return <Todo className="col-3" key={todo._id} todo={todo} />;
          })
        ) : (
          <InfoMessage message={"No tasks?? Hurray!!"} />
        )}
      </div>
    </div>
  );
}

export default AllCategories;
