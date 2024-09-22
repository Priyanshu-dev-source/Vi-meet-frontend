import React from "react";
import { useState, useEffect } from "react";
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
          audioStream.getTracks().forEach(track => track.stop());
          setAudioStream(null);
        }
      } catch (err) {
        console.error("Error accessing audio:", err);
      }
    };

    getAudio();

    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isAudioOn, audioStream]);

};

export default function MeetPage() {

  const [micSvg, setMicSvg] = useState("micOn");
  const [videoSvg, setVideoSvg] = useState("videoOn");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  const handleMicSvg = () => {
    setMicSvg(micSvg === "micOff" ? "micOn" : "micOff");
    setIsAudioOn(!isAudioOn);
  };
  
  const videoConstraints = {
    width: 691,
    height: 410,
    facingMode: "user",
  };
  
  const handleVideoSvg = () => {
    setVideoSvg(videoSvg === "videoOff" ? "videoOn" : "videoOff");
    setIsCameraOn(isCameraOn === false ? true : false);
  };

  return (
    <>
      <div className="meet-page-main-body-wrapper">
        <div className="meet-page-info-side-page">
          <div className="meet-page-info-side-page-header">Join Meet</div>
          <div className="meet-page-info-side-page-details">
            To create new meeting just click on Meet or to join a meeting
            <br /> enter the code and click on Join
          </div>
          <div className="meet-page-info-side-page-meet-button">
            <button>New Meet</button>
            <input type="text" placeholder="Enter name" />
          </div>
          <div className="meet-page-info-side-page-meet-code-join">
            <input type="text" placeholder="Enter code" />
          </div>
          <div className="meet-page-info-side-page-join-button">
            <button>
              <div
                style={{
                  height: "100%",
                  width: "20%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#e8eaed"
                >
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                </svg>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "5px",
                }}
              >
                Join
              </div>
            </button>
          </div>
        </div>
        <div className="meet-page-view-side-page">
          <div className="meet-page-view-side-page-video-portal">
            <div className="meet-page-view-side-page-video-portal-space">
              {isCameraOn && <Webcam
                  audio={false}
                  videoConstraints={videoConstraints}
                ></Webcam>
              }
              <AudioComponent isAudioOn={isAudioOn}></AudioComponent>
            </div>
            <div className="meet-page-view-side-page-video-portal-mic-video-button" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'30px'}}>
              {isAudioOn ? (
                <div className="meet-page-view-side-page-video-portal-audio-bar">
                  <p>HEARING.....</p>
                </div>

              ):(
                <div className="meet-page-view-side-page-video-portal-audio-bar">
                  <p>MIC OFF</p>
                </div>
              )}
              <div className="meet-page-view-side-page-video-portal-mic-button">
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleMicSvg}
                >
                  {micSvg === "micOff" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 -960 960 960"
                      width="30px"
                      fill="#e8eaed"
                    >
                      <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 -960 960 960"
                      width="30px"
                      fill="#e8eaed"
                    >
                      <path d="m710-362-58-58q14-23 21-48t7-52h80q0 44-13 83.5T710-362ZM480-594Zm112 112-72-72v-206q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v126l-80-80v-46q0-50 35-85t85-35q50 0 85 35t35 85v240q0 11-2.5 20t-5.5 18ZM440-120v-123q-104-14-172-93t-68-184h80q0 83 57.5 141.5T480-320q34 0 64.5-10.5T600-360l57 57q-29 23-63.5 39T520-243v123h-80Zm352 64L56-792l56-56 736 736-56 56Z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="meet-page-view-side-page-video-portal-video-button">
                <button
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleVideoSvg}
                >
                  {videoSvg === "videoOff" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 -960 960 960"
                      width="30px"
                      fill="#e8eaed"
                    >
                      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 -960 960 960"
                      width="30px"
                      fill="#e8eaed"
                    >
                      <path d="M880-260 720-420v67l-80-80v-287H353l-80-80h367q33 0 56.5 23.5T720-720v180l160-160v440ZM822-26 26-822l56-56L878-82l-56 56ZM497-577ZM384-464ZM160-800l80 80h-80v480h480v-80l80 80q0 33-23.5 56.5T640-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm80 480v-22q0-44 44-71t116-27q72 0 116 27t44 71v22H240Z" />
                    </svg>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
