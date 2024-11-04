import React from 'react';
import './CourseCard.css';

const CourseCard = ({ title, description }) => {
    return (
        <div className="course-card">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default CourseCard;
