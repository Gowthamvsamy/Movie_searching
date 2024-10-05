import React, { useContext } from 'react'
import logo from '../assets/Logo.png';
import { FaSearch } from "react-icons/fa";
import { SearchContext } from '../context/SearchContext';
import { useDarkMode } from '../context/dorkModeContext';

function Search() {

    const { updateSearchTerm } = useContext(SearchContext); // Get the update function from context
    const { darkMode } = useDarkMode();

    // Handle input change
    const handleInputChange = (e) => {
        updateSearchTerm(e.target.value); // Update the context value
    };

    return (
        <>
            <div className={`flex justify-around items-end shadow-md p-2 py-4 w-full mx-auto ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
                <div className='text-lg sm:text-2xl flex justify-start items-end gap-1 sm:gap-3'>
                    <img src={logo} alt="404" className={`h-12 sm:h-16 ${darkMode ? 'border rounded bg-white' : ''}`} />
                    <p><span className='text-red-600 text-2xl sm:text-4xl'>S</span>how<span className='text-red-600 text-2xl sm:text-4xl'>T</span>ime</p>
                </div>
                <div>
                    <div className="relative flex items-center">
                        <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${darkMode ? 'text-black' : 'text-black'}`}>
                            <FaSearch />
                        </div>
                        <input
                            type="text"
                            id="searchInput"
                            className={`px-3 py-2 indent-7 border w-[200px] sm:w-[400px] md:w-[500px] rounded-lg border-slate-800 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 
                                ${darkMode ? 'text-black' : 'text-black'}`}
                            placeholder="Search Movie Title"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
