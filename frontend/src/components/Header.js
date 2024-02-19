import React from 'react'
import mainlogo from "./../images/logocat.jpg";
import "./Header.css";

function Header() {
  return (
    <div className='header-main'>
    <img src={mainlogo} alt='logo' className='header-logo'/>
    <div className='header-name'>Exploding Kitten</div> 
    </div>
  )
}

export default Header;