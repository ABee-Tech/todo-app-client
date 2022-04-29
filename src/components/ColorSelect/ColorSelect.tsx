import React, { useEffect, useState } from "react";
import { ErrorMessage } from "src/styles/styles";

interface IColorSelectOptions {
  label: string;
  value: string;
}

interface IColorSelectProps {
  label?: string;
  options?: IColorSelectOptions[];
  defaultValue?: string;
  errorText?: string;
  onChange?: (e: any) => void;
  [x: string]: any;
}

const ColorSelect = React.forwardRef<any, IColorSelectProps>(
  (
    {
      label = "",
      options = [],
      defaultValue = "",
      errorText = "",
      onChange = () => {},
      ...props
    },
    ref
  ) => {
    const [selectFocus, setSelectFocus] = useState(true);
    const [color, setColor] = useState("transparent");

    const handleChange = (e: any) => {
      let value = e.target.value;
      setColor(value);
      onChange(e);
    };

    useEffect(() => {
      if (defaultValue) {
        setColor(defaultValue);
      }
    }, [defaultValue]);

    return (
      <div className="w-full h-full flex items-center relative">
        <div className="flex flex-1 flex-col mb-2 relative">
          <label
            htmlFor={props.id}
            className="text-lg absolute text-gray-400 left-3 top--1/2 duration-300 m-0"
            style={{
              transform: selectFocus ? "translate(0, 0%)" : "translate(0, 40%)",
              fontSize: selectFocus ? "0.95rem" : "1.125rem",
            }}
          >
            {label}
          </label>
          <select
            onChange={handleChange}
            className="flex-grow border border-gray-400 rounded-lg text-md px-1.5 pb-1 pt-5 outline-1 outline-blue-100"
            {...props}
            onFocus={() => setSelectFocus(true)}
            onBlur={(e) => e.target.value || setSelectFocus(false)}
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
        <div
          className="w-11 h-11 ml-2 rounded-lg mb-2"
          style={{
            backgroundColor: color,
          }}
        ></div>
      </div>
    );
  }
);

export default ColorSelect;
