import React, { useState } from 'react';
import './createrecipe.css';

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    title: '',
    image: '',
    ingredients: '',
    instructions: '',
    estimatedPrice: '',
    cookTime: '',
    additionalTips: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the recipe data to the backend or state
    console.log('Recipe submitted:', recipe);
    // Clear the form after submission
    setRecipe({
      title: '',
      image: '',
      ingredients: '',
      instructions: '',
      estimatedPrice: '',
      cookTime: '',
      additionalTips: ''
    });
  };

  return (
    <div className="create-recipe-container">
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit} className="create-recipe-form">
        <label>
          Recipe Title:
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Ingredients (separated by commas):
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Estimated Price ($):
          <input
            type="text"
            name="estimatedPrice"
            value={recipe.estimatedPrice}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Cook Time (minutes):
          <input
            type="text"
            name="cookTime"
            value={recipe.cookTime}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Additional Tips:
          <textarea
            name="additionalTips"
            value={recipe.additionalTips}
            onChange={handleChange}
          />
        </label>
        
        <button type="submit" className="submit-button">Submit Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;