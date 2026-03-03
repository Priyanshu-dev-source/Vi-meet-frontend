import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { io } from "socket.io-client";

export default function LandingPageComponent() {
  const [socket, setSocket] = useState(null);

  useEffect(()=>{
    
    if(!socket){
      const serverUrl = import.meta.env.VITE_SERVER_URL || window.location.origin;
      const newSocket = io(serverUrl);
      setSocket(newSocket);
      newSocket.emit("server-cold-start", "Server is up running");
      newSocket.on("server-started", (message)=>{
        console.log(message);
      })
    }
    
    return () => {
      if(socket){
        socket.disconnect();
      }
    }

  },[])

  return (
    <div className="landing-home-page">
      <div className="landing-page-content-part">
        <div className="landing-page-content-header">
          <h1>Vi Meet</h1>
        </div>
        <div className="landing-page-content-info">
          <p style={{color: "white"}}>
            Connect effortlessly with our high-definition
            video calling<br/> platform. Enjoy seamless, secure 
            calls. Perfect for personal<br/> or professional use. 
            Stay connected with ease!
          </p>
        </div>
      </div>
      <div className="landing-page-logo-part">
        <div className="landing-page-logo-part-container">
          <div className="landing-page-logo-first-container">
            <div className="landing-page-logo-rotator">
              <img
                className="landing-page-first-container-logo"
                src={logo}
                alt=""
              />
            </div>
          </div>
          <div className="landing-page-logo-second-container">
            <div className="landing-page-logo-rotator-text">
              <div
                style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}
              >
                ViMeet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}