import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="menu-button" onClick={toggleNavbar}>
        ☰ {/* Menu icon or text */}
      </button>
      
      {/* Sidebar */}
      <div className={`navbar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleNavbar}>
          &times; {/* Close icon */}
        </button>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      
      {/* Overlay when navbar is open */}
      {isOpen && <div className="overlay" onClick={toggleNavbar}></div>}
    </div>
  );
};

export default Navbar;