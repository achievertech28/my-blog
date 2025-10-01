import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const InputBox = ({ name, type, id, value, placeholder, icon: Icon }) => {
  const [showPassword, setShowPassword] = useState(false); // state must be here, not inside return

  // Actual input type (toggle for password fields)
  const inputType = type === "password" && showPassword ? "text" : type;
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={inputType}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="w-[100%] rounded-md p-4 bg-gray-100 pl-12 border border-gray-100 focus:bg-transparent placeholder:text-black focus:outline-none focus:border-gray-400 transition"
      />
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
      )}

      {/* Eye toggle for password */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
};

export default InputBox;
