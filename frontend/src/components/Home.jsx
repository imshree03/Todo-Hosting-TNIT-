import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const id = sessionStorage.getItem("id");
    if (id !== null) {
      navigate("/create");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="text-center mx-auto w-[70%]">
      <div className="flex-col text-3xl justify-center items-center text-white">
        <h1 className="m-5 text-5xl">
          Organize your <br /> work and life, finally
        </h1>
        <p className="text-xl">
          Become Focused,Organized & Calm with our Todo App.The World's #1 Task
          Manager App
        </p>

        <button
          className="mt-10 text-xl inline-block  px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white hover:text-black"
          onClick={handleClick}>
          Make Todo List
        </button>
      </div>
    </div>
  );
};

export default Home;
