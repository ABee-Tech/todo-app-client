import React from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

interface IFormInputProps {
  placeholder?: string;
  [x: string]: any;
}

const FormInput = React.forwardRef<HTMLInputElement, IFormInputProps>(({ placeholder, ...rest }, ref) => {
  return <InputWithLabel label={placeholder} ref={ref} {...rest} />;
});

export default FormInput;
