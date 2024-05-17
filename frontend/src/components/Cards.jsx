import React, { useState } from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import Update from "./Update";
import { Link } from "react-router-dom";

const Cards = ({ ele, deleteTask, id, display }) => {
  return (
    <div className="w-full relative flex text-black bg-white  rounded overflow-hidden shadow-lg mb-3">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{ele.title}</div>
        <p className="text-gray-700 text-base">
          {ele.description.split("", 77)}...
        </p>
      </div>
      <Link to={`/update/${id}`}>
        <div className="absolute text-xl top-1 right-5 gap-8  justify-center items-between cursor-pointer">
          <GrDocumentUpdate />
        </div>
      </Link>

      <div
        className="absolute  text-xl bottom-1 right-5 gap-8  justify-center items-between cursor-pointer"
        onClick={() => {
          deleteTask(id);
        }}>
        <AiFillDelete />
      </div>
      {/* {showModel && <UpdateTodo />} */}
    </div>
  );
};

export default Cards;
