import React, { useState, useEffect } from 'react';
import './KurseviPage.css'; // Dodaj poseban CSS fajl za stilove

const KurseviPage = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ id: null, title: '', description: '', teacher_id: '' });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/courses');
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleAddCourse = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });
            if (response.ok) {
                fetchCourses();
                setNewCourse({ id: null, title: '', description: '', teacher_id: '' });
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCourses();
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEditCourse = (course) => {
        setNewCourse(course);
    };

    const handleUpdateCourse = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/courses/${newCourse.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });
            if (response.ok) {
                fetchCourses();
                setNewCourse({ id: null, title: '', description: '', teacher_id: '' });
            }
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const handleSubmit = () => {
        if (newCourse.id) {
            handleUpdateCourse();
        } else {
            handleAddCourse();
        }
    };

    return (
        <div className="kursevi-page">
            <h2>Lista kurseva</h2>
            <table className="courses-table">
                <thead>
                    <tr>
                        <th>Naslov</th>
                        <th>Opis</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>
                                <button onClick={() => handleEditCourse(course)} className="action-button edit">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteCourse(course.id)} className="action-button delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>{newCourse.id ? 'Izmeni kurs' : 'Dodaj kurs'}</h3>
            <div className="course-form">
                <input
                    type="text"
                    placeholder="Naslov"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Opis"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                />
                <button onClick={handleSubmit} className="submit-button">
                    {newCourse.id ? 'Update' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default KurseviPage;
