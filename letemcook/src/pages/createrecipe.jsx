import React, { useState, useEffect } from 'react';
import './createrecipe.css';

// sets all conditions to blank
function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [additionalTips, setAdditionalTips] = useState('');
  const [labels, setLabels] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // reads all of the text boxes for recipe creation
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const newRecipe = { 
      title, 
      image, 
      ingredients,
      instructions: instructions.split(','), 
      estimatedPrice, 
      cookTime, 
      additionalTips, 
      labels: labels.split(',')
    };


    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        console.log("Recipe added successfully");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000); // Start hiding message after 2.5 seconds
        // Optional: Clear form fields after successful submission
        setTitle('');
        setImage('');
        setIngredients('');
        setInstructions('');
        setEstimatedPrice('');
        setCookTime('');
        setAdditionalTips('');
        setLabels('');
      } else {
        console.error("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => setShowSuccessMessage(false), 2500); // Ensure fade-out happens after 2.5 seconds
    }
  }, [showSuccessMessage]);

  return (
    <div className="create-recipe-container">
      <form onSubmit={handleSubmit} className="create-recipe-form">
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </label>
        <label>
          Ingredients (e.g. 1tbs, butter, 2cups, water):
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </label>
        <label>
          Instructions (comma-separated):
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </label>
        <label>
          Estimated Price:
          <input type="text" value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)} required />
        </label>
        <label>
          Cook Time (minutes):
          <input type="text" value={cookTime} onChange={(e) => setCookTime(e.target.value)} required />
        </label>
        <label>
          Additional Tips:
          <textarea value={additionalTips} onChange={(e) => setAdditionalTips(e.target.value)} />
        </label>
        <label>
          Labels (comma-separated):
          <input type="text" value={labels} onChange={(e) => setLabels(e.target.value)} />
        </label>
        <button type="submit" className="submit-button">Add Recipe</button>
        {showSuccessMessage && <div className={`success-message ${showSuccessMessage ? 'fade-in' : 'fade-out'}`}>Recipe successfully added!</div>}
      </form>
    </div>
  );
}

export default CreateRecipe;
