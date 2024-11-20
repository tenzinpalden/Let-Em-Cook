import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/recipes`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      console.log("Fetched recipes:", data); // Debugging log
      setRecipes(data);
    })
    .catch((error) => console.error("Error fetching recipes:", error));

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
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
      // Clear filtered recipes if search query is empty
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
          {featuredRecipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <div className="recipe-image-container">
                  <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                </div>
                <h3>{recipe.title}</h3>
                <div className="recipe-details">
                  <p>Estimated Price: ${recipe.estimatedPrice}.00</p>
                  <p>Total Time: {recipe.cookTime} minutes</p>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevents the link from triggering when clicking the favorite button
                  toggleFavorite(recipe.id);
                }}
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