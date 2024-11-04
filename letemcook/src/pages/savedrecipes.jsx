import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './savedrecipes.css';

function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch recipes data
    fetch('/recipes.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Filter recipes to only show favorites
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

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