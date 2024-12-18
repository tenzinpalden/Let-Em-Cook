import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RecipePage.module.css';

// recipe page display a recipe
function RecipePage() {
  const { id } = useParams(); // Get recipe ID from the route
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Fetch the recipe data from the backend using the API
    fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data); // Set the recipe data

        // Check if the recipe is in favorites
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(savedFavorites.includes(data?.id));
      })
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]);

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }
  
  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = savedFavorites.filter((favId) => favId !== recipe.id);
    } else {
      // Add to favorites
      updatedFavorites = [...savedFavorites, recipe.id];
    }

    setIsFavorite(!isFavorite);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.recipePage}>
      <button
          onClick={toggleFavorite}
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
        >
          {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
        </button>
      <h2>{recipe.title}</h2>
      <div className={styles.recipeImageContainer}>
        <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
      </div>
      <p><strong>Estimated Price:</strong> ${recipe.estimatedPrice}.00</p>
      <p><strong>Total Time:</strong> {recipe.cookTime} minutes</p>

      <div className={styles.ingredientsContainer}>
        <h3>Ingredients:</h3>
        <ul className={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity && `${ingredient.quantity} of `} 
              {ingredient.name} 
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions List */}
      <h3>Instructions:</h3>
      <ol className={styles.instructionsList}>
        {recipe.instructions.map((step, index) => (
          <li key={index} className={styles.instructionItem}>
            <strong>Step {index + 1}:</strong> {step}
          </li>
        ))}
      </ol>
      
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
