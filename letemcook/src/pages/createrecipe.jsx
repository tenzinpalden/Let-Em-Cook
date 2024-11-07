import React, { useState } from 'react';

function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newRecipe = { title, ingredients, instructions };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        console.log("Recipe added successfully");
      } else {
        console.error("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" required />
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" required />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default CreateRecipe;