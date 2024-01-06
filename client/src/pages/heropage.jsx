import React, { useContext } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./heropage.css";
import { useAuth0 } from '@auth0/auth0-react'



const Intro = () => {
 
  const { loginWithRedirect } = useAuth0()


  return (
    
    <div className="hero-section" >
      <div className="hero-content">
        <h1>Welcome to SASS Product</h1>
        <p>Discover amazing features and take your productivity to the next level.</p>
        <div className="hero-buttons">
          <button className="signup-button">Sign Up</button>
          <button  onClick={()=>loginWithRedirect()} className="login-button">Login</button>
        </div>
      </div>
      
    </div>
    
  );
};

export default Intro;