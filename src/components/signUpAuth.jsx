import React, { useState } from "react";
import { auth, db } from "../services/firebase"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function SignUpAuth({ onClickButton, onSuccess, onError }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCloseButton = () =>{
    navigate("/")
    onClickButton()
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name, 
      });
      await set(ref(db, `users/${user.uid}`), {
        username: name,
        email: email,
        password: password,
      });
  
      navigate("/");
      onSuccess("Signed up successfully");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);
      onError("Email already exists!");
    }
  };
  

  return (
    <div className="signUp-auth-page-wrapper">
      <div className="login-auth-detail-container">
        <div className="signUp-auth-container-header">
          <div className="login-auth-login-name">Sign Up</div>
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
          <form
            className="login-auth-email-pass-container"
            onSubmit={handleSignUp}
          >
            <input
              name="name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="login-auth-body-email"
              autoComplete="off"
              required
            />
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="login-auth-body-email"
              autoComplete="off"
              required
            />
            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="login-auth-body-email"
              autoComplete="off"
              required
            />
            <button type="submit" className="login-auth-body-button-signup">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}