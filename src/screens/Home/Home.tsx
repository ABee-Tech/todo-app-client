import React from "react";
import "./Home.css";
import TodaysTasks from "../../components/Todos/TodaysTasks";
import Navigation from "../../components/Navigation/Navigation";

const Home: React.ReactNode = () => {
  return (
    <Navigation>
      <TodaysTasks />
    </Navigation>
  );
};

export default Home;
