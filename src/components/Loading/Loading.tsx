import React from "react";
import Spinner from "../Spinner/Spinner";

interface ILoadingProps {
  loadingText?: string;
  className?: string;
}

const Loading = ({
  loadingText = "Loading",
  className = "",
}: ILoadingProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Spinner height="1.25rem" width="1.25rem" />
      <span className="ml-1 text-sm font-bold">{loadingText}</span>
    </div>
  );
};

export default Loading;
