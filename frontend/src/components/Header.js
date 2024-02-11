import React from 'react'
import mainlogo from "./../images/logocat.jpg";
import "./Header.css";

function Header() {
  return (
    <div className='header-main'>
    <img src={mainlogo} alt='logo' className='header-logo'/>
    <div className='header-name'><h2>Exploding Kitten</h2></div> 
    </div>
  )
}

export default Header;