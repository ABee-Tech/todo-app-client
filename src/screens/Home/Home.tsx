import React from "react";
import "./Home.css";
import TodaysTasks from "../../components/Todos/TodaysTasks";
import Navigation from "../../components/Navigation/Navigation";
import AllTodoCategories from "../../components/Categories/AllTodoCategories";

const Home: React.ReactNode = () => {
  return (
    <Navigation className="h-screen overflow-hidden flex flex-col">
      <AllTodoCategories />
      <TodaysTasks />
    </Navigation>
  );
};

export default Home;
