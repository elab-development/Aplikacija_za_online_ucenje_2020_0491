// HomePage.js
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import CourseCard from './CourseCard';

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
                    <CourseCard 
                        key={course.id} 
                        title={course.title} 
                        description={course.description} 
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
