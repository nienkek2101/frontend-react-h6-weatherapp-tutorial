import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ setLocationHandler }) {
    function onFormSubmit(e) {
        e.preventDefault();
        setLocationHandler(query);
    }
    const [query, setQuery] = useState('');
    return (
        <form className="searchbar" onSubmit={onFormSubmit}>
            <input
                type="text"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zoek een stad in Nederland"
            />

            <button type="submit">
                Zoek
            </button>
        </form>
    );
}

export default SearchBar;
