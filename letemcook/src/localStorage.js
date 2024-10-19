// localStorage.js

// Save a recipe to localStorage
export const saveRecipe = (recipe) => {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push({
      title: recipe.title,
      description: recipe.description,
      picture: recipe.picture, // This should be a URL or base64 string
    });
    localStorage.setItem('recipes', JSON.stringify(recipes));
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
  