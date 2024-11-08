import React, { useEffect, useState } from 'react';
import './MyCoursesPage.css';
import CourseCard from './CourseCard';
import { useNavigate } from 'react-router-dom';

const MyCoursesPage = () => {
    const [courses, setCourses] = useState([]);

    const navigate = useNavigate();

    const handleCourseClick = (id) => {
        navigate(`/courses/${id}/videos`);
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); 

        fetch('http://localhost:8000/api/my-courses', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching courses');
                }
                return response.json();
            })
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    return (
        <div className="my-courses-page">
            <h2>Moji kursevi</h2>
            <div className="courses-grid">
                {courses.map(course => (
                    <div key={course.id} onClick={() => handleCourseClick(course.id)}>
                        <CourseCard title={course.title} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCoursesPage;
