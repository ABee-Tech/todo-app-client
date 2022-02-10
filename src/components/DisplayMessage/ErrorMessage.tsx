import React from "react";

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return (
    <div className="alert alert-warning" role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;
