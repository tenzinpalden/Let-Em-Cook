import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the recipes.json file in the public folder
    fetch('/recipes.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      // Filter recipes based on search query
      const matches = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(matches);
    } else {
      setFilteredRecipes([]);
    }
  };

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Let 'Em Cook</h1>
          <p>Find easy, budget-friendly recipes tailored for college students.</p>
          <form onSubmit={(e) => e.preventDefault()} className="search-bar-form">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for recipes..."
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          {filteredRecipes.length > 0 && (
            <div className="dropdown">
              <ul>
                {filteredRecipes.map((recipe) => (
                  <li key={recipe.id} className="dropdown-item">
                    <Link to={`/recipe/${recipe.id}`} className="dropdown-link">
                      <img src={recipe.image} alt={recipe.title} className="dropdown-image" />
                      <span>{recipe.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <section className="recipe-list-section">
        <h2>Explore Recipes</h2>
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <h3>{recipe.title}</h3>
                <p>Estimated Price: ${recipe.estimatedPrice}</p>
                <p>Cook Time: {recipe.cookTime} minutes</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;