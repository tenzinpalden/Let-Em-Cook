import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add logic here to filter or search recipes based on `searchQuery`
    // This could be done via API call or filtering a recipe list in state
  };

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Let 'Em Cook</h1>
          <p>Find easy, budget-friendly recipes tailored for college students.</p>
          <form onSubmit={handleSearchSubmit} className="search-bar-form">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for recipes by ingredients, type, or budget..."
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </section>
      <section className="explore-section">
        <h2>Explore Recipes</h2>
        <p>Browse through our collection of recipes to find the perfect meal for any occasion.</p>
        {/* Additional content for displaying recipes */}
      </section>
    </div>
  );
}

export default HomePage;