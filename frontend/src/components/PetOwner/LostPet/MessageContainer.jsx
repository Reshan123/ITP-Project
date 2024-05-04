import React from 'react'
import Messages from './Messages';
import MessageInput from './MessageInput';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MessageContainer = ({ navBarProps}) => {
    
    //console.log("Received Ownerid:", oid);
  navBarProps("#FFF", "#B799D1");
    const [ownerName, setOwnerName] = useState("");

    const location = useLocation();
    const ownerid = location.state && location.state.Ownerid;

     

     useEffect(() => {
       const fetchOwnerName = async () => {
         try {
           const response = await fetch(
             "http://localhost:4000/api/petOwner/getAllUsers",
             {
               method: "GET",
               headers: {
                 "Content-Type": "application/json",
               },
             }
           );
           const data = await response.json();
           const ownerUser = data.find((user) => user._id === ownerid);
           if (ownerUser) {
             // Assuming the user object contains the user's name, update state accordingly
             setOwnerName(ownerUser.name);
           } else {
             console.error("Owner user not found");
           }
         } catch (error) {
           console.error("Error fetching owner name:", error);
         }
       };

       if (ownerid) {
         // Ensure ownerid is defined before making the request
         fetchOwnerName();
       }
     }, [location.state &&  location.state.Ownerid]);

  return (
    <div className="messagecontainer">
      <>
        {/*Header */}
        <div className="messageheader">
          <span className="label-text">To:</span>{" "}
          <span className="recipient">{ownerName}</span>
        </div>

        <Messages ownerid={ownerid} />
        <MessageInput ownerid={ownerid} />
      </>
    </div>
  );
};

export default MessageContainer