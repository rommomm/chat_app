import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import "./Chat.scss";

function Chat() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/sign-in");
    }
    setIsLoading(false);
  }, []);

  return <>{!isLoading ? <div className="chat">Chat</div> : <Loader />}</>;
}

export default Chat;
