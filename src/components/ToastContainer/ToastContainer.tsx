import React from "react";
import { ToastContainer as Container } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastContainer() {
  return <Container position="bottom-right" hideProgressBar={true} />;
}

export default ToastContainer;
