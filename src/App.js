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
import JoinMeetPage from "./components/JoinMeetPage";

function App() {
  const [fillUp, setFillUp] = useState("blur(0px)");
  const [loginRender, setLoginRender] = useState();
  const [signUpRender, setSignUpRender] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbarDisp, setNavbarDisp] = useState("flex");
  const [translateJoinPage, setTranslateJoinPage] = useState("translateX(1400px)");
  const [joinMeetPageVisibility, setJoinMeetPageVisibility] = useState(false);
  const [userNameData, setUserNameData] = useState("")
  // const [id, setId] = useState(""); 
  // const navigate = useNavigate();

  useEffect(() => {
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
  };

  const handleSuccess = (message) => {
    setFillUp("blur(0px)");
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1500,
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
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const sendUserNameData = (name) =>{
    setUserNameData(name);
  }

  const handleLoginSuccess = (successMessage) => {
    handleSuccess(successMessage);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleJoinPageVisibility = () => {
    setJoinMeetPageVisibility(true);
    setNavbarDisp("none");
    setTimeout(() => {
      setTranslateJoinPage("translateX(0px)");
    }, 200);
  };
  
  const handleNavDisp = () => {
    setNavbarDisp("flex");
  }

  return (
    <Router>
      <div className="main-body-wrapper">
        <div
          className="navbar-component-wrapper"
          style={{ filter: fillUp, display: navbarDisp }}
        >
          <NavbarComponent
            loginCard={loginCardPop}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            onSuccess={(successMessage) => handleSuccess(successMessage)}
          />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/meet"
            element={
              <MeetPage
              isLoggedIn={isLoggedIn}
                onSuccess={(successMessage) => handleSuccess(successMessage)}
                onError={(errorMessage) => handleError(errorMessage)}
                handleJoinPageVisibility={handleJoinPageVisibility}
                sendUserNameData={sendUserNameData}
                // setId={setId}
              />
            }
          />
          <Route
            path="/signup"
            element={
              signUpRender && (
                <SignUpAuth
                  onClickButton={closeCard}
                  onSuccess={(successMessage) => handleSuccess(successMessage)}
                  onError={(errorMessage) => handleError(errorMessage)}
                ></SignUpAuth>
              )
            }
          />
          <Route
            path="/login"
            element={
              loginRender && (
                <LoginAuth
                  onClickButton={closeCard}
                  signButton={signUpPop}
                  onSuccess={handleLoginSuccess}
                  onError={(errorMessage) => handleError(errorMessage)}
                ></LoginAuth>
              )
            }
          />
          <Route
            path="/joinMeetPage/:action"
            element={
              joinMeetPageVisibility && (
                <JoinMeetPage
                  handleNavDisp = {handleNavDisp}
                  translateJoinPage={translateJoinPage}
                  onSuccess={(successMessage) => handleSuccess(successMessage)}
                  onError={(errorMessage) => handleError(errorMessage)}
                  isLoggedIn={isLoggedIn}
                  userNameData={userNameData}
                  // id={id}
                ></JoinMeetPage>
              )
            }
          ></Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}
export default App;
