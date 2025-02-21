import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-amber-400 text-2xl hover:bg-blue-400 text-slate-800 font-bold py-2 px-8 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
