import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SavedRecipes from './pages/savedrecipes';
import CreateRecipe from './pages/createrecipe';
import Contact from './pages/contact';
import FAQ from './pages/faq';
import About from './pages/about';
import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';
import RecipePage from './pages/RecipePage';
import Recipes from './pages/recipes';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/savedrecipes" element={<SavedRecipes />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;