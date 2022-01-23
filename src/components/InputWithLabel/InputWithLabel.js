import React from "react";
import { ErrorMessage } from "../../styles/styles";

const InputWithLabel = React.forwardRef(
  ({ label = "", onChangeText, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col mb-2 relative">
        <label
          htmlFor={props.id}
          className="font-semibold text-sm mx-0.5 my-1 absolute text-gray-400 left-2 top--1/2 translate-y-1/5 duration-300"
        >
          {label}:
        </label>
        <input
          className="flex-grow border border-gray-400 rounded-lg text-md px-2.5 pb-1 pt-5 outline-1 outline-blue-100"
          ref={ref}
          {...props}
        />
        {props.errorText && <ErrorMessage>{props.errorText}</ErrorMessage>}
      </div>
    );
  }
);

export default InputWithLabel;
