import React, { useState } from "react";
import { ErrorMessage } from "../../styles/styles";
import "./InputWithLabel.scss";

interface IInputWithLabelProps {
  label?: string;
  onChangeText?: (text: string) => void;
  errorText?: string;
  [x: string]: any;
}

const InputWithLabel = React.forwardRef<any, IInputWithLabelProps>(
  (
    { label = "", onChangeText, errorText, containerClassName, ...props },
    ref
  ) => {
    return (
      <div
        className={`flex flex-col mb-2 relative form-control input-control ${containerClassName}`}
      >
        <input
          {...props}
          className="flex-grow border border-gray-400 dark:bg-slate-700 rounded-lg text-md px-2.5 pb-1 pt-5 outline-1 outline-blue-100 h-12"
          placeholder=" "
          ref={ref}
        />

        <label
          htmlFor={props.id}
          className="text-lg absolute text-gray-400 left-3 top--1/2 duration-300 m-0"
        >
          {label}
        </label>
        {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
      </div>
    );
  }
);

export default InputWithLabel;
