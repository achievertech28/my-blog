import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/UserAuthForm";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
