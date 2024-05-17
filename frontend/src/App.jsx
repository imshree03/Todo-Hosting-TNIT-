import { useState, useEffect } from "react";
import "./App.css";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Create from "./components/Create";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Update from "./components/Update";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

function App() {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log();
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
    // fetchTodos();
  }, []);

  return (
    <div className="flex min-h-screen w-screen flex-col max-h-maxContent bg-richblack-800 font-inter">
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup setTodos={setTodos} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/update/:id" element={<Update />} />
      </Routes>

      {/* <h2 className="text-center text-white text-3xl mt-[20px]">Todo List</h2> */}
      {/* <Create setTodos={setTodos} />
      <div className="text-white text-center mt-5">
        {todos.length === 0 ? (
          <div>
            <h2>No Record</h2>
          </div>
        ) : (
          todos.map((todo, index) => {
            return (
              <div
                key={index}
                className="bg-white text-xl w-[35%] flex items-center mx-auto rounded-md border-black px-3 py-2 mt-3 justify-between text-black">
                {todo.task} {todo.createdAt}
                <span
                  className="cursor-pointer text-2xl"
                  onClick={e => handleDelete(e, todo._id)}>
                  <AiTwotoneDelete />
                </span>
              </div>
            );
          })
        )}
      </div> */}
    </div>
  );
}

export default App;
