import React, { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/courses')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    return (
        <div className="homepage">
            <h1>Dobrodošli na platformu za online učenje</h1>
            <h2>Dostupni kursevi:</h2>
            <div className="courses-container">
                {courses.map(course => (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
