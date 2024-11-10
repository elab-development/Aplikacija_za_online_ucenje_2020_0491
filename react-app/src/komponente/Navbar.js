import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, role, handleLogout }) => {
    const [isSticky, setIsSticky] = useState(false);

    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };
    
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <h1 className="navbar-brand">Online učenje</h1>
            <div className="navbar-links">
                <Link to="/knjige" className="nav-link">Pretraga knjiga</Link>

                {isLoggedIn && role === 'student' && (
                    <Link to="/moji-kursevi" className="nav-link">Moji kursevi</Link>
                )}

                {isLoggedIn && role === 'teacher' && (
                    <Link to="/courses" className="nav-link">Kursevi</Link>
                )}

                {isLoggedIn ? (
                <button onClick={onLogout} className="nav-button">
                    Logout
                </button>
                ) : (
                    <>
                        <Link to="/login" className="nav-link" >Login</Link>
                        <Link to="/register" className="nav-link" >Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
