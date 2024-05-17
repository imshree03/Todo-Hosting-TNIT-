import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useLocation } from "react-router-dom";

const Update = ({}) => {
  const [Inputs, setInputs] = useState({ title: "", description: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userId = sessionStorage.getItem("id");
  const location = useLocation();

  const arr = location.pathname.split("/").filter(Boolean);
  const id = arr[arr.length - 1];

  const change = e => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      await axios
        .post(`${window.location.origin}/api/v1/todos/updateTodos/${id}`, {
          data: {
            userId: userId,
            title: Inputs.title,
            description: Inputs.description,
          },
        })
        .then(res => {
          console.log(res);
          toast.success("Task Updated Successfully");
          setInputs({ title: "", description: "" });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="absolute flex-col text-center top-0 bottom-0 left-0 right-0 h-[600px] w-full text- bg-richblack-800 gap-9">
        <h3 className="text-white">Update Your Task</h3>
        <div>
          <input
            type="text"
            className="my-4 w-[70%] p-3"
            placeholder="Update Title"
            onChange={change}
            name="title"
            value={Inputs.title}
          />
        </div>

        <div>
          <textarea
            className="w-[70%] p-3"
            placeholder="Update Description"
            onChange={change}
            name="description"
            value={Inputs.description}></textarea>
        </div>
        <div>
          <button
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white hover:text-black mt-4"
            onClick={handleClick}>
            Update Task
          </button>
          <button
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white hover:text-black mt-4"
            onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
