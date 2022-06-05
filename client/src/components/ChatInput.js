import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

import "./ChatInput.scss";

function ChatInput({ handleSetMessage }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let msg = message;
    msg += emojiObject.emoji;
    setMessage(msg);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSetMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-input-container">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <div className="input-container">
        <input
          className=""
          type="text"
          placeholder="type your message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button onClick={(event) => sendChat(event)}>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
