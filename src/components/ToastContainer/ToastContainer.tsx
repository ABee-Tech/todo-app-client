import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer as Container } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "src/redux/store/store";

function ToastContainer({ children, ...props }: React.PropsWithChildren<{}>) {
  const {
    data: { theme },
  } = useSelector((state: RootState) => state.setting);
  return (
    <Container position="bottom-right" hideProgressBar={true} theme={theme} />
  );
}

export default ToastContainer;
