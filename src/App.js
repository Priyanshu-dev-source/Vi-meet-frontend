import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/navbar";
import LandingPage from "./components/landingPage";
import LoginAuth from "./components/loginAuth";
import SignUpAuth from "./components/signUpAuth";
import MeetPage from "./components/meetPage";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  const [fillUp, setFillUp] = useState("blur(0px)");
  const [flexDisp, setFlexDisp] = useState("none");
  const [signDisp, setSignDisp] = useState("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginCardPop = () => {
    setFillUp("blur(4px)");
    setFlexDisp("flex");
  };
  const closeLoginCard = () => {
    setFlexDisp("none");
    setSignDisp("none");
    setFillUp("blur(0px)");
  };
  const signUpPop = () => {
    closeLoginCard();
    setSignDisp("flex");
    setFillUp("blur(4px)");
  };
  const handleSuccess = (message) => {
    setFillUp("blur(0px)");
    toast.success(message, {
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
  };
  const handleError = (message) => {
    toast.error(message, {
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
  };
  return (
    <Router>
      <div className="login-auth-page-wrapper" style={{ display: flexDisp }}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginAuth
                onClickButton={closeLoginCard}
                signButton={signUpPop}
                onUserLoggedIn={(successMessage) =>
                  handleSuccess("Login succesful" , setIsLoggedIn(true))
                }
                onPasswordError={(errorMessage) =>
                  handleError("Invalid Username or Password")
                }
              ></LoginAuth>
            }
          />
        </Routes>
      </div>
      <div className="login-auth-page-wrapper" style={{ display: signDisp }}>
        <Routes>
          <Route
            path="/signup"
            element={
              <SignUpAuth
                onClickButton={closeLoginCard}
                onUserCreated={(successMessage) =>
                  handleSuccess("Signed up successfully")
                }
                onUserNotCreated={(errorMessage) =>
                  handleError("Email already exixts")
                }
              ></SignUpAuth>
            }
          />
        </Routes>
      </div>
      <div className="main-body-wrapper">
        <div className="navbar-component-wrapper" style={{ filter: fillUp }}>
          <NavbarComponent loginCard={loginCardPop} isLoggedIn={isLoggedIn} />
        </div>

        <div className="landing-home-page">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/meet" element={<MeetPage />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}
export default App;
