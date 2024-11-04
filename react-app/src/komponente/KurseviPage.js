import React, { useState, useEffect } from 'react';
import './KurseviPage.css';

const KurseviPage = () => {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', teacher_id: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchCourses();
        fetchTeachers(); // Učitaj profesore pri inicijalizaciji stranice
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

    const fetchTeachers = async () => {
        try {
            const token = localStorage.getItem('token'); // Preuzimamo token iz lokalne memorije
            
            const response = await fetch('http://localhost:8000/api/teachers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Dodajemo token u Authorization header
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                setTeachers(data);
            } else {
                console.error('Error fetching teachers:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Preuzimamo token iz lokalne memorije

            const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                fetchCourses(); // Ponovo preuzimamo kurseve ako je brisanje uspešno
            } else {
                const errorData = await response.json();
                console.error('Error deleting course:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const openEditModal = (course) => {
        setNewCourse(course);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setNewCourse({ title: '', description: '', teacher_id: '' });
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsAddModalOpen(false);
        setNewCourse({ title: '', description: '', teacher_id: '' });
    };

    const handleUpdateCourse = async () => {
        try {
            const token = localStorage.getItem('token'); // Preuzimamo token iz lokalne memorije

            const response = await fetch(`http://localhost:8000/api/courses/${newCourse.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });
            if (response.ok) {
                fetchCourses();
                closeModal();
            }
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const handleAddCourse = async () => {
        try {
            const token = localStorage.getItem('token'); // Preuzimamo token iz lokalne memorije

            const response = await fetch('http://localhost:8000/api/courses', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });
            if (response.ok) {
                fetchCourses();
                closeModal();
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div className="kursevi-page">
            <div className="header">
                <h2>Lista kurseva</h2>
                <button onClick={openAddModal} className="add-button">Dodaj kurs</button>
            </div>
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
                                <button onClick={() => openEditModal(course)} className="action-button edit">
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

            {/* Modal za uređivanje kursa */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Uredi kurs</h3>
                        <label htmlFor="title">Naslov</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Naslov"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        />
                        <label htmlFor="description">Opis</label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Opis"
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        />
                        
                        <div className="modal-buttons">
                            <button onClick={handleUpdateCourse} className="submit-button">
                                Potvrdi
                            </button>
                            <button onClick={closeModal} className="cancel-button">
                                Odustani
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal za dodavanje kursa */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Dodaj novi kurs</h3>
                        <label htmlFor="title">Naslov</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Naslov"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        />
                        <label htmlFor="description">Opis</label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Opis"
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        />
                        <label htmlFor="teacher_id">Profesor</label>
                        <select
                            id="teacher_id"
                            value={newCourse.teacher_id}
                            onChange={(e) => setNewCourse({ ...newCourse, teacher_id: e.target.value })}
                        >
                            <option value="">Izaberite profesora</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                        
                        <div className="modal-buttons">
                            <button onClick={handleAddCourse} className="submit-button">
                                Dodaj
                            </button>
                            <button onClick={closeModal} className="cancel-button">
                                Odustani
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KurseviPage;
