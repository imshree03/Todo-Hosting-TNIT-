import React, { useState } from "react";
import { BsJournalBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  return (
    <div>
      <nav className="w-11/12 mx-auto flex items-center justify-between flex-wrap bg-teal-500 p-6 text-white">
        <Link to={"/"}>
          <div className="flex items-center flex-shrink-0 text-white mr-6 gap-3">
            <BsJournalBookmark fontSize={20} />
            <span className="font-semibold text-xl tracking-tight">TodoDO</span>
          </div>
        </Link>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-[30%]">
          <div className="text-md lg:flex-grow">
            <Link
              to={"/"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Home
            </Link>
            <Link
              to={"/about"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              About
            </Link>
            <Link
              to={"/contact"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              Contact
            </Link>
          </div>
          <div className="flex gap-4">
            {!isLoggedIn && (
              <>
                <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white hover:text-black mt-4 lg:mt-0">
                  <Link to={"/signup"}>Signup</Link>
                </div>

                <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white hover:text-black mt-4 lg:mt-0">
                  <Link to={"/login"}>Login</Link>
                </div>
              </>
            )}

            {isLoggedIn && (
              <Link to={"/signup"}>
                <div
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white hover:text-black mt-4 lg:mt-0"
                  onClick={logout}>
                  LogOut
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
