import React, { useState } from 'react';
import '../App.css';

const RegisterPage = ({ handleLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        datum_rodjenja: '',
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
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                const data = await response.json();
                setMessage('Registration successful!');
                localStorage.setItem('token', data.token);
                handleLogin(); // Ažuriraj stanje prijave u App komponenti
            } else {
                const data = await response.json();
                setErrors(data.errors);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name[0]}</p>}

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

                    <input
                        type="date"
                        name="datum_rodjenja"
                        value={formData.datum_rodjenja}
                        onChange={handleChange}
                    />
                    {errors.datum_rodjenja && <p className="error">{errors.datum_rodjenja[0]}</p>}

                    <button type="submit">Register</button>
                </form>
                {message && <p className="success">{message}</p>}
            </div>
        </div>
        
    );
};

export default RegisterPage;
