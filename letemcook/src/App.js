import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

import HeaderComponent from './components/header';
import NavbarComponent from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <Router>
            <HeaderComponent />
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
            <Footer />
        </Router>

  );
}

export default App;
