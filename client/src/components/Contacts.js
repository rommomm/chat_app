import React, { useEffect, useState } from "react";
import randomImage from "../libs/botAvatarRandom";

import "./Contacts.scss";

function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserAvatar, setCurrentAvatar] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const getCurrentUser = async () => {
    const data = await JSON.parse(localStorage.getItem("chat-app-user"));
    setCurrentUserName(data.username);
    setCurrentAvatar(data.avatar);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserAvatar && currentUserName && (
        <div className="contacts-container">
          <div className="brand">
            <img src={randomImage} alt="logo" />
            <h3>CHAT-TEST-APP</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={contact._id}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={contact.avatar} alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentUserAvatar} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;
