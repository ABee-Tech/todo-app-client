import React from "react";
import { CgSpinner } from "react-icons/cg";

interface ISpinnerProps {
  height?: number | string;
  width?: number | string;
}

function Spinner({ height, width }: ISpinnerProps) {
  return (
    <CgSpinner
      className={`animate-spin`}
      style={{
        height: height ? height : "1.25rem",
        width: width ? width : "1.25rem",
      }}
    />
  );
}

export default Spinner;
