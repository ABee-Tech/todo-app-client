import React from "react";

const InfoMessage = ({ message }) => {
  return (
    <div
      class="border border-bluish-300 rounded-lg flex items-center justify-start px-4 py-2 text-gray-400 bg-gray-100 font-bold"
      role="alert"
    >
      {message}
    </div>
  );
};

export default InfoMessage;
