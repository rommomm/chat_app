import React from "react";
import api from "../libs/api";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

import "./SignOut.scss";

function SignOut() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      localStorage.clear();
      navigate("/sign-in");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="sign-out">
      <button>
        <BiPowerOff onClick={handleClick} />
      </button>
    </div>
  );
}

export default SignOut;
