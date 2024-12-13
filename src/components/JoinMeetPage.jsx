import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";

const AudioComponent = ({ isAudioOn }) => {
  const [audioStream, setAudioStream] = useState(null);

  useEffect(() => {
    let stream;
    const getAudio = async () => {
      try {
        if (isAudioOn) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setAudioStream(stream);
        } else if (audioStream) {
          audioStream.getTracks().forEach((track) => track.stop());
          setAudioStream(null);
        }
      } catch (err) {
        console.error("Error accessing audio:", err);
      }
    };

    getAudio();

    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isAudioOn, audioStream]);
};

// window.removeEventListener('beforeunload', alert("Meeting is leaved due to refresh"));

const JoinMeetPage = ({ translateJoinPage, isLoggedIn, userNameData }) => {
  const [userName, setUserName] = useState("");
  const [micSvg, setMicSvg] = useState("micOn");
  const [videoSvg, setVideoSvg] = useState("videoOn");
  const [chatBoxDisp, setChatBoxDisp] = useState("none");
  const [chatBoxTranslate, setChatBoxTranslate] = useState("translateX(400px)");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);


  const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "user",
  };

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserName = sessionStorage.getItem("username");
      setUserName(storedUserName || "");
    }
  }, [isLoggedIn]);

  const handleMicSvg = () => {
    setMicSvg(micSvg === "micOff" ? "micOn" : "micOff");
    setIsAudioOn(!isAudioOn);
  };

  const handleVideoSvg = () => {
    setVideoSvg(videoSvg === "videoOff" ? "videoOn" : "videoOff");
    setIsCameraOn(isCameraOn === false ? true : false);
  };

  const handleChatBoxDisplay = () => {
    setChatBoxDisp((prevDisp) => (prevDisp === "none" ? "flex" : "none"));
    setTimeout(() => {
      setChatBoxTranslate((prevTranslate) =>
        prevTranslate === "translateX(400px)"
          ? "translateX(0px)"
          : "translateX(400px)"
      );
    }, 50);
  };

  var firstLetter = userName.split(" ").map(word => word[0]).join("").toUpperCase();

  return (
    <div className="join-meet-page-wrapper">
      <div
        className="join-meet-page-video-chat-body"
        style={translateJoinPage && { transform: translateJoinPage }}
      >
        <div className="join-meet-page-video-optionbar-area">
          <div className="join-meet-page-video-area">
            <div className="join-meet-page-account-own-video">
            {isCameraOn ? (
              <div className="webcam-container">
                <Webcam
                  audio={false}
                  videoConstraints={videoConstraints}
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
              ) : (
              <div className="join-meet-page-acouunt-own-holder-profile-picture">
                {firstLetter || userNameData.split(" ").map(word => word[0]).join("").toUpperCase()}
              </div>
              )}
              <AudioComponent isAudioOn={isAudioOn}></AudioComponent>
              <div className="join-meet-page-account-name">{userName || userNameData}</div>
            </div>
            <div className="join-meet-page-account-video">
                <div className="join-meet-page-acouunt-holder-profile-picture">
                  {/* {firstLetter} */}
                </div>
              <div className="join-meet-page-account-name">
                {/* {userName} */}
                </div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
            <div className="join-meet-page-account-video">
              <div className="join-meet-page-acouunt-holder-profile-picture"></div>
              <div className="join-meet-page-account-name"></div>
            </div>
          </div>
          <div className="join-meet-page-optionbar-area">
            <button
              className="join-meet-page-optionbar-video-button"
              onClick={handleVideoSvg}
            >
              {videoSvg === "videoOff" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#e8eaed"
                >
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#e8eaed"
                >
                  <path d="M880-260 720-420v67l-80-80v-287H353l-80-80h367q33 0 56.5 23.5T720-720v180l160-160v440ZM822-26 26-822l56-56L878-82l-56 56ZM497-577ZM384-464ZM160-800l80 80h-80v480h480v-80l80 80q0 33-23.5 56.5T640-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm80 480v-22q0-44 44-71t116-27q72 0 116 27t44 71v22H240Z" />
                </svg>
              )}
            </button>
            <button
              className="join-meet-page-optionbar-audio-button"
              onClick={handleMicSvg}
            >
              {micSvg === "micOff" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#e8eaed"
                >
                  <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#e8eaed"
                >
                  <path d="m710-362-58-58q14-23 21-48t7-52h80q0 44-13 83.5T710-362ZM480-594Zm112 112-72-72v-206q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v126l-80-80v-46q0-50 35-85t85-35q50 0 85 35t35 85v240q0 11-2.5 20t-5.5 18ZM440-120v-123q-104-14-172-93t-68-184h80q0 83 57.5 141.5T480-320q34 0 64.5-10.5T600-360l57 57q-29 23-63.5 39T520-243v123h-80Zm352 64L56-792l56-56 736 736-56 56Z" />
                </svg>
              )}
            </button>
            <button
              className="join-meet-page-optionbar-chat-button"
              onClick={handleChatBoxDisplay}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#e8eaed"
              >
                <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg>
            </button>
            <button className="join-meet-page-optionbar-leave-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#e8eaed"
              >
                <path d="m136-304-92-90q-12-12-12-28t12-28q88-95 203-142.5T480-640q118 0 232.5 47.5T916-450q12 12 12 28t-12 28l-92 90q-11 11-25.5 12t-26.5-8l-116-88q-8-6-12-14t-4-18v-114q-38-12-78-19t-82-7q-42 0-82 7t-78 19v114q0 10-4 18t-12 14l-116 88q-12 9-26.5 8T136-304Zm104-198q-29 15-56 34.5T128-424l40 40 72-56v-62Zm480 2v60l72 56 40-38q-29-26-56-45t-56-33Zm-480-2Zm480 2Z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="join-meet-page-chat-area"
          style={{ display: chatBoxDisp, transform: chatBoxTranslate }}
        ></div>
      </div>
    </div>
  );
};

export default JoinMeetPage;
