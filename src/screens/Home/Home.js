import React from "react";
import "./Home.css";
import Todos from "../../components/Todos/Todos";
import Navigation from "../../components/Navigation/Navigation";

const Home = () => {
  return (
    <Navigation>
      <Todos />
    </Navigation>
  );
};

export default Home;
