import React, { useState, useEffect } from 'react';
import './KurseviPage.css';
import CourseRow from './CourseRow';

const KurseviPage = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', teacher_id: '' });
    const [search, setSearch] = useState({ title: '', description: '', teacher_id: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [sortOrder, setSortOrder] = useState('asc'); 

    // Paginacija
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5;

    useEffect(() => {
        fetchCourses();
        fetchTeachers();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/courses');
            const data = await response.json();
            setCourses(data);
            setFilteredCourses(data); // Inicijalno postavi filtrirane kurseve na sve kurseve
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/teachers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                fetchCourses();
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
            const token = localStorage.getItem('token');
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
            const token = localStorage.getItem('token');
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

    const handleSort = () => {
        const sortedCourses = [...filteredCourses].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        setFilteredCourses(sortedCourses);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSearch = () => {
        const filtered = courses.filter(course => {
            const titleMatch = course.title.toLowerCase().includes(search.title.toLowerCase());
            const descriptionMatch = course.description.toLowerCase().includes(search.description.toLowerCase());
            const teacherMatch = search.teacher_id ? course.teacher_id === parseInt(search.teacher_id) : true;
            return titleMatch && descriptionMatch && teacherMatch;
        });
        setFilteredCourses(filtered);
        setCurrentPage(1); // Resetuj na prvu stranicu nakon pretrage
    };

    // Paginacija - funkcionalnost
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const goToPage = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="kursevi-page">
            <div className="header">
                <h2>Lista kurseva</h2>
                <button onClick={openAddModal} className="add-button">Dodaj kurs</button>
            </div>

            <div className="search-form">
                <input
                    type="text"
                    placeholder="Pretraga po naslovu"
                    value={search.title}
                    onChange={(e) => setSearch({ ...search, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Pretraga po opisu"
                    value={search.description}
                    onChange={(e) => setSearch({ ...search, description: e.target.value })}
                />
                <select
                    value={search.teacher_id}
                    onChange={(e) => setSearch({ ...search, teacher_id: e.target.value })}
                >
                    <option value="">Izaberite profesora</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch} className="search-button">Pretraži</button>
                <button onClick={handleSort} className="sort-button">
                    Sortiraj po naslovu ({sortOrder === 'asc' ? 'Z-A': 'A-Z' })
                </button>
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
                    {currentCourses.map((course) => (
                        <CourseRow 
                            key={course.id} 
                            course={course} 
                            onEdit={openEditModal} 
                            onDelete={handleDeleteCourse} 
                        />
                    ))}
                </tbody>
            </table>

            {/* Paginacija */}
            <div className="pagination">
                {[...Array(Math.ceil(filteredCourses.length / coursesPerPage)).keys()].map(number => (
                    <button 
                        key={number + 1} 
                        onClick={() => goToPage(number + 1)}
                        className={currentPage === number + 1 ? 'active-page' : ''}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>

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
