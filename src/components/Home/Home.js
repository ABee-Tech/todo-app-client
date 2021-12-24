import React, { useEffect } from "react";
import "./Home.css";
import Todos from "../Todos/Todos";

const Home = () => {
  useEffect(() => {
    if (
      JSON.stringify(window.localStorage.getItem("userAuthData")) === "null"
    ) {
      window.location.href = "/login";
    }
  }, []);
  return <Todos />;
};

export default Home;
