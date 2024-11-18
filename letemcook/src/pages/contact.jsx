import React from 'react';
import './ContactPage.css'; // CSS file for styling

const SimpleContactPage = () => {
  return (
    <div className="simple-contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-image-container"></div>
      <h2 className="contact-tyler">Tyler John Layton</h2>
      <a href="mailto:laytot@rpi.edu" className="email-link">
      laytot@rpi.edu
      </a>
    </div>
  );
};

export default SimpleContactPage;
