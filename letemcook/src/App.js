import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeList from './RecipeList'; // Import the RecipeList component
import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:title" element={<RecipePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
