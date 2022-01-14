import React from "react";

function InputWithLabel({ label = "", onChangeText, ...props }) {
  return (
    <div className="w-full flex flex-col mb-2">
      <label htmlFor={props.id} className="font-semibold m-0">
        {label}:
      </label>
      <input
        value={props.value}
        onChange={(e) => onChangeText(e.target.value)}
        className="flex-grow border border-gray-400 rounded-lg px-2 py-1 h-9"
        {...props}
      />
      {props.errorText && <p>{props.errorText}</p>}
    </div>
  );
}

export default InputWithLabel;
