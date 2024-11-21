import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("");
  const [cookTimeFilter, setCookTimeFilter] = useState("");

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

  // Filter recipes based on label, price, and cook time
  const filteredRecipes = recipes.filter((recipe) => {
    const labelMatch = filter === "All" || (recipe.labels && recipe.labels.includes(filter));
    
    const priceMatch = priceFilter === "" || 
      (priceFilter === "0-5" && recipe.estimatedPrice <= 5) ||
      (priceFilter === "6-10" && recipe.estimatedPrice > 5 && recipe.estimatedPrice <= 10) ||
      (priceFilter === "11-15" && recipe.estimatedPrice > 10 && recipe.estimatedPrice <= 15) ||
      (priceFilter === "15+" && recipe.estimatedPrice > 15);
    
    const cookTimeMatch = cookTimeFilter === "" || 
      (cookTimeFilter === "0-5" && recipe.cookTime <= 5) ||
      (cookTimeFilter === "6-10" && recipe.cookTime > 5 && recipe.cookTime <= 10) ||
      (cookTimeFilter === "11-20" && recipe.cookTime > 10 && recipe.cookTime <= 20) ||
      (cookTimeFilter === "21-30" && recipe.cookTime > 20 && recipe.cookTime <= 30);

    return labelMatch && priceMatch && cookTimeMatch;
  });

  return (
    <div className="recipes-container">
      <h1>All Recipes</h1>

      {/* Filter Containers */}
      <div className="filter-container">
        <div>
          <label htmlFor="filter">Filter by Label:</label>
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

        <div>
          <label htmlFor="priceFilter">Filter by Price:</label>
          <select 
            id="priceFilter" 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="0-5">$0 - $5</option>
            <option value="6-10">$6 - $10</option>
            <option value="11-15">$11 - $15</option>
            <option value="15+">$15+</option>
          </select>
        </div>

        <div>
          <label htmlFor="cookTimeFilter">Filter by Cook Time:</label>
          <select 
            id="cookTimeFilter" 
            value={cookTimeFilter} 
            onChange={(e) => setCookTimeFilter(e.target.value)}
          >
            <option value="">Any Time</option>
            <option value="0-5">0 - 5 mins</option>
            <option value="6-10">6 - 10 mins</option>
            <option value="11-20">11 - 20 mins</option>
            <option value="21-30">21 - 30 mins</option>
          </select>
        </div>
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