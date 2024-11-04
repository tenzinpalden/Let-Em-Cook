import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the recipes.json file in the public folder
    fetch('/recipes.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const matches = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(matches);
    } else {
      setFilteredRecipes([]);
    }
  };

  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      // Remove from favorites
      updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Display only a subset of recipes for the Explore Recipes section
  const featuredRecipes = recipes.slice(0, 4);

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
        </div>
      </section>
      <section className="recipe-list-section">
        <h2>Explore Recipes</h2>
        <ul className="recipe-list">
          {featuredRecipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <h3>{recipe.title}</h3>
              </Link>
              <div className="recipe-details">
                <p>Estimated Price: ${recipe.estimatedPrice}</p>
                <p>Cook Time: {recipe.cookTime} minutes</p>
              </div>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className={`favorite-button ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
              >
                {favorites.includes(recipe.id) ? '★' : '☆'}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;