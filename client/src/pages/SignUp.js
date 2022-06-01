import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SignUpForm from "../components/SignUpForm";
import api from "../libs/api";
import { successStyle, errorStyle } from "../components/toastStyled";

import "./Auth.scss";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUpForm = async (values) => {
    console.log("values", values);
    try {
      await api
        .post("/sign-up", values)
        .then(() => {
          toast("Successful registration", successStyle);
        })
        .then(() => navigate("/sign-in"));
    } catch (error) {
      toast.error(error.response.data.message, errorStyle);
    }
  };

  return (
    <div className="auth">
      <SignUpForm handleSignUpForm={handleSignUpForm} />
      <ToastContainer />
    </div>
  );
}

export default SignUp;
