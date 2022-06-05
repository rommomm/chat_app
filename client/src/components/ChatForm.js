import React from "react";

import "./ChatForm.scss";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import SignOut from "./SignOut";

function ChatForm({ currentChat }) {
  const handleSetMessage = async (message) => {
    try {
      console.log("message", message);
    } catch (error) {}
  };

  if (!currentChat) {
    return null;
  }
  return (
    <div className="chat-form-container">
      <div className="chat-header">
        <div className="user-detalis">
          <div className="avatar">
            <img src={currentChat.avatar} alt="avatar" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <SignOut />
      </div>
      <Messages />
      <ChatInput handleSetMessage={handleSetMessage} />
    </div>
  );
}

export default ChatForm;
