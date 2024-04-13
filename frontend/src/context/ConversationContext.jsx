import React, { createContext, useContext, useState } from "react";

// Create a context for conversation state
export const ConversationContext = createContext();



// Conversation context provider component
export const ConversationProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
