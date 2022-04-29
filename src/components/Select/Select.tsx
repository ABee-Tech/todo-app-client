import React, { useEffect, useState } from "react";
import { ErrorMessage } from "src/styles/styles";

interface ISelectOptions {
  label: string;
  value: string;
}

interface ISelectProps {
  label?: string;
  options?: ISelectOptions[];
  defaultValue?: string;
  errorText?: string;
  onChange?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  [x: string]: any;
}

const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
  (
    {
      label = "",
      options = [],
      defaultValue = "",
      errorText = "",
      onChange = () => {},
      onFocus,
      onBlur,
      ...props
    },
    ref: any
  ) => {
    const [selectFocus, setSelectFocus] = useState(false);

    return (
      <div className="flex flex-1 flex-col mb-2 relative">
        <label
          htmlFor={props.id}
          className="text-lg absolute text-gray-400 left-3 top--1/2 duration-300 m-0 z-10"
          style={{
            transform: selectFocus ? "translate(0, 0%)" : "translate(0, 40%)",
            fontSize: selectFocus ? "0.95rem" : "1.125rem",
          }}
        >
          {label}
        </label>
        <select
          onChange={(e) => {
            onChange(e);
            setSelectFocus(e.target.value ? true : false);
          }}
          className="flex-grow border border-gray-400 rounded-lg text-md px-1.5 pb-1 pt-5 outline-1 outline-blue-100 h-12"
          {...props}
          onFocus={(e) => {
            onFocus && onFocus(e);
            e.target.value && setSelectFocus(true);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            e.target.value || setSelectFocus(false);
          }}
          defaultValue={defaultValue}
          ref={ref}
        >
          {options.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
      </div>
    );
  }
);

export default Select;
