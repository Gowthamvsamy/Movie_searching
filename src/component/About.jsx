import React from 'react'
import { useDarkMode } from '../context/dorkModeContext';

function About() {

  const { darkMode } = useDarkMode();

  return (
    // About over Application
    <div className={`text-center p-20 flex justify-center items-center flex-col h-[80vh] ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-black'}`}>
      <p className='text-4xl font-semibold mb-7'>About</p>
      <p className='w-full sm:w-3/4 text-slate-500 text-md sm:text-lg'>"Show Time" is a movie search app designed to provide users with quick access to detailed information about their favorite films. By simply entering a movie title, the app fetches key details from an online database, including ratings, year of release, runtime, and more. It ensures a user-friendly experience with a clean interface, making it easy to explore movies and view relevant details. Whether you're looking for IMDb ratings or runtime breakdowns, "Show Time" offers a seamless way to find everything you need about your favorite films.</p>
    </div>
  )
}

export default About