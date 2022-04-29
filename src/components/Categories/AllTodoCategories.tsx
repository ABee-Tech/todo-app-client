import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoCategory from "./TodoCategory";

import { fetchTodoCategories } from "../../redux/actions/todoCategory.actions";
import { Heading, HeadingWithAction, LinkButton } from "../../styles/styles";
import InfoMessage from "../DisplayMessage/InfoMessage";
import Modal from "../Modal/Modal";
import AddTodoCategory from "./AddTodoCategory";
import { ITodoCategoryState } from "@types";
import { RootState } from "../../redux/store/store";
import styled from "styled-components";
import tw from "twin.macro";

const HCategoryScrollContainer = styled.div`
  ${tw`flex overflow-x-auto pb-4`}
`;

function AllTodoCategories() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { data: todoCategories, loading } = useSelector(
    (state: RootState) => state.todoCategoryList
  );
  useEffect(() => {
    dispatch(fetchTodoCategories());
  }, [dispatch]);
  // if (loading) return <Loading className="text-grey-500" />;
  return (
    <div className="pb-4 border-b-gray-300 border-b mb-4">
      <Modal title="Add Todo Category" open={showModal} setOpen={setShowModal}>
        <AddTodoCategory setOpen={setShowModal} />
      </Modal>
      <HeadingWithAction>
        <Heading className="uppercase">All Categories</Heading>
        <LinkButton onClick={() => setShowModal(true)}>
          + Add Category
        </LinkButton>
      </HeadingWithAction>
      <HCategoryScrollContainer>
        {todoCategories && todoCategories.length ? (
          todoCategories.map((todoCategory: ITodoCategoryState) => {
            return (
              <TodoCategory
                key={todoCategory._id}
                todoCategory={todoCategory}
              />
            );
          })
        ) : (
          <InfoMessage message={"There are no categories."} />
        )}
      </HCategoryScrollContainer>
    </div>
  );
}

export default AllTodoCategories;
