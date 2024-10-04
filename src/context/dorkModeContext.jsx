import React, { createContext, useState, useContext } from 'react';

// Create the context
export const DarkModeContext = createContext();

// Create a custom hook for easier use of the context
export const useDarkMode = () => useContext(DarkModeContext);

// Create the provider component
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
