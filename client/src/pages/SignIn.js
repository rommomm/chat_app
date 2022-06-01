import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SignInForm from "../components/SignInForm";
import api from "../libs/api";
import { errorStyle, successStyle } from "../components/toastStyled";

import "./Auth.scss";

function SignIn() {
  const navigate = useNavigate();

  const handleSignInForm = async (values) => {
    console.log("values", values);
    try {
      await api.post("/sign-in", values).then(() => {
        toast("Successful registration", successStyle).then(() =>
          navigate("/chat")
        );
      });
    } catch (error) {
      toast.error(error.response.data.message, errorStyle);
    }
  };

  return (
    <div className="auth">
      <SignInForm handleSignInForm={handleSignInForm} />
      <ToastContainer />
    </div>
  );
}

export default SignIn;
