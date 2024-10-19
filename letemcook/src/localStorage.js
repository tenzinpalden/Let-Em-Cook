// localStorage.js

// Save a recipe to localStorage
export const saveRecipe = (recipe) => {
    const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    existingRecipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(existingRecipes));
  };
  
  // Get all recipes from localStorage
  export const getRecipes = () => {
    return JSON.parse(localStorage.getItem('recipes')) || [];
  };
  
  // Delete a specific recipe by title
  export const deleteRecipe = (title) => {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes = recipes.filter(recipe => recipe.title !== title);
    localStorage.setItem('recipes', JSON.stringify(recipes));
  };
  
  // Clear all recipes
  export const clearRecipes = () => {
    localStorage.removeItem('recipes');
  };
  