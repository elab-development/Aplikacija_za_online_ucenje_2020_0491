import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './komponente/HomePage';
import RegisterPage from './komponente/RegisterPage';
import LoginPage from './komponente/LoginPage';
import Navbar from './komponente/Navbar';
import KurseviPage from './komponente/KurseviPage';
import MyCoursesPage from './komponente/MyCoursesPage';
import CourseVideosPage from './komponente/CourseVideosPage';
import BookSearch from './komponente/BookSearch';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    // Funkcija za ručno ažuriranje stanja prijave kada se korisnik uspešno prijavi ili registruje
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/register"
                        element={<RegisterPage handleLogin={handleLogin} />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage handleLogin={handleLogin} />}
                    />
                    
                    <Route path="/knjige" element={<BookSearch />} /> 
                    <Route path="/moji-kursevi" element={<MyCoursesPage />} /> 
                    <Route path="/courses/:id/videos" element={<CourseVideosPage />} />
                    <Route path="/courses" element={<KurseviPage />} /> 

                </Routes>
            </div>
        </Router>
    );
};

export default App;
