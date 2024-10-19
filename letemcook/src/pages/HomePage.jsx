import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

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

    return (
        <div className="homepage-container">
            <header className="hero-section">
                <div className="hero-content scroll-fade-in">
                    <h1>LET 'EM COOK</h1>
                    <p>Explore the diverse recipes</p>
                    {/* Wrap the button with Link */}
                    <Link to="/discover">
                        <button className="cta-button">Discover More</button>
                    </Link>
                </div>
            </header>
            <main className="main-content">

                <section className="explore-section scroll-fade-in">
                    <h2>Featured Recipes</h2>
                    <div className="dance-cards">
                        <Link to="/tibetan" className="dance-card scroll-zoom-in">
                            <img src="" alt="ex1 pic" />
                            <h3>ex1</h3>
                            <p>ex1 desc</p>
                        </Link>
                        <Link to="/bhutanese" className="dance-card scroll-zoom-in">
                            <img src="ex2" alt="ex2 pic" />
                            <h3>ex2</h3>
                            <p>ex2 desc</p>
                        </Link>
                        <Link to="/nepali" className="dance-card scroll-zoom-in">
                        <img src="ex3" alt="ex3 pic" />
                            <h3>ex3</h3>
                            <p>ex3 desc</p>
                        </Link>
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