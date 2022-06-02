import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SignUpForm from "../components/SignUpForm";
import api from "../libs/api";
import { successStyle, errorStyle } from "../components/toastStyled";

import "./Auth.scss";
import Loader from "../components/Loader";

function SignUp() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleSignUpForm = async (values) => {
    console.log("val9898989ues", values);
    try {
      await api
        .post("/sign-up", values)
        .then(() => {
          toast("Successful registration", successStyle);
        })
        .then(() =>
          setTimeout(() => {
            navigate("/sign-in");
          }, 1000)
        );
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, errorStyle);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/chat");
    }
    setIsLoading(false);
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div className="auth">
          <SignUpForm handleSignUpForm={handleSignUpForm} />
          <ToastContainer />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SignUp;
