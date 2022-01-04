import React from "react";
import { CgSpinner } from "react-icons/cg";

function Spinner({ height, width }) {
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
