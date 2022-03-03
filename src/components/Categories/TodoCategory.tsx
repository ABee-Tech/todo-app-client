import React from "react";
import { deleteTodoCategory } from "../../redux/actions/todoCategory.actions";
import { useDispatch } from "react-redux";
import { BiTrash } from "react-icons/bi";
import styled from "styled-components";
import tw from "twin.macro";
import { ITodoCategoryState } from "@types";

const TodoCategoryColor = styled.span`
  ${tw`
      h-full
      w-8
      `}
  background-color: ${(props) => (props.color ? props.color : "transparent")};
  &:hover .strike {
    ${tw`right-0`}
  }
`;
const TodoCategoryHolder = styled.span`
${tw`font-semibold overflow-hidden relative flex`}
  &:hover .strike {
    ${tw`right-0`}
`;

interface ITodoCategoryProps {
  todoCategory: ITodoCategoryState;
  className?: string;
}

const TodoCategory = ({
  todoCategory,
}: ITodoCategoryProps & React.HTMLAttributes<HTMLDivElement>) => {
  const dispatch = useDispatch();

  return (
    <div className="width-full bg-slate-50 flex justify-between rounded-lg shadow-md hover:shadow-lg ease-in duration-150 my-2 overflow-hidden mr-2 min-w-max">
      <TodoCategoryColor color={todoCategory.color} />
      <TodoCategoryHolder className="flex-col justify-between py-3 px-3 cursor-pointer flex-1 border-l-2 border-gray-200">
        <div className="flex justify-between">
          <div className="flex items-center select-none mr-4 w-24">
            <span
              className={`font-semibold overflow-hidden relative flex items-center`}
            >
              {todoCategory.name}
            </span>
          </div>
          <button
            className="text-red-300 rounded-lg"
            onClick={() => {
              dispatch(deleteTodoCategory(todoCategory._id));
            }}
          >
            <BiTrash className="text-lg" />
          </button>
        </div>
        <div>
          <span className="text-xs text-gray-600">
            {todoCategory.progress}%
          </span>
          <ProgressBar
            progress={todoCategory.progress}
            progressColor={todoCategory.color}
          />
        </div>
      </TodoCategoryHolder>
    </div>
  );
};

export default TodoCategory;

interface IProgressBar {
  progress: number;
  progressColor: string;
}

const ProgressBar = ({ progress, progressColor }: IProgressBar) => {
  return (
    <div className="flex items-end w-full h-1 bg-gray-200">
      <span
        style={{
          backgroundColor: progressColor,
          height: "105%",
          width: progress + "%",
          boxShadow: `0px 0px 5px ${progressColor}`,
        }}
      />
      <span
        className="h-2"
        style={{
          backgroundColor: progressColor,
          width: "3px",
        }}
      />
    </div>
  );
};
