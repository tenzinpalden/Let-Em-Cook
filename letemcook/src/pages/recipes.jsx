import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Fetch recipes from the Flask backend
    fetch(`${process.env.REACT_APP_API_URL}/recipes`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched recipes:", data); // Debugging log
        setRecipes(data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Toggle favorite status for a recipe
  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Filter recipes based on the selected label
  const filteredRecipes = filter === "All"
    ? recipes
    : recipes.filter((recipe) => recipe.labels && recipe.labels.includes(filter));

  return (
    <div className="recipes-container">
      <h1>All Recipes</h1>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>

          <option value="Pasta">Pasta</option>
          <option value="Stir-Fry">Stir-Fry</option>
          <option value="Wrap">Wrap</option>
          <option value="Dessert">Dessert</option>
          <option value="Smoothie">Smoothie</option>
          <option value="Rice">Rice</option>
          <option value="Noodle">Noodle</option>
          <option value="Salad">Salad</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="recipes-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <div className="recipe-info">
                <h2>{recipe.title}</h2>
                <p>Estimated Price: ${recipe.estimatedPrice}.00</p>
                <p>Total Time: {recipe.cookTime} minutes</p>
              </div>
            </Link>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className={`favorite-button ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
            >
                {favorites.includes(recipe.id) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;