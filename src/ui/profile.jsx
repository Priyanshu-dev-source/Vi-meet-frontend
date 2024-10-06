import React from "react";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [isProfileBox, setIsProfileBox] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://vi-meet-onrender.com/user", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.user.name);
        } else {
          console.log("User not authenticated");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <>
      <div className="navbar-profile-frame-wrapper">
        <button
          className="navabr-profile-circle"
          onClick={() => {
            setIsProfileBox((prev) => !prev);;
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
          <button className="profile-logout-button">
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
