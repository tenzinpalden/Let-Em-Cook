import React from 'react';
import { getRecipes, deleteRecipe } from './localStorage'; // Import the localStorage functions

const RecipeList = () => {
  const recipes = getRecipes(); // Get recipes from local storage

  const handleDelete = (title) => {
    deleteRecipe(title); // Delete recipe by title
    window.location.reload(); // Reload the page to update the list
  };

  return (
    <div>
      <h2>My Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found. Please add some!</p>
      ) : (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {recipe.picture && <img src={recipe.picture} alt={recipe.title} width="100" />}
              <button onClick={() => handleDelete(recipe.title)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
