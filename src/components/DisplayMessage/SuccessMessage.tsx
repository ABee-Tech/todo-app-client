import React from "react";

interface ISuccessMessageProps {
  message: string;
}

const SuccessMessage = ({ message }: ISuccessMessageProps) => {
  return (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
};

export default SuccessMessage;
