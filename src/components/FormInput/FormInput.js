import React from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

const FormInput = React.forwardRef(({ placeholder, ...rest }, ref) => {
  return <InputWithLabel label={placeholder} ref={ref} {...rest} />;
});

export default FormInput;
