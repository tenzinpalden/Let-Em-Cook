import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipePage.css';

function RecipePage() {
  const { id } = useParams(); // Get recipe ID from the route
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Fetch recipes data from recipes.json
    fetch('/recipes.json')
      .then((response) => response.json())
      .then((data) => {
        // Find the recipe by ID and set it in state
        const selectedRecipe = data.find((item) => item.id === parseInt(id, 10));
        setRecipe(selectedRecipe);

        // Check if the recipe is in favorites
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(savedFavorites.includes(selectedRecipe?.id));
      })
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]);

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = savedFavorites.filter((favId) => favId !== recipe.id);
    } else {
      // Add to favorites
      updatedFavorites = [...savedFavorites, recipe.id];
    }

    setIsFavorite(!isFavorite);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h2>{recipe.title}</h2>
        <button
          onClick={toggleFavorite}
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
        >
          {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
        </button>
      </div>

      {/* Labels Section */}
      {recipe.labels && (
        <div className="labels-container">
          {recipe.labels.map((label, index) => (
            <span key={index} className={`recipe-label ${label.toLowerCase().replace(" ", "-")}`}>
            {label}
          </span>
          ))}
        </div>
      )}

      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      </div>
      <p><strong>Estimated Price:</strong> ${recipe.estimatedPrice}</p>
      <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>

      <div className="ingredients-container">
        <h3>Ingredients:</h3>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      {recipe.additionalTips && (
        <>
          <h3>Additional Tips:</h3>
          <p>{recipe.additionalTips}</p>
        </>
      )}
    </div>
  );
}

export default RecipePage;