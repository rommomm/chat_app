import React, { useEffect, useState } from "react";

import "./Welcome.scss";

function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("chat-app-user")).username;
    setUserName(name);
  }, []);

  return (
    <div className="welcome">
      <h1>
        Welcome, <span>{userName}</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}

export default Welcome;
