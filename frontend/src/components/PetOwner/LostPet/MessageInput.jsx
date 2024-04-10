import React from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../../hooks/useSendMessage'
import { useState } from "react";

const MessageInput = ({ ownerid }) => {
    const { loading, sendMessage } = useSendMessage(ownerid);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!message) return;
      await sendMessage(message);
      setMessage("");
    };

  return (
    <form class="custom-form" onSubmit={handleSubmit}>
      <div class="input-messagewrapper">
        <input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput