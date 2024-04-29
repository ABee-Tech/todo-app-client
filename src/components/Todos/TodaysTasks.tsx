import React, { InputHTMLAttributes, useEffect, useState } from "react";
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

interface ISearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  className?: string;
  onClear?: () => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  containerClassName,
  className,
  value,
  onChange,
  onClear,
}) => {
  return (
    <>
      <div
        className={`overflow-hidden flex outline-1 outline-blue-100 border-none rounded-md flex-row items-center cursor-default bg-grey-200 ${containerClassName}`}
      >
        <BiSearch fontSize={20} className="h-6 w-6 m-1 text-grey-500" />
        <div className="flex flex-row items-center">
          <input
            type="text"
            placeholder="Search"
            className={`search-input py-1 outline-none w-full text-grey-600 bg-transparent ${className}`}
            name="search"
            id="search"
            value={value}
            onChange={onChange}
          />
          <BiX
            fontSize={20}
            className="h-6 w-6 m-1 text-grey-400 hover:text-grey-500 cursor-pointer"
            onClick={onClear}
          />
        </div>
      </div>
    </>
  );
};

function TodaysTasks() {
  const [filters, setFilters] = useState<{ keyword: string }>({ keyword: "" });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {
    data: todos,
    loading,
    error,
  } = useSelector((state: RootState) => state.todoList);
  const { selected_category_id } = useSelector(
    (state: RootState) => state.selectedTodoCategory
  );
  useEffect(() => {
    dispatch(
      fetchTodos({
        keyword: filters.keyword,
        category_id: selected_category_id,
      })
    );
  }, [dispatch, filters.keyword, selected_category_id]);
  return (
    <div className="flex flex-col overflow-hidden">
      <Modal title="Add Todo" open={showModal} setOpen={setShowModal}>
        <AddTodo setOpen={setShowModal} />
      </Modal>
      <HeadingWithAction className="flex flex-row items-center">
        <Heading className="uppercase">Today's Tasks</Heading>
        <div className="flex flex-row">
          <SearchInput
            containerClassName="mr-4 dark:bg-slate-700"
            value={filters.keyword}
            onChange={(e) =>
              setFilters((prevState) => ({
                ...prevState,
                keyword: e.target.value,
              }))
            }
            onClear={() => {
              setFilters((prevState) => ({
                ...prevState,
                keyword: "",
              }));
            }}
          />
          <LinkButton onClick={() => setShowModal(true)}>+ Add Todo</LinkButton>
        </div>
      </HeadingWithAction>
      <div className="overflow-auto">
        {error.status !== 404 && todos && todos.length ? (
          todos.map((todo: ITodoState) => {
            return <Todo key={todo._id} todo={todo} />;
          })
        ) : (
          <InfoMessage
            message={
              error.status === 404
                ? "Sorry, no task found with '" + filters.keyword + "'"
                : "No tasks?? Hurray!!"
            }
          />
        )}
      </div>
    </div>
  );
}

export default TodaysTasks;
