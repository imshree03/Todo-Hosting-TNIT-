import React from "react";
// import { Link } from "react-router-dom";

const Button = ({ children, handleClick }) => {
  // console.log(todos);
  // console.log(task);

  return (
    <div
      className={`flex items-center gap-3 text-center text-[16px] px-3 py-2 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] bg-yellow-50 text-richblue-900 hover:shadow-none hover:scale-95 transition-all duration-200 h-10`}
      onClick={e => handleClick(e)}>
      {children}
    </div>
  );
};

export default Button;
