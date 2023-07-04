import React, { useState } from "react";
import { deleteTodoCategory } from "../../redux/actions/todoCategory.actions";
import { useDispatch, useSelector } from "react-redux";
import { BiTrash, BiEdit } from "react-icons/bi";
import { ITodoCategoryState } from "@types";
import Modal from "../../components/Modal/Modal";
import EditTodoCategory from "./EditTodoCategory";
import { progressPercentageCalculation } from "@utils/helper";
import { RootState } from "src/redux/store/store";
import {
  todoCategoryDeselect,
  todoCategorySelect,
} from "src/redux/reducers/selectedTodoCategory.reducers";

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

  const { selected_category_id } = useSelector(
    (state: RootState) => state.selectedTodoCategory
  );

  console.log(selected_category_id);
  const dispatch = useDispatch();

  const progress: string = progressPercentageCalculation(
    todoCategory.total_count,
    todoCategory.completed_count
  );

  return (
    <>
      <Modal title="Edit Todo" open={showModal} setOpen={setShowModal}>
        <EditTodoCategory setOpen={setShowModal} state={todoCategory} />
      </Modal>
      <div
        className={`width-full bg-slate-50 dark:bg-slate-900 flex justify-between rounded-lg shadow-md hover:shadow-lg ease-in duration-150 my-2 overflow-hidden mr-2 min-w-max ${
          selected_category_id && selected_category_id !== todoCategory._id
            ? "opacity-40"
            : ""
        }`}
        onClick={() => {
          selected_category_id === todoCategory._id
            ? dispatch(todoCategoryDeselect())
            : dispatch(todoCategorySelect(todoCategory._id));
        }}
      >
        <TodoCategoryColor color={todoCategory.color} />
        <TodoCategoryHolder className="flex-col justify-between py-3 px-3 cursor-pointer flex-1 border-l-2 border-gray-200 dark:border-gray-900">
          <div className="flex justify-between w-32">
            <div className="flex items-center select-none mr-4 w-24">
              <span
                className={`font-semibold overflow-hidden relative flex items-center dark:text-slate-200`}
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
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {todoCategory.total_count} tasks ({todoCategory.completed_count}{" "}
            completed)
          </span>
          <div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {progress}%
            </span>
            <ProgressBar
              progress={progress}
              progressColor={todoCategory.color}
            />
          </div>
        </TodoCategoryHolder>
      </div>
    </>
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
