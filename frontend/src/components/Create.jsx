import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Button from "./Button";
import Cards from "./Cards";
import toast from "react-hot-toast";

const Create = ({ setTodos }) => {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [Array, setArray] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  let id = sessionStorage.getItem("id");

  const handleClick = async e => {
    if (inputs.title === "" && inputs.description === "") {
      toast.error("Title or description cannot be empty");
    } else {
      try {
        if (id) {
          await axios
            .post(`${window.location.origin}/api/v1/todos/createTodos`, {
              title: inputs.title,
              description: inputs.description,
              id: id,
            })
            .then(res => {
              // console.log(res);
            });
          setArray([...Array, inputs]);
          setInputs({ title: "", description: "" });
          toast.success("Task Added");
        } else {
          setArray([...Array, inputs]);
          setInputs({ title: "", description: "" });
          toast.success("Task Added");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const change = e => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const deleteTask = async value => {
    await axios
      .delete(`${window.location.origin}/api/v1/todos/deleteTodos/${id}`, {
        data: { taskId: value },
      })
      .then(res => {
        console.log(res);
      });
    Array.splice(id, "1");
    setArray([...Array]);
    toast.success("Task was deleted Successfully");
  };

  const display = value => {
    // console.log(value);
    setShowUpdate(!showUpdate);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      await axios
        .get(`${window.location.origin}/api/v1/todos/fetchTodos/${id}`)
        .then(res => {
          setArray(res.data.list);
        });
    };
    fetchTodos();
  }, [handleClick]);

  return (
    <div className="relative">
      <div className="flex mt-8 w-[55%] mx-auto justify-evenly text-white gap-8  shadow-black-50 items-center">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 text-black  border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Title"
            value={inputs.title}
            required=""
            onChange={change}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Description:
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={inputs.description}
            onChange={change}
            className="bg-gray-50 text-black  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Description"
            required=""
          />
        </div>
        <div className="mt-8">
          <Button handleClick={handleClick}>
            <div>
              <FaPlus />
            </div>
            <span>Add Task</span>
          </Button>
        </div>
      </div>
      <div className="flex-col  mt-8 w-[55%] mx-auto text-white gap-8  shadow-black-50 items-center">
        {Array &&
          Array.map((ele, index) => (
            <div key={index}>
              <Cards
                ele={ele}
                deleteTask={deleteTask}
                id={ele._id}
                display={display}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Create;
