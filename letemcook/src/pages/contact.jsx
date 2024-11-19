import React from 'react';
import './ContactPage.css'; // CSS file for styling

const SimpleContactPage = () => {
  const members = [
    { name: "Tyler John Layton", email: "laytot@rpi.edu", image: "/members/tyler.png" },
    { name: "Nancy John Zhang", email: "zhangn7@rpi.edu", image: "/members/nancy.png" },
    { name: "Annabel JongJohnJohnjoHNLinLin Choi", email: "choia7@rpi.edu", image: "/members/annab.png" },
    { name: "Benson John Cheng", email: "chengb2@rpi.edu", image: "/members/benson.png" },
    { name: "Tenzin John Palden", email: "tpalden@rpi.edu", image: "/members/tp.png" },
  ];

  return (
    <div className="simple-contact-page">
    <h1 className="contact-title">Contact Us</h1>
    <div className="contact-members-container">
      {members.map((member, index) => (
        <div className="contact-member" key={index}>
          <img
            src={member.image}
            alt={`${member.name}'s profile`}
            className="contact-image"
          />
          <h2 className="contact-name">{member.name}</h2>
          <a href={`mailto:${member.email}`} className="email-link">
            {member.email}
          </a>
        </div>
      ))}
    </div>
  </div>
  );
};

export default SimpleContactPage;
