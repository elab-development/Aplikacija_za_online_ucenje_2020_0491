import React from 'react';
import './KurseviPage.css';

const CourseRow = ({ course, onEdit, onDelete, onViewVideos, onAddStudent}) => {
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
                <button onClick={() => onViewVideos(course.id)} className="action-button videos">
                    Klipovi
                </button>
                <button onClick={() => onAddStudent(course.id)} className="action-button add-student">
                    Dodaj studenta
                </button>
            </td>
        </tr>
    );
};

export default CourseRow;
