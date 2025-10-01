import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import googleLogo from "../asset/google.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const formValues = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/",
        formData
      );

      console.log("sign in successful", response.data);

      localStorage.setItem("token", response.data.token);

      alert("sign in succefull");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Sign-in error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <motion.form
        onSubmit={formSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[80%] max-w-[400px]"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Sign In
        </h1>

        {/* First Name inpute */}
        <div className="relative w-[100%] mb-4">
          <input
            name="firstName"
            className="w-[100%] rounded-md p-3 bg-gray-100 pl-12 border border-gray-100 focus:bg-transparent placeholder:text-black focus:outline-none focus:border-gray-400 transition"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={formValues}
          />
          <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Last Name input */}
        <div className="relative w-[100%] mb-4">
          <input
            name="lastName"
            className="w-[100%] rounded-md p-3 bg-gray-100 pl-12 border border-gray-100 focus:bg-transparent placeholder:text-black focus:outline-none focus:border-gray-400 transition"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={formValues}
          />
          <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Email input */}
        <div className="relative w-[100%] mb-4">
          <input
            name="email"
            className="w-[100%] rounded-md p-3 bg-gray-100 pl-12 border border-gray-100 focus:bg-transparent placeholder:text-black focus:outline-none focus:border-gray-400 transition"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={formValues}
          />
          <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Password input with toggle */}
        <div className="relative w-full mb-4">
          <input
            name="password"
            className="w-full rounded-md p-3 bg-gray-100 pl-12 pr-12 border border-gray-100 focus:bg-transparent placeholder:text-black focus:outline-none focus:border-gray-400 transition"
            type={showPassword ? "text" : "password"} //
            placeholder="Password"
            value={formData.password}
            onChange={formValues}
          />
          <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          {/* Eye toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* role input */}
        <div className="relative w-[100%] mb-4">
          <input
            name="role"
            className="w-[100%] rounded-md p-3 bg-gray-100 pl-12 border border-gray-100 focus:bg-transparent placeholder:text-black focus:outline-none focus:border-gray-400 transition"
            type="text"
            placeholder="Role (reader/author)"
            value={formData.role}
            onChange={formValues}
          />
          <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="whitespace-nowrap items-center justify-center mx-auto mt-14 cursor-pointer bg-black text-white flex gap-2 rounded-full py-2 px-4 text-[1rem] capitalize hover:bg-opacity-80"
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Divider */}
        <div className="relative w-full flex items-center gap-2 uppercase my-10 opacity-10 text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        {/* Google Auth */}
        <button className="flex mx-auto whitespace-nowrap cursor-pointer items-center gap-4 justify-center w-[70%] bg-black hover:bg-black-50 text-white rounded-full py-4 px-4 text-[1rem] capitalize hover:bg-opacity-80">
          <img src={googleLogo} className="w-5" alt="Google logo" />
          <p>Sign in with Google</p>
        </button>

        {/* Link to Login page */}
        <p className="mt-6 text-gray-400 text-center">
          already have account ?
          <Link
            to="/login"
            className="underline text-black ml-1 cursor-pointer text-[14px]"
          >
            login here
          </Link>
        </p>
      </motion.form>
    </section>
  );
};

export default SignIn;
