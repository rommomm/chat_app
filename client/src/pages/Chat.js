import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatForm from "../components/ChatForm";
import Contacts from "../components/Contacts";
import Loader from "../components/Loader";
import Welcome from "../components/Welcome";
import api from "../libs/api";

import "./Chat.scss";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState(undefined);
  console.log("currentChat", currentChat);
  const handleCurrentUser = async () => {
    try {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/sign-in");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoading(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUser = async () => {
    try {
      if (currentUser) {
        if (currentUser.avatar) {
          const data = await api.get(`/allusers/${currentUser._id}`);
          setContacts(data.data);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  useEffect(() => {
    handleUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {isLoading && currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatForm currentChat={currentChat} />
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
