import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpAuth({ onClickButton, onUserCreated, onUserNotCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCloseButton = () =>{
    navigate("/")
    onClickButton()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://vi-meet.onrender.com/signup", { name, email, password })
      .then((result) => {
        if (result.status === 201) {
          onUserCreated()
          navigate("/")
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
            onUserNotCreated()
          // window.alert("Email already exixts")
        } else {
          console.log(err);
        }
      });
  };

  return (
    <>
      <div className="login-auth-detail-container">
        <div className="login-auth-container-header">
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
            onSubmit={handleSubmit}
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
        <div className="login-auth-page-wrapper">
          Dont have an Account?&nbsp;&nbsp;{" "}
          <a href="/" style={{ color: "white", textDecoration: "underline" }}>
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
}