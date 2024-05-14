import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useUserContext } from "../../../hooks/userContextHook";
import { IoPaw } from "react-icons/io5";
import "./styles.css";
import useListenMessages from "../../../hooks/useListenMessages";
import { BsBell } from "react-icons/bs";
import { useConversation } from "../../../hooks/useConversation";
import React, { useState, useEffect } from "react";

const NavBar = ({ navBarColor, navBarBackgroundColor }) => {
  const navigate = useNavigate();
  const { user, dispatch } = useUserContext();
  const [unreadMessages, setUnreadMessages] = useListenMessages();
  const [showNotifications, setShowNotifications] = useState(false);
  //   const [newNotifications, setNewNotifications] = useState([]);
    const { messages, setMessages } = useConversation();
    const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

 

  return (
    <>
      {!user && (
        <nav style={{ background: navBarBackgroundColor }}>
          <div className="navLogo">
            <IoPaw
              onClick={() => {
                scrollToTop();
                navigate("/pet/home");
              }}
              style={{ color: navBarColor }}
            />
          </div>
          <div className="navMidContainer">
            <NavHashLink
              to="/pet/home#whoarewe"
              style={{ color: navBarColor }}
              end
            >
              About Us
            </NavHashLink>

            <NavHashLink
              to="/pet/home#bookAppointments"
              style={{
                color: navBarColor,
                // border: `${navBarColor} 4px solid`,
              }}
              className="buttonHoverAnimation"
              end
            >
              Book an Appointment
            </NavHashLink>
            <NavLink
              to="/pet/store"
              className="NavLink"
              style={{ color: navBarColor }}
              onClick={scrollToTop}
              end
            >
              Store
            </NavLink>
            <NavLink
              to="/pet/adopt"
              className="NavLink"
              style={{ color: navBarColor }}
              onClick={scrollToTop}
              end
            >
              Adopt a pet
            </NavLink>
            <NavLink
              to="/pet/lostpetnotices"
              className="NavLink"
              style={{ color: navBarColor }}
              onClick={scrollToTop}
              end
            >
              Lost Pet Notices
            </NavLink>
          </div>
          <div className="navLogin">
            <NavLink
              to="/pet/signin"
              className="NavLink buttonHoverAnimation"
              onClick={scrollToTop}
              style={{
                color: navBarColor,
                // border: `${navBarColor} 4px solid`,
              }}
              end
            >
              Sign In
            </NavLink>
          </div>
        </nav>
      )}
      {user && (
        <nav style={{ background: navBarBackgroundColor }}>
          <div className="navLogo">
            <IoPaw
              onClick={() => {
                scrollToTop();
                navigate("/pet/home");
              }}
              style={{ color: navBarColor }}
            />
          </div>
          <div className="navMidContainer">
            <NavHashLink
              to="/pet/home#whoarewe"
              style={{ color: navBarColor }}
              end
            >
              About Us
            </NavHashLink>

            <NavHashLink
              to="/pet/home#bookAppointments"
              style={{
                color: navBarColor,
                // border: `${navBarColor} 4px solid`,
              }}
              className="buttonHoverAnimation"
              end
            >
              Book an Appointment
            </NavHashLink>
            <NavLink
              to="/pet/store"
              className="NavLink"
              style={{ color: navBarColor }}
              onClick={scrollToTop}
              end
            >
              Store
            </NavLink>
            <NavLink
              to="/pet/adopt"
              className="NavLink"
              style={{ color: navBarColor }}
              onClick={scrollToTop}
              end
            >
              Adopt a pet
            </NavLink>
            <NavLink
              to="/pet/lostpetnotices"
              className="NavLink"
              style={{ color: navBarColor }}
              onClick={scrollToTop}
              end
            >
              Lost Pet Notices
            </NavLink>
          </div>
          <div className="navLogin">
            <NavLink
              to="/pet/profile"
              className="NavLink buttonHoverAnimation"
              onClick={scrollToTop}
              style={{
                color: navBarColor,
                // border: `${navBarColor} 4px solid`,
              }}
              end
            >
              {" "}
              {user.username}
            </NavLink>
          </div>

          <div
            style={{
              position: "relative",
              marginLeft: "-50px",
              marginTop: "5px",
            }}
          >
            <BsBell
              onClick={() => {
                // Handle notification click
                setUnreadMessages(false);
                setShowNotifications((prevState) => !prevState);

                console.log("Chaged to ", unreadMessages);
              }}
              style={{
                color: navBarColor,
                cursor: "pointer",
                fontSize: "24px",
              }}
            />
            {unreadMessages && (
              <div
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  backgroundColor: "red",
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                }}
              ></div>
            )}
          </div>

          {/* Notification list */}

          {showNotifications && (
            <div className="notificationList">
              {/* Render each notification message */}
              {/* {newNotifications
                  .slice()
                  .reverse()
                  .map((notification, index) => (
                    <div className="notificationItem" key={index}>
                      {notification.newMessage}
                    </div>
                  ))} */}

              {messages
                .filter((message) => message.receiverId === user.uid)
                .slice()
                .reverse()
                .map((message, index) => (
                  <NavLink
                    key={index}
                    to={{
                      pathname: "/pet/lostpetnotices/messages",
                      state: { Ownerid: message.senderId }
                    }}
                  >
                    <div className="notificationItem" key={index}>
                      {message.message}
                    </div>
                  </NavLink>
                ))}

              {/* {showNotifications && newMessage && (
                  <div className="notificationList"> */}
              {/* <div className="notificationItem">{messages.message}</div> */}
              {/* </div> */}
              {/* // )} */}
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default NavBar;
