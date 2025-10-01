import InputBox from "../components/InputBox";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import googleLogo from "../asset/google.png";
import { Link } from "react-router-dom";

const UserAuthForm = ({ type }) => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-bold capitalize text-center mb-24">
          {type === "Sign-in" ? "welcome" : "join us today"}
        </h1>

        {/* Show Full Name field only when NOT Sign-in */}
        {type !== "Sign-in" && (
          <InputBox
            name="fullName"
            type="text"
            placeholder="Full Name"
            icon={FaRegUser}
          />
        )}

        <InputBox
          name="email"
          type="email"
          placeholder="Email Address"
          icon={MdOutlineEmail}
        />

        <InputBox
          name="Password"
          type="password"
          placeholder="Password"
          icon={RiLockPasswordLine}
        />

        <button
          type="submit"
          className="whitespace-nowrap block mx-auto mt-14 cursor-pointer bg-black text-white rounded-full py-2 px-4 text-[1rem] capitalize hover:bg-opacity-80"
        >
          {type.replace("-", " ")}
        </button>

        <div className="relative w-full flex items-center gap-2 uppercase my-10 opacity-10 text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button className="flex mx-auto whitespace-nowrap cursor-pointer items-center gap-4 justify-center w-[70%] bg-black text-white rounded-full py-4 px-4 text-[1rem] capitalize hover:bg-opacity-80">
          <img src={googleLogo} className="w-5" alt="Google logo" />
          <p>Sign in with Google</p>
        </button>

        {type === "sign-in" ? (
          <p className="mt-6 text-gray-400 text-center">
            Don’t have an account?
            <Link
              to="/login"
              className="underline text-black ml-1 cursor-pointer text-[12px]"
            >
              login here
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-gray-400 text-center">
            Already have an account?
            <Link
              to="/signin"
              className="underline text-black ml-1 cursor-pointer text-[12px]"
            >
              Signin
            </Link>
          </p>
        )}
      </form>
    </section>
  );
};

export default UserAuthForm;
