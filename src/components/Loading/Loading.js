import React from "react";
import Spinner from "../Spinner/Spinner";

const Loading = ({ loadingText, className }) => {
  return (
    <div className={"flex justify-center items-center " + (className || "")}>
      <Spinner height="1.25rem" width="1.25rem" />
      <span className="ml-1 text-sm font-bold">{loadingText || "Loading"}</span>
    </div>
  );
};

export default Loading;
