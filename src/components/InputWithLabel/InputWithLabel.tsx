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
  ({ label = "", onChangeText, errorText, ...props }, ref) => {
    const [inputFocus, setInputFocus] = useState(false);
    return (
      <div className="w-full flex flex-col mb-2 relative">
        <label
          htmlFor={props.id}
          className="text-lg absolute text-gray-400 left-3 top--1/2 duration-300 m-0"
          style={{
            transform: inputFocus ? "translate(0, 0%)" : "translate(0, 40%)",
            fontSize: inputFocus ? "0.95rem" : "1.125rem",
          }}
        >
          {label}
        </label>
        <input
          className="flex-grow border border-gray-400 rounded-lg text-md px-2.5 pb-1 pt-5 outline-1 outline-blue-100"
          {...props}
          onFocus={() => setInputFocus(true)}
          onBlur={(e) => e.target.value || setInputFocus(false)}
          ref={ref}
        />
        {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
      </div>
    );
  }
);

export default InputWithLabel;
