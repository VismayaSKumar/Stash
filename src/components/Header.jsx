import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/images/logoWebCamPage.svg';
import logoLogin from '../assets/images/logoLoginPage.svg';
import menu from '../assets/images/menuIcon.svg';
import home from "../assets/images/homeIcon.svg";
import home2 from '../assets/images/homeIcon2.svg';

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const isLoginPage = path === '/login';
  const isSignupPage = path === '/signup';
  const isLandingPage = path === '/';

  const bgClr = (isLoginPage || isSignupPage) ? 'bg-primary' : 'bg-secondary';
  
  let logoSrc = null;
  if (isLoginPage || isSignupPage) {
    logoSrc = logoLogin;
  } else if (!isLandingPage) {
    logoSrc = logo;
  }

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className={`w-full h-20 flex justify-between items-center px-4 lg:px-10 pt-4 ${bgClr}`}>
      <div>
        {logoSrc && (
          <img src={logoSrc} alt="logo" className="h-20 lg:h-24 hover:scale-105 duration-600" />
        )}
      </div>
      <div className="flex gap-3">
        {isLoginPage || isSignupPage ? (
          <img
            src={home2}
            alt="home icon"
            onClick={navigateToHome}
            className="h-13 lg:h-15 hover:opacity-70 duration-400 cursor-pointer"
          />
        ) : isLandingPage ? (
          <img
            src={menu}
            alt="menu icon"
            onClick={onMenuClick}
            className="h-13 lg:h-15 hover:opacity-70 duration-400 cursor-pointer"
          />
        ) : (
          <>
            <img
              src={home}
              alt="home icon"
              onClick={navigateToHome}
              className="h-13 lg:h-15 hover:opacity-70 duration-400 cursor-pointer"
            />
            <img
              src={menu}
              alt="menu icon"
              onClick={onMenuClick}
              className="h-13 lg:h-15 hover:opacity-70 duration-400 cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
