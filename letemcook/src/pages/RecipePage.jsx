import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipes } from '../localStorage'; // Import the function to get recipes
import './RecipePage.css';

const RecipePage = () => {
    const { title } = useParams(); // Get the recipe title from the URL
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const recipes = getRecipes();
        const selectedRecipe = recipes.find(recipe => recipe.title.replace(/\s+/g, '-').toLowerCase() === title);
        setRecipe(selectedRecipe); // Set the selected recipe
    }, [title]);

    if (!recipe) {
        return <h2>Recipe not found</h2>; // Show a message if no recipe is found
    }

    return (
        <div className="recipe-page">
            <h1>{recipe.title}</h1>
            <img src={recipe.picture} alt={recipe.title} />
            <p>{recipe.description}</p>
        </div>
    );
};

export default RecipePage;
