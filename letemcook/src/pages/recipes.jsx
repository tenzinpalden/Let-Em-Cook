import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Fetch recipes and retrieve favorites from localStorage
    fetch('/recipes.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Toggle favorite status for a recipe
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

  // Filter recipes based on the selected label
  const filteredRecipes = filter === "All"
    ? recipes
    : recipes.filter((recipe) => recipe.labels && recipe.labels.includes(filter));

  return (
    <div className="recipes-container">
      <h1>All Recipes</h1>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Contains Meat">Contains Meat</option>
        </select>
      </div>

      <div className="recipes-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <div className="recipe-info">
                <h2>{recipe.title}</h2>
                <p>Estimated Price: ${recipe.estimatedPrice}</p>
                <p>Cook Time: {recipe.cookTime} minutes</p>
              </div>
            </Link>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className={`favorite-button ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
            >
                {favorites.includes(recipe.id) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;