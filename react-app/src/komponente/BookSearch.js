import React, { useState } from 'react';
import './BookSearch.css';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = () => {
        fetch(`https://openlibrary.org/search.json?q=${query}`)
            .then(response => response.json())
            .then(data => {
                setBooks(data.docs);
            })
            .catch(error => console.error("Error fetching books:", error));
    };

    return (
        <div className="book-search-page">
            <h2>Pretraga knjiga</h2>
            <div className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Unesite termin za pretragu"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            {books.length > 0 && (
                <div>
                    <h2>Rezultati pretrage za "{query}":</h2>
                    <ul>
                        {books.map(book => (
                            <li key={book.key}>
                                <h3>{book.title}</h3>
                                <p>Autor: {book.author_name ? book.author_name.join(", ") : "Nepoznato"}</p>
                                <p>Godina izdavanja: {book.first_publish_year || "Nepoznato"}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BookSearch;
