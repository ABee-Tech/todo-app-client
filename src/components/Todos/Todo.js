import React, { useState, useEffect } from "react";
import { deleteTodo, completeTodo } from "../../redux/actions/todo.actions";
import { useDispatch } from "react-redux";
import { BsCheckLg } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import styled from "styled-components";
import tw from "twin.macro";

const TodoHolder = styled.span`
${tw`font-semibold overflow-hidden relative flex items-center`}
  &:hover .strike {
    ${tw`right-0`}
`;

const Todo = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    console.log(todo._id);
    dispatch(completeTodo(todo._id, !isChecked));
  };

  useEffect(() => {
    setIsChecked(todo.completed);
  }, [todo.completed]);
  return (
    <div className="width-full bg-slate-50 flex justify-between rounded-lg shadow-md hover:shadow-lg ease-in duration-150 my-2">
      <TodoHolder
        className="flex justify-between py-3 px-3 cursor-pointer flex-1"
        onClick={toggleCheck}
      >
        <div className="flex items-center select-none">
          <div
            className={`h-5 w-5 rounded-full border-2 flex justify-center items-center mr-2 border-purple-500 ${
              !isChecked && `bg-grey-500 border-grey-500`
            }`}
          >
            <BsCheckLg
              className={`text-xs text-purple-500 ${
                !isChecked && `text-slate-50`
              }`}
            />
          </div>
          <span
            className={`font-semibold overflow-hidden relative flex items-center ${
              !isChecked && `text-grey-500`
            }`}
          >
            {!isChecked ? <del>{todo.title}</del> : todo.title}
          </span>
        </div>
      </TodoHolder>
      <button
        className="text-red-300 px-3 rounded-lg"
        onClick={() => {
          dispatch(deleteTodo(todo.id));
        }}
      >
        <BiTrash className="text-lg" />
      </button>
    </div>
  );
};

export default Todo;
