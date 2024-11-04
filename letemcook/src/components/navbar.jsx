import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-button" onClick={toggleNavbar}>
        ☰
      </button>
      {isOpen && <div className="overlay" onClick={toggleNavbar}></div>}
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleNavbar}>
          &times;
        </button>
        <ul className="navbar-links">
          <li>
            <Link to="/" onClick={toggleNavbar}>Home</Link>
          </li>
          <li>
            <Link to="/savedrecipes" onClick={toggleNavbar}>Saved Recipes</Link>
          </li>
          <li>
            <Link to="/createrecipe" onClick={toggleNavbar}>Create Recipes</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleNavbar}>Contact</Link>
          </li>
          <li>
            <Link to="/faq" onClick={toggleNavbar}>FAQ</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleNavbar}>About</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;