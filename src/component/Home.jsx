import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchContext } from '../context/SearchContext';
import { Commet } from 'react-loading-indicators';
import { useDarkMode } from '../context/dorkModeContext';
function Home() {

    const { searchTerm } = useContext(SearchContext);
    const [loder, setLoder] = useState(false); // Loder is used to interact the screen
    const [moviesData, setMoviesData] = useState(null); // Get the movie data from the API
    const [showModel, setShowModel] = useState(false); // open the model page
    const [selectedMovie, setSelectedMovie] = useState(null); // Store the selected movie
    const { darkMode } = useDarkMode(); // dark mode
    const [dropDown, setDropDown] = useState(false); // set the drop
    const [selectedType, setSelectedType] = useState(''); // store the selected movie type
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State for disabling the button

    const toggleDropDown = () => { setDropDown(!dropDown); } // toggle dropdown visibility

    const movieTypes = [
        "All", "Movie", "Series", "Episode"
    ];

    // Function to handle selection of movie type
    const handleSelectType = (type) => {
        if (type === "All") {
            setSelectedType(''); // Clear the filter when "All" is selected
        } else {
            setSelectedType(type); // set the clicked type as the selected type
        }
        setDropDown(false); // close the dropdown after selection
    }

    //open Model
    const openModal = async (movieimdbID) => {
        setLoder(true); // Show loader while fetching
        try {
            const response = await axios.get('https://www.omdbapi.com/', {
                params: {
                    i: movieimdbID, // Fetch detailed movie by title
                    apikey: 'd8f0849d'
                }
            });
            setSelectedMovie(response.data); // Store detailed movie data
            setShowModel(true); // Show modal
        } catch (error) {
            console.error('Error fetching detailed movie data:', error);
        } finally {
            setLoder(false); // Stop loader
        }
    };


    // Close Modal
    const closeModal = () => {
        setSelectedMovie(null);
        setShowModel(false);
    };

    // use useEffect to fetch data
    useEffect(() => {
        if (!searchTerm) return;

        async function fetchData() {
            setLoder(true);
            try {
                const searchParams = {
                    s: searchTerm, // Search term from context
                    apikey: 'd8f0849d',
                };

                if (selectedType) {
                    searchParams.type = selectedType.toLowerCase(); // Include type param in request
                }

                const searchResponse = await axios.get('https://www.omdbapi.com/', {
                    params: searchParams,
                });

                // If no specific type is selected, show all movies
                let fetchedMovies = searchResponse.data.Search || [];

                // In case OMDB API does not handle type filtering well, we do a manual filter
                if (selectedType) {
                    const filteredMovies = [];
                    for (let i = 0; i < fetchedMovies.length; i++) {
                        if (fetchedMovies[i].Type.toLowerCase() === selectedType.toLowerCase()) {
                            filteredMovies.push(fetchedMovies[i]);
                        }
                    }
                    fetchedMovies = filteredMovies;
                }

                setMoviesData(fetchedMovies); // Set filtered or all movies
                setIsButtonDisabled(false); // Enable button if data fetched successfully
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoder(false); // Stop loader
            }
        }

        fetchData();
    }, [searchTerm, selectedType]); // Re-fetch movies when search term or type changes



    return (
        <div className={`min-h-[80vh] max-h-full ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
            <div className='flex flex-col sm:flex-row sm:justify-between items-center'>
                <p className='text-3xl font-semibold p-5'>Movie Search App</p>

                {selectedType && (
                    <div>
                        <p className='text-2xl'><b>Type : </b> {selectedType}</p>
                    </div>
                )}

                <button
                    className={`relative border-2 px-8 py-2 rounded me-5 flex gap-2 items-center hover:scale-105 cursor-pointer ${darkMode ? 'bg-white text-black' : 'bg-slate-100 text-black'} 
                    ${isButtonDisabled ? 'opacity-50 !cursor-not-allowed hover:scale-100' : ''}`} onClick={toggleDropDown} disabled={isButtonDisabled}
                >
                    Movies Type
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                        <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                    </svg>
                </button>
            </div>

            {dropDown && (
                <div className={`absolute flex items-center justify-center sm:right-5 top-64 sm:top-52 border w-36 p-3 ${darkMode ? 'bg-slate-200 text-black' : 'bg-white text-black'}`}>
                    <ul>
                        {movieTypes.map((type, index) => (
                            <li key={index} className="hover:bg-red-400 cursor-pointer rounded p-1 hover:text-white focus:bg-green-500" onClick={() => handleSelectType(type)}>{type}</li>

                        ))}

                    </ul>
                </div>
            )}

            {/* Loder */}
            {loder && (
                <div className="h-screen flex justify-center items-center ">
                    <Commet color="#DC2626" size="large" />
                </div>
            )}

            {/* Movie data */}

            {moviesData && moviesData.length > 0 && (
                <div className='grid grid-flow-row flex-wrap grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:px-16 p-5 gap-3'>
                    {moviesData.map((movie) => (
                        <div key={movie.imdbID} className='border flex flex-col items-center pb-5'>

                            <img src={movie.Poster} alt="404" className='w-[267px] h-[350px] top-0' />
                            <div className='px-5 w-full'>

                                <p className='text-center my-5'>{movie.Title}</p>

                                <div className='flex justify-between px-5 items-center my-5'>
                                    <p>{movie.Year}</p>
                                    <p>{movie.Type}</p>
                                </div>

                                <button className='bg-gray-200 rounded border w-full py-2 text-blue-600 font-semibold hover:bg-blue-100 hover:scale-105'
                                    onClick={() => openModal(movie.imdbID)}>Details</button>
                            </div>
                        </div>
                    ))}

                </div>
            )}

            {/* Model page */}
            {showModel && selectedMovie && (
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center `}>
                    <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} w-5/6 sm:w-3/4 md:2/4 p-8 rounded-lg relative flex flex-col justify-start items-center h-[500px] overflow-y-scroll`}>
                        <button
                            className="absolute top-5 right-5 px-2 py-1 rounded bg-red-500 text-white"
                            onClick={closeModal}
                        >X {/* Close button */}</button>

                        {/* Display movie poster if it exists */}
                        {selectedMovie.Poster && (
                            <img src={selectedMovie.Poster} alt="Poster" />
                        )}
                        {/* Movie details */}
                        <div className='w-full flex justify-start'>
                            <div className='flex flex-col px-5 gap-y-3'>
                                <div className='flex justify-start gap-3 items-center mt-5'>
                                    <p className='flex gap-2 justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F5C518" className="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        {selectedMovie.imdbRating}
                                    </p>
                                    <p>({selectedMovie.imdbVotes})</p>
                                </div>
                                <p className="text-xl font-semibold">{selectedMovie.Title}</p>

                                <p><b>Date : </b>{selectedMovie.Released}</p>

                                <p><b>Time : </b>{selectedMovie.Runtime}</p>

                                <p><b>Rated : </b>{selectedMovie.Rated}</p>

                                <p><b>IMDB Votes : </b>{selectedMovie.imdbVotes}</p>

                                <p><b>BoxOffice : </b>{selectedMovie.BoxOffice ? selectedMovie.BoxOffice : 'N/A'}</p>

                                <p><b>Genre : </b>{selectedMovie.Genre}</p>

                                <p><b>Director : </b>{selectedMovie.Director}</p>

                                <p><b>Writer : </b>{selectedMovie.Writer}</p>

                                <p><b>Actors : </b>{selectedMovie.Actors}</p>

                                <p><b>Language : </b>{selectedMovie.Language}</p>

                                <p><b>Awards : </b>{selectedMovie.Awards}</p>

                                <p><b>Country : </b>{selectedMovie.Country}</p>

                                <p className=''><strong>Plot:</strong> {selectedMovie.Plot}</p>

                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}


export default Home
