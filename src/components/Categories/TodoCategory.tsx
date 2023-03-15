import React, { useState } from "react";
import { deleteTodoCategory } from "../../redux/actions/todoCategory.actions";
import { useDispatch } from "react-redux";
import { BiTrash, BiEdit } from "react-icons/bi";
import { ITodoCategoryState } from "@types";
import Modal from "../../components/Modal/Modal";
import EditTodoCategory from "./EditTodoCategory";

interface TodoCategoryColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const TodoCategoryColor: React.FC<TodoCategoryColorProps> = ({
  className,
  style,
  color,
  ...rest
}) => {
  return (
    <span
      className={`h-full w-8 ${className}`}
      style={{ backgroundColor: color ? color : "transparent", ...style }}
      {...rest}
    />
  );
};

const TodoCategoryHolder: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...rest
}) => {
  return (
    <span
      className={`font-semibold overflow-hidden relative flex ${className}`}
      {...rest}
    />
  );
};

interface ITodoCategoryProps {
  todoCategory: ITodoCategoryState;
  className?: string;
}

const TodoCategory = ({
  todoCategory,
}: ITodoCategoryProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const progress: string =
    (
      todoCategory.total_count &&
      todoCategory.completed_count &&
      (todoCategory.completed_count / todoCategory.total_count) * 100
    ).toFixed(2) || "0";

  return (
    <div className="width-full bg-slate-50 flex justify-between rounded-lg shadow-md hover:shadow-lg ease-in duration-150 my-2 overflow-hidden mr-2 min-w-max">
      <Modal title="Edit Todo" open={showModal} setOpen={setShowModal}>
        <EditTodoCategory setOpen={setShowModal} state={todoCategory} />
      </Modal>
      <TodoCategoryColor color={todoCategory.color} />
      <TodoCategoryHolder className="flex-col justify-between py-3 px-3 cursor-pointer flex-1 border-l-2 border-gray-200">
        <div className="flex justify-between w-32">
          <div className="flex items-center select-none mr-4 w-24">
            <span
              className={`font-semibold overflow-hidden relative flex items-center`}
            >
              {todoCategory.name}
            </span>
          </div>
          {!todoCategory?.isDefault && (
            <>
              <button
                className="text-green-300 hover:text-green-400 rounded-lg"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <BiEdit className="text-lg" />
              </button>
              <button
                className="text-red-300 hover:text-red-400 rounded-lg"
                onClick={() => {
                  dispatch(deleteTodoCategory(todoCategory._id));
                }}
              >
                <BiTrash className="text-lg" />
              </button>
            </>
          )}
        </div>
        <span className="text-xs text-gray-600">
          {todoCategory.total_count} tasks ({todoCategory.completed_count}{" "}
          completed)
        </span>
        <div>
          <span className="text-xs text-gray-600">{progress}%</span>
          <ProgressBar progress={progress} progressColor={todoCategory.color} />
        </div>
      </TodoCategoryHolder>
    </div>
  );
};

export default TodoCategory;

interface IProgressBar {
  progress: string;
  progressColor: string;
}

const ProgressBar = ({ progress, progressColor }: IProgressBar) => {
  return (
    <div className="flex items-end w-full h-1 bg-gray-200">
      <span
        style={{
          transition: "width 0.5s ease-in-out",
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
