import { NavLink } from 'react-router-dom';
import { GoSun, GoMoon } from "react-icons/go";
import { useDarkMode } from '../context/dorkModeContext';

function Nav() {

    const { darkMode, toggleDarkMode } = useDarkMode();


    return (
        <div className={`sticky top-0 px-10 xl:px-0 ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-100 text-black'}`}>
            <nav className='flex justify-around xl:px-10 '>
                <ul className='flex justify-start items-center gap-5 p-2 py-3'>
                    <li className='navli'><NavLink to="/">Home</NavLink></li>
                    <li className='navli'><NavLink to="/about">About</NavLink></li>
                    <li className='navli'><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <div className='w-full flex justify-end items-center'>
                    <button className='text-3xl' onClick={toggleDarkMode}>
                        {darkMode ? <GoSun /> : <GoMoon />}
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Nav;