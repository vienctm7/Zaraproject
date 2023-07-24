import React from "react";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();

  const isAuth = JSON.parse(localStorage.getItem("isAuth"));

  const handleSignout = () => {
    console.log("first");
    localStorage.removeItem("isAuth");
    navigate("/");
  };
  return <p onClick={handleSignout}>LOGOUT</p>;
};

export default Signout;
