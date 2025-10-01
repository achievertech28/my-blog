import React, { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaSearch, FaRegEdit } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  // const {} = useContext();

  return (
    <>
      <div className="z-10 sticky top-0 flex items-center w-full px-[5vw] py-5 h-[80px] border-b border-gray-100 bg-white">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-bold text-black">
            My<span className=" font-fredoka text-blue-600">Blog</span>
          </h1>
        </Link>

        {/* Search Input */}
        <div
          className={`
      absolute w-full bg-white md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:left-5 
      left-0 top-full mt-0.5 border-b border-gray-100 p-4 px-[5vw] py-[4] 
      transition-all duration-300 ease-in-out
      ${
        showSearch
          ? "opacity-100 translate-y-0 visible pointer-events-auto"
          : "opacity-0 -translate-y-2 invisible pointer-events-none"
      } 
      md:opacity-100 md:translate-y-0 md:visible
    `}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-gray-100 outline-gray-300 pl-6 pr-[12%] p-3 md:pl-12 md:pr-6 rounded-full placeholder:text-gray-400"
          />
          <CiSearch className="absolute right-[10%] top-1/2 transform -translate-y-1/2 text-xl md:pointer-events-none md:left-5 text-gray-400" />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 md:gap-6 ml-auto">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            <CiSearch className="text-xl" />
          </button>

          {/* editor */}
          <Link
            to="/editor"
            className="hidden md:flex gap-2 items-center text-gray-600 hover:text-black hover:bg-gray-100 p-3 px-4 opacity-75"
          >
            <FaRegEdit />
            <p>Write</p>
          </Link>

          {/* Sign in button */}
          <Link
            to="/signin"
            className="whitespace-nowrap bg-black text-white rounded-full py-2 px-4 text-[1rem] capitalize hover:bg-opacity-80"
          >
            Sign in
          </Link>

          {/* Log in button */}
          <Link
            to="/login"
            className="hidden md:block shadow-md whitespace-nowrap bg-gray-100 text-black rounded-full py-2 px-4 text-[1rem] capitalize hover:bg-opacity-80"
          >
            Log in
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
