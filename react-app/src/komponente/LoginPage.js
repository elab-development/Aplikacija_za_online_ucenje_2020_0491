import React, { useState } from 'react';
import '../App.css';

const LoginPage = ({ handleLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage('');

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                const data = await response.json();
                setMessage('Login successful!');
                localStorage.setItem('token', data.token);
                handleLogin(); // Ažuriraj stanje prijave u App komponenti
            } else {
                const data = await response.json();
                setErrors(data.errors || { message: data.message });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email[0]}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password[0]}</p>}

                    <button type="submit">Login</button>
                </form>
                {message && <p className="success">{message}</p>}
                {errors.message && <p className="error">{errors.message}</p>}
            </div>
        </div>
        
    );
};

export default LoginPage;
