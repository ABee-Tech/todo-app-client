import React, { useState } from "react";
import { deleteTodo } from "../../redux/actions/todos/todoActions";
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
  return (
    <div className="width-full bg-slate-50 flex justify-between py-3 px-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg ease-in duration-150 my-2">
      <TodoHolder className="flex justify-between">
        <div className="flex items-center">
          <div
            className={`h-5 w-5 rounded-full border-2 flex justify-center items-center mr-2 border-purple-500 ${
              isChecked && `bg-grey-500 border-grey-500`
            }`}
          >
            <BsCheckLg
              className={`text-xs text-purple-500 ${
                isChecked && `text-slate-50`
              }`}
            />
          </div>
          <span className="font-semibold overflow-hidden relative flex items-center">
            {todo.title}
            <span
              className={`w-full bg-black h-0.5 absolute ease-in duration-150 ${
                (isChecked && `right-0`) || `right-full`
              }`}
            ></span>
          </span>
        </div>
      </TodoHolder>
      <button
        className="text-red-300"
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
