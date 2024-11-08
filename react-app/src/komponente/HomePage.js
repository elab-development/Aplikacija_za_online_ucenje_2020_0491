import React, { useEffect, useState } from 'react';
import './HomePage.css';
import CourseCard from './CourseCard';

const HomePage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const cachedCourses = localStorage.getItem('courses');
        const lastFetchTime = localStorage.getItem('lastFetchTime');
        const oneDayInMillis = 24 * 60 * 60 * 1000; // 24 sata u milisekundama
        const now = new Date().getTime();

        if (cachedCourses && lastFetchTime && (now - lastFetchTime < oneDayInMillis)) {
            // Ako su kursevi već u localStorage i prošlo je manje od jednog dana, učitaj ih
            setCourses(JSON.parse(cachedCourses));
        } else {
            // Ako nije prošlo manje od jednog dana ili nema kurseva u localStorage, preuzmi ih sa servera
            fetch('http://localhost:8000/api/courses')
                .then(response => response.json())
                .then(data => {
                    setCourses(data);
                    localStorage.setItem('courses', JSON.stringify(data));
                    localStorage.setItem('lastFetchTime', now.toString());
                })
                .catch(error => console.error('Error fetching courses:', error));
        }
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
