import React, { useState, useEffect } from "react";
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
  const [loginRender, setLoginRender] = useState();
  const [signUpRender, setSignUpRender] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on page load
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    if (savedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginCardPop = () => {
    setFillUp("blur(4px)");
    setLoginRender(true);
    setIsLoggedIn(false);
  };
  
  const signUpPop = () => {
    setFillUp("blur(4px)");
    setSignUpRender(true);
    setLoginRender(false);
  };

  const closeCard = () => {
    setFillUp("blur(0px");
    setLoginRender(false);
    setSignUpRender(false); 
  } 

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

  const handleLoginSuccess = (successMessage) => {
    handleSuccess(successMessage);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Store the login status in localStorage
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.setItem("isLoggedIn", "false"); // Remove login status from localStorage
  // };
  
  return (
    <Router>
      <div className="main-body-wrapper">
        <div className="navbar-component-wrapper" style={{ filter: fillUp }}>
          <NavbarComponent loginCard={loginCardPop} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/meet" element={<MeetPage isLoggedIn={isLoggedIn}/>} />
          <Route
            path="/signup"
            element={
              signUpRender && 
              <SignUpAuth
                onClickButton={closeCard}
                onSuccess={(successMessage) =>
                  handleSuccess(successMessage)
                }
                onError={(errorMessage) =>
                  handleError(errorMessage)
                }
              ></SignUpAuth>
            }
          />
            <Route
              path="/login"
              element={
                loginRender && 
                <LoginAuth
                onClickButton={closeCard}
                signButton={signUpPop}
                // onSuccess={(successMessage) =>
                //   handleSuccess(successMessage, setIsLoggedIn(true))
                //   }
                onSuccess={handleLoginSuccess}
                onError={(errorMessage) =>
                  handleError(errorMessage)
                }
                ></LoginAuth>
              }
            />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}
export default App;


