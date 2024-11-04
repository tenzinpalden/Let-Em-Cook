import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipePage.css';

function RecipePage() {
  const { id } = useParams(); // Get recipe ID from the route
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipes data from recipes.json
    fetch('/recipes.json')
      .then((response) => response.json())
      .then((data) => {
        // Find the recipe by ID and set it in state
        const selectedRecipe = data.find((item) => item.id === parseInt(id, 10));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]);

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div className="recipe-page">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <p><strong>Estimated Price:</strong> ${recipe.estimatedPrice}</p>
      <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
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