import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const recipes = [
  {
    id: 1,
    title: "Pasta Alfredo",
    image: "https://example.com/pasta-image.jpg", // Replace with actual image URLs
    cookTime: "20 mins",
    rating: 4,
  },
  {
    id: 2,
    title: "Fried Rice",
    image: "https://example.com/fried-rice-image.jpg",
    cookTime: "15 mins",
    rating: 5,
  },
  {
    id: 3,
    title: "Beef Stew",
    image: "https://example.com/beef-stew-image.jpg",
    cookTime: "40 mins",
    rating: 3,
  },
];

const RecipeList = () => {
  const recipeListStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f7d5a1',
    padding: '20px',
  };

  const recipeCardStyle = {
    display: 'flex',
    marginBottom: '20px',
    backgroundColor: '#f5e3c6',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const recipeImageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '10px',
    marginRight: '15px',
    objectFit: 'cover',
  };

  const recipeDetailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const recipeTitleStyle = {
    margin: '0',
    fontSize: '20px',
    color: '#333',
  };

  const recipeTextStyle = {
    margin: '5px 0',
    fontSize: '16px',
    color: '#555',
  };

  return (
    <div style={recipeListStyle}>
      {recipes.map(recipe => (
        <div key={recipe.id} style={recipeCardStyle}>
          <img src={recipe.image} alt={recipe.title} style={recipeImageStyle} />
          <div style={recipeDetailsStyle}>
            <h2 style={recipeTitleStyle}>{recipe.title}</h2>
            <p style={recipeTextStyle}>Cook time: {recipe.cookTime}</p>
            <p style={recipeTextStyle}>
              Rating: {"★".repeat(recipe.rating)}{"☆".repeat(5 - recipe.rating)} (out of 5 stars)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;