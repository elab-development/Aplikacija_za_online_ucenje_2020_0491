// CourseRow.js
import React from 'react';
import './KurseviPage.css';

const CourseRow = ({ course, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{course.title}</td>
            <td>{course.description}</td>
            <td>
                <button onClick={() => onEdit(course)} className="action-button edit">
                    Edit
                </button>
                <button onClick={() => onDelete(course.id)} className="action-button delete">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default CourseRow;
