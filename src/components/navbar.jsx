import React from "react";
import { useNavigate } from 'react-router-dom';

export default function NavbarComponent({ loginCard }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/meet');
  };

  const handleLogin = () =>{
    loginCard()
    navigate('/login')
  }

  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar-logo-container">
          <div
            style={{
              color: "white",
              fontSize: "25px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Vi Meet
          </div>
        </div>
        <div className="navbar-items-container">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Support</a>
          </li>
          <li>
            <a href="/">Apps</a>
          </li>
        </div>
        <div className="navbar-button-container">
          <button className="navbar-login-button" onClick={handleLogin}>
            Login
          </button>
          <button onClick={handleClick} style={{width:'100px'}} className="navbar-login-button">
            Join Meet
            </button>
        </div>
      </div>
    </>
  );
}