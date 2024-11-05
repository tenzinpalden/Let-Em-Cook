import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Fetch recipes and retrieve favorites from localStorage
  useEffect(() => {
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

  return (
    <div className="recipes-container">
      <h1>All Recipes</h1>
      <div className="recipes-list">
        {recipes.map((recipe) => (
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