import React, { useState, useEffect, MouseEvent } from "react";
import { deleteTodo, completeTodo } from "../../redux/actions/todo.actions";
import { useDispatch } from "react-redux";
import { BsCheckLg } from "react-icons/bs";
import { BiTrash, BiEdit } from "react-icons/bi";
import styled from "styled-components";
import tw from "twin.macro";
import { ITodoState } from "@types";
import Modal from "../Modal/Modal";
import EditTodo from "./EditTodo";

const TodoHolder = styled.span`
${tw`font-semibold overflow-hidden relative flex items-center`}
  &:hover .strike {
    ${tw`right-0`}
`;

const CheckCircle = styled.div<{ completed: boolean; categoryColor: string }>`
  ${tw`h-5 w-5 rounded-full flex justify-center items-center mr-2`} border: 2.5px solid 
${(props) => props.categoryColor};
  background-color: ${(props) => props.completed && props.categoryColor};
`;

interface ITodoProps {
  todo: ITodoState;
  className?: string;
}

const Todo: React.FC<ITodoProps> = ({
  todo,
  className,
}: ITodoProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleCheck = (e: MouseEvent) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    dispatch(completeTodo(todo._id, !isChecked));
  };

  useEffect(() => {
    setIsChecked(todo.completed);
  }, [todo.completed]);
  return (
    <div
      className={
        "width-full bg-slate-50 flex justify-between rounded-lg shadow-md hover:shadow-lg ease-in duration-150 my-2" +
        " " +
        className
      }
    >
      <Modal title="Edit Todo" open={showModal} setOpen={setShowModal}>
        <EditTodo setOpen={setShowModal} state={todo} />
      </Modal>
      <TodoHolder
        className="flex justify-between py-3 px-3 cursor-pointer flex-1"
        onClick={toggleCheck}
      >
        <div className="flex items-center select-none">
          <CheckCircle
            completed={isChecked}
            categoryColor={todo.category.color}
          >
            {isChecked && <BsCheckLg className={`text-xs text-slate-50`} />}
          </CheckCircle>
          <span
            className={`font-semibold overflow-hidden relative flex items-center ${
              isChecked && `text-grey-500`
            }`}
          >
            {isChecked ? <del>{todo.title}</del> : todo.title}
          </span>
        </div>
      </TodoHolder>
      <button
        className="text-green-300 hover:text-green-400 px-1 rounded-lg"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <BiEdit className="text-lg" />
      </button>
      <button
        className="text-red-300 hover:text-red-400 px-3 rounded-lg"
        onClick={() => {
          dispatch(deleteTodo(todo._id));
        }}
      >
        <BiTrash className="text-lg" />
      </button>
    </div>
  );
};

export default Todo;
