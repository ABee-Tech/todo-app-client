import React, { Fragment, useEffect, useState } from "react";
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
import { BiSearch, BiX } from "react-icons/bi";
import { Transition } from "@headlessui/react";

interface ISearchInputProps {
  containerClassName?: string;
  className?: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  containerClassName,
  className,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <div
        className={`overflow-hidden flex outline-1 outline-blue-100 border-none rounded-md flex-row items-center ${
          !isShowing
            ? "cursor-pointer hover:bg-grey-200 transition-all duration-200 ease-in-out"
            : "cursor-default bg-grey-200"
        } ${containerClassName}`}
        onClick={() => {
          !isShowing && setIsShowing(!isShowing);
        }}
      >
        <BiSearch fontSize={20} className="h-6 w-6 m-1 text-grey-500" />
        <Transition
          as={Fragment}
          show={isShowing}
          enter="transform transition duration-[500ms]"
          enterFrom="opacity-0 translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="transform duration-[500ms] transition ease-in-out"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-full"
        >
          <div className="flex flex-row items-center">
            <input
              type="text"
              placeholder="Search"
              className={`search-input py-1 outline-none w-full text-grey-600 bg-transparent ${className}`}
              name="search"
              id="search"
            />
            <BiX
              fontSize={20}
              className="h-6 w-6 m-1 text-grey-400 hover:text-grey-500 cursor-pointer"
              onClick={() => setIsShowing(false)}
            />
          </div>
        </Transition>
      </div>
    </>
  );
};

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
    <div className="flex flex-col overflow-hidden">
      <Modal title="Add Todo" open={showModal} setOpen={setShowModal}>
        <AddTodo setOpen={setShowModal} />
      </Modal>
      <HeadingWithAction className="flex flex-row items-center">
        <Heading className="uppercase">Today's Tasks</Heading>
        <div className="flex flex-row">
          <SearchInput containerClassName="mr-4" />
          <LinkButton onClick={() => setShowModal(true)}>+ Add Todo</LinkButton>
        </div>
      </HeadingWithAction>
      <div className="overflow-auto">
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
