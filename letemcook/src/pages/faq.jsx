import React from 'react';
import './FAQPage.css';

// frequently asked questions
const FAQPage = () => {
  const faqs = [
    {
      question: "What is Let 'Em Cook?",
      answer: "Let 'Em Cook is a platform that provides affordable and delicious recipes to suit your budget.",
    },
    {
      question: "Are the recipes free?",
      answer: "Yes! All recipes on our website are completely free to access and enjoy. It is built for college students and also low-income families to find cheap recipes.",
    },
    {
      question: "Do you have vegetarian or vegan recipes?",
      answer: "Absolutely! We offer a wide range of vegetarian, vegan, and other dietary-friendly options.",
    },
    {
      question: "How do I save my favorite recipes?",
      answer: "You can save your favorite recipes by clicking the star icon on the recipe page, which will then be added to your Saved Recipes tab.",
    },
    {
      question: "Can I submit my own recipes?",
      answer: "Yes, we welcome your contributions! Use the 'Create Recipe' tab to share your creations with our community.",
    },
  ];

  return (
    <div className="faq-page">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h2 className="faq-question">{faq.question}</h2>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
