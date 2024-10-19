import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <Router>
            <Header />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
            <Footer />
        </Router>

  );
}

export default App;
