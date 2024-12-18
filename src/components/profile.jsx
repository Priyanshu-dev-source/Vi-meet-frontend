import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase'

const Profile = ({ isLoggedIn, setIsLoggedIn, onSuccess }) => {
  const [userName, setUserName] = useState("");
  const [isProfileBox, setIsProfileBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserName = sessionStorage.getItem("username");
      setUserName(storedUserName || "");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsProfileBox(false);
    localStorage.setItem("isLoggedIn", "false");
    sessionStorage.removeItem("username"); 
    sessionStorage.removeItem("email"); 
    setIsLoggedIn(false);
    navigate("/")
    // window.location.reload();
    signOut(auth).then(() => {
      onSuccess("Signed Out successfully")
    }).catch((error) => {
      console.log(error)
    });
  };

  const firstLetter = userName.split(" ").map(word => word[0]).join("").toUpperCase();

  return (
    <>
      <div className="navbar-profile-frame-wrapper">
        <button
          className="navabr-profile-circle"
          onClick={() => {
            setIsProfileBox((prev) => !prev);
          }}
        >
          <div>{firstLetter}</div>
        </button>
      </div>

      {isProfileBox && (
        <div className="profile-detail-body-wrapper">
          <div className="profile-details-name-part">
            Welcome home<br/>{userName}
          </div>
          <button className="profile-logout-button" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            &nbsp;Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
