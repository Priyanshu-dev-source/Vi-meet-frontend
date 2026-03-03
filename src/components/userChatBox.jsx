// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client"

// const UserChatBox = ({userInput}) => {
//   const [userInput, setUserInput] = useState("");
//   const [socket, setSocket] = useState(null);
//   const pathname = window.location.pathname;
//   const segments = pathname.split("/");
//   const dynamicRoute = segments[2];
  
//   useEffect(() => {
//     if(!socket){
//       const newSocket = io("http://localhost:4001");
//       setSocket(newSocket);
//       newSocket.on("user-message-receive", (userMessage) => {
//         console.log("User message received", userMessage);
//         const userChatBox = document.querySelector(".user-chat-box-container");
//         const userMessageBox = document.createElement("div");
//         userMessageBox.classList.add("user-message-box");
//         userMessageBox.innerHTML = userMessage;
//         userChatBox.appendChild(userMessageBox);
//       });
    
      
//       return () => {
//         newSocket.off("user-message-receive");
//       };
//     }
//   }, []);
  
//   const addMessageBox = () => {
//     if (userInput.trim()) {
//       socket.emit("user-message-send", {
//         userRoomId: dynamicRoute,
//         userMessage: userInput,
//       });

//       const userChatBox = document.querySelector(".user-chat-box-container");
//       const userMessageBox = document.createElement("div");
//       userMessageBox.classList.add("user-message-box");
//       userMessageBox.innerHTML = userInput;
//       userChatBox.appendChild(userMessageBox);

//       setUserInput("");
//     }
//   };

//   return (
//     <div className="user-chat-input-box-wrapper">
//       <div className="user-chat-box-container">
//       <div className="user-chat-time-container">
//         <div className="user-message-box">
//            lorem
//         </div>
//         <div className="user-sender-name-time-stamp">
//           Priyanshu &nbsp;&nbsp; 12:00 PM
//         </div>
//       </div>
//       </div>
//       <div className="user-chat-input-box">
//         <input
//           className="user-input"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") addMessageBox();
//           }}
//           type="text"
//         />
//         <button className="user-message-send-button" onClick={addMessageBox}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="30px"
//             viewBox="0 -960 960 960"
//             width="30px"
//             fill="#FFFFFF"
//           >
//             <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserChatBox;

