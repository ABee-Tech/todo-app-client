import React from "react";
import "./Categories.css";
import Navigation from "../../components/Navigation/Navigation";
import AllTodoCategories from "../../components/Categories/AllTodoCategories";

const Categories: React.ReactNode = () => {
  return (
    <Navigation>
      <AllTodoCategories />
    </Navigation>
  );
};

export default Categories;
