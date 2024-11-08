import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <h1 className="navbar-brand">Online učenje</h1>
            <div className="navbar-links">
                {isLoggedIn ? (
                    <>
                    <Link to="/knjige" className="nav-link">Pretraga knjiga</Link>
                    <Link to="/moji-kursevi" className="nav-link">Moji kursevi</Link>
                    <Link to="/courses" className="nav-link">Kursevi</Link>
                    <button onClick={handleLogout} className="nav-button">
                        Logout
                    </button>
                </>
                ) : (
                    <>
                        <Link to="/knjige" className="nav-link">Pretraga knjiga</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
