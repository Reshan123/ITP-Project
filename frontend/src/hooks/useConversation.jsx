
import { useContext } from "react";
import{ConversationContext} from '../context/ConversationContext'

export const useConversation= () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw Error("useConversation  must be used ina a  ConversationProvider");
  }

  return context;
};
