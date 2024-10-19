import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { saveRecipe } from '../localStorage'; // Import the saveRecipe function

const HomePage = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.2 // Trigger when 20% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const targets = document.querySelectorAll('.scroll-fade-in, .scroll-zoom-in');
        targets.forEach(target => observer.observe(target));

        // Cleanup observer on unmount
        return () => {
            targets.forEach(target => observer.unobserve(target));
        };
    }, []);

    // Sample recipes
    const recipes = [
        {
            title: "Spaghetti Carbonara",
            description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
            picture: "https://example.com/spaghetti-carbonara.jpg", // Replace with a valid image URL
            path: "/spaghetti" // Link path for the recipe
        },
        {
            title: "Chicken Curry",
            description: "A flavorful dish made with chicken, spices, and coconut milk.",
            picture: "https://example.com/chicken-curry.jpg", // Replace with a valid image URL
            path: "/chicken-curry" // Link path for the recipe
        },
        {
            title: "Vegetable Stir-Fry",
            description: "A quick and easy stir-fry with seasonal vegetables and soy sauce.",
            picture: "https://example.com/vegetable-stir-fry.jpg", // Replace with a valid image URL
            path: "/vegetable-stir-fry" // Link path for the recipe
        },
    ];

    // Save sample recipes to localStorage (optional)
    recipes.forEach(recipe => saveRecipe(recipe));

    return (
        <div className="homepage-container">
            <header className="hero-section">
                <div className="hero-content scroll-fade-in">
                    <h1>LET 'EM COOK</h1>
                    <p>Explore the diverse recipes</p>
                    <Link to="/discover">
                        <button className="cta-button">Discover More</button>
                    </Link>
                </div>
            </header>
            <main className="main-content">
                <section className="explore-section scroll-fade-in">
                    <h2>Featured Recipes</h2>
                    <div className="dance-cards">
                        {recipes.map((recipe, index) => (
                            <Link to={recipe.path} className="dance-card scroll-zoom-in" key={index}>
                                <img src={recipe.picture} alt={recipe.title} />
                                <h3>{recipe.title}</h3>
                                <p>{recipe.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="about-section scroll-fade-in">
                    <h2>About Us</h2>
                    <p>
                        ABOUT US INFORMATION
                    </p>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
