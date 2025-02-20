import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-2xl hover:bg-green-400 text-white font-bold py-2 px-8 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
