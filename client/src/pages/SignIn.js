import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SignInForm from "../components/SignInForm";
import api from "../libs/api";
import { errorStyle, successStyle } from "../components/toastStyled";
import Loader from "../components/Loader";

import "./Auth.scss";

function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleSignInForm = async (values) => {
    console.log("values", values);
    try {
      const { data } = await api.post("/sign-in", values);
      toast("Successful registration", successStyle);
      setTimeout(() => {
        navigate("/chat");
      }, 2000);
      if (data && data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        setIsLoading(false);
      }
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
          <SignInForm handleSignInForm={handleSignInForm} />
          <ToastContainer />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SignIn;
