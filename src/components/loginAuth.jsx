import React from "react";
import { auth} from "../services/firebase"
import { browserLocalPersistence, signInWithEmailAndPassword, setPersistence} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAuthPage ({ onClickButton, signButton, onSuccess, onError }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadingAnimation(true)
    if (!email || !password) return onError("Enter the Credentials");

    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if( user !== null){
                      sessionStorage.setItem("username", user.displayName);
                      sessionStorage.setItem("email", user.email);
                    }
                    onSuccess("Logged in successfully");
                    navigate("/meet");
                    
                })
                  .catch((error) => {
                    console.error("Login error:", error);
                    const errorCode = error.code || "unknown_error";
                    console.error("Login error:", errorCode);
                    const errorMessage = error.message || "An unknown error occurred.";
                    onError("Invalid Credentials");
                    console.log(errorMessage)
                })
                .finally(()=>{
                  setLoadingAnimation(false);
                })
              }).catch((error) => {
                console.error("Persistence error:", error);
                onError("An error occurred while setting persistence.");
                setLoadingAnimation(false);
              });
};

  const handleSignUp = () => {
    navigate("/signup");
    // onClickButton();
    signButton();
  };

  const handleCloseButton = () => {
    navigate("/");
    onClickButton();
  };


  return (
    <div className="login-auth-page-wrapper">
      <div className="login-auth-detail-container">
        <div className="login-auth-container-header">
          <div className="login-auth-login-name">Login</div>
          <div
            className="login-auth-container-close-button"
            onClick={handleCloseButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
          </div>
        </div>
        <div className="login-auth-container-body">
          <form className="login-auth-email-pass-container" onSubmit={handleLogin}>
            <input
              onChange={(e)=> setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="login-auth-body-email"
              name="email"
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              className="login-auth-body-email"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <button className="login-auth-body-button-login">LOGIN</button>
          </form>
        </div>
        <div className="login-auth-container-signUp">
          Dont have an Account?&nbsp;&nbsp;
          <button
            onClick={handleSignUp}
            style={{
              color: "white",
              textDecoration: "underline",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
      { loadingAnimation && 
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      }
    </div>
  );
}