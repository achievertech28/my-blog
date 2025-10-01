import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import googleLogo from "../asset/google.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const formValues = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );

      console.log("login successful", response.data);

      localStorage.setItem("token", response.data.token);

      alert("login successful");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      {/*  Animate the form */}
      <motion.form
        onSubmit={formSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[80%] max-w-[400px] relative"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Log-In
        </h1>

        {/* Email input */}
        <div className="relative w-full mb-4">
          <input
            className="w-full rounded-md p-3 bg-gray-100 pl-12 border border-gray-100 focus:bg-transparent placeholder:text-black focus:outline-none focus:border-gray-400 transition"
            type="email"
            placeholder="Email"
            name="email"
            onChange={formValues}
            value={formData.email}
          />
          <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Password input with toggle */}
        <div className="relative w-full mb-4">
          <input
            className="w-full rounded-md p-3 bg-gray-100 pl-12 pr-12 border border-gray-100 focus:bg-transparent placeholder:text-black focus:outline-none focus:border-gray-400 transition"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={formValues}
            value={formData.password}
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

        {/* submit button */}
        <button
          type="submit"
          className="whitespace-nowrap items-center justify-center mx-auto mt-14 cursor-pointer bg-black text-white flex gap-2 rounded-full py-2 px-4 text-[1rem] capitalize hover:bg-opacity-80"
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? "Logging in..." : "Log-in"}
        </button>

        {/* Divider */}
        <div className="relative w-full flex items-center gap-2 uppercase my-10 opacity-10 text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        {/* Google Auth */}
        <button className="flex mx-auto whitespace-nowrap cursor-pointer items-center gap-4 justify-center w-[70%] bg-black text-white rounded-full py-4 px-4 text-[1rem] capitalize hover:bg-opacity-80">
          <img src={googleLogo} className="w-5" alt="Google logo" />
          <p>continue with Google</p>
        </button>

        {/* Link to Sign-in */}
        <p className="mt-6 text-gray-400 text-center">
          Don’t have an account?
          <Link
            to="/signin"
            className="underline text-black ml-1 cursor-pointer text-[14px]"
          >
            Sign-In
          </Link>
        </p>
      </motion.form>
    </section>
  );
};

export default Login;
