import React from 'react'
import Message from './Message';
import useGetMessages from '../../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import {  useRef ,useEffect} from "react";
import useListenMessages from '../../../hooks/useListenMessages';

const Messages = ({ ownerid }) => {
    const { messages, loading } = useGetMessages(ownerid);
    const lastMessageRef = useRef();
    useListenMessages()
    console.log("messages:", messages);

    //scrolling to the bottom
    useEffect(() => {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, [messages]);
    return (
      <div className="messages">
        {/* <Message ownerid={ownerid} /> */}

        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}
        {loading &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {!loading && messages.length === 0 && (
          <p style={{ textAlign: "center" }}>
            Send a message to start the conversation (if this happen just go back and click the send msg btn again)
          </p>
        )}
      </div>
    );
};

export default Messages