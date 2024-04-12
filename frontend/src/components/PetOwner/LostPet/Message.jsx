import React from "react";
import { useUserContext } from "../../../hooks/userContextHook";

const Message = ({ ownerid, message }) => {
  // const { user } = userContextHook;
  const { user } = useUserContext();
  const fromMe = message.senderId === user.uid;

  //formating the time
  function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  // Helper function to pad single-digit numbers with a leading zero
  function padZero(number) {
    return number.toString().padStart(2, "0");
  }
  return (
    <div className="chat chat-end">
      <div className={`chat-image-avatar${fromMe ? "" : "other"}`}>
        <div className="avatar-container">
          <img
            width="48"
            height="48"
            src={
              fromMe
                ? "https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png"
                : "https://img.icons8.com/color/48/circled-user-female-skin-type-1-2--v1.png"
            }
            alt="circled-user-male-skin-type-3--v1"
          />
        </div>
      </div>
      <div className={`chat-bubble ${fromMe ? "" : "other"}`}>
        {message.message}
      </div>
      <div className={`chat-footer ${fromMe ? "" : "other"}`}>
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
