import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from "./components/navbar";
import LandingPage from "./components/landingPage";
import LoginAuth from "./components/loginAuth";
import SignUpAuth from './components/signUpAuth';
import MeetPage from "./components/meetPage";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {

  const [fillUp, setFillUp] = useState("blur(0px)");
  const [flexDisp, setFlexDisp] = useState("none");
  const [signDisp, setSignDisp] = useState("none");

  const loginCardPop = () =>{
    setFillUp("blur(4px)");
    setFlexDisp("flex");
  };

  const closeLoginCard = () =>{
    setFlexDisp("none");
    setSignDisp("none");
    setFillUp("blur(0px)");
  };

  const signUpPop = () =>{
    closeLoginCard();
    setSignDisp("flex");
    setFillUp("blur(4px)");
  }

  const handleSuccess = () =>{
    setFillUp("blur(0px)")
    toast.success('Signed up successfully', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }

  const handleError = () =>{
    toast.error('Email already exists', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }

  return (
    <Router>
      <div className="main-body-wrapper" style={{ filter: fillUp }}>
        <div className="navbar-component-wrapper">
          <NavbarComponent loginCard={loginCardPop} />
        </div>
        
        <div className="landing-home-page">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/meet" element={<MeetPage />} />
          </Routes>
        </div>
      </div>

      <div className="login-auth-page-wrapper" style={{ display: flexDisp }}>
        <Routes>
          <Route path="/login" element={<LoginAuth onClickButton={closeLoginCard} signButton={signUpPop}></LoginAuth>}/>
        </Routes>
      </div>
      <div className="login-auth-page-wrapper" style={{ display: signDisp }}>
        <Routes>
          <Route path="/signup" element={<SignUpAuth onClickButton={closeLoginCard} onUserCreated={handleSuccess} onUserNotCreated={handleError}></SignUpAuth>}/>
        </Routes>
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
