import React from 'react';
import './ContactPage.css'; // CSS file for styling

// everyones contacts
const SimpleContactPage = () => {
  const members = [
    { name: "Tyler Layton", email: "laytot@rpi.edu", image: "/members/tylerCat.png" },
    { name: "Nancy Zhang", email: "zhangn7@rpi.edu", image: "/members/nancyCat.png" },
    { name: "Annabelle Choi", email: "choia7@rpi.edu", image: "/members/annabelleCat.png" },
    { name: "Benson Cheng", email: "chengb2@rpi.edu", image: "/members/bensonCat.png" },
    { name: "Tenzin Palden", email: "tpalden@rpi.edu", image: "/members/tenzinCat.png" },
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
