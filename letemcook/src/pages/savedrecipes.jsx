import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './savedrecipes.css';

// shows all saved recipes
function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch recipes data from the backend API
    fetch(`${process.env.REACT_APP_API_URL}/recipes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Filter recipes to only show favorites
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

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
    <div className="saved-recipes-container">
      <h2>Your Favorite Recipes</h2>
      {favoriteRecipes.length > 0 ? (
        <ul className="saved-recipe-list">
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.id} className="saved-recipe-item">
              <Link to={`/recipe/${recipe.id}`} className="saved-recipe-link">
                <img src={recipe.image} alt={recipe.title} className="saved-recipe-image" />
                <div className="saved-recipe-info">
                  <h3>{recipe.title}</h3>
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
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-favorites-message">You haven't saved any recipes yet.</p>
      )}
    </div>
  );
}

export default SavedRecipes;