import React, { createContext, useState } from 'react';

// Create the context
export const SearchContext = createContext();

// Create the provider component
export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Function to update the search term
    const updateSearchTerm = (term) => {
        setSearchTerm(term);
    };

    return (
        <SearchContext.Provider value={{ searchTerm, updateSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};
