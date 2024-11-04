import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  // Close the navbar when the Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeNavbar();
      }
    };

    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </div>
      {isOpen && <div className="overlay" onClick={closeNavbar}></div>}
      <nav className={`navbar-popup ${isOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link" onClick={closeNavbar}>Home</Link>
          </li>
          <li>
            <Link to="/savedrecipes" className="navbar-link" onClick={closeNavbar}>Saved Recipes</Link>
          </li>
          <li>
            <Link to="/createrecipe" className="navbar-link" onClick={closeNavbar}>Create Recipe</Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link" onClick={closeNavbar}>Contact</Link>
          </li>
          <li>
            <Link to="/faq" className="navbar-link" onClick={closeNavbar}>FAQ</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;