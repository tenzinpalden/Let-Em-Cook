import React from 'react';
import './ContactPage.css'; // CSS file for styling

const SimpleContactPage = () => {
  const members = [
    { name: "Tyler John Layton", email: "laytot@rpi.edu", image: "/members/tyler.png" },
    { name: "Nancy John Zhang", email: "zhangn3@rpi.edu", image: "/members/nancy.png" },
    { name: "Annabel Jong Choi", email: "choia7@rpi.edu", image: "/members/annab.png" },
    { name: "Benson John Cheng", email: "chengb2@rpi.edu", image: "/members/benson.png" },
    { name: "Tenzen John Palden", email: "tpalden@rpi.edu", image: "/members/tp.png" },
  ];

  return (
    <div className="simple-contact-page">
      <h1 className="contact-title">Contact Us</h1>
      {members.map((member, index) => (
        <div className="contact-member" key={index}>
          <div
            className="contact-image-container"
            style={{ backgroundImage: `url(${member.image})` }}
          ></div>
          <h2 className="contact-name">{member.name}</h2>
          <a href={`mailto:${member.email}`} className="email-link">
            {member.email}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SimpleContactPage;
