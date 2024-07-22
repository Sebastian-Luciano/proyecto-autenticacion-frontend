import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSun, FaMoon, FaUser, FaUsers } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import api from '../utils/api';
import Avatar from 'react-avatar';
 
 export default function Layout ({children }){
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const logo = darkMode ? "/devchallenges-light.svg" : "/devchallenges.svg";

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            <img src={logo} alt="DevChallenges" className="w-[130.17px]  h-[18px]" />
          </Link>
          {user && (
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'}`}
              >
                {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {user.photo ? (
                    <img
                      src={api.getImageUrl(user.photo)} 
                      alt="User"
                      className="w-8 h-9 rounded-md object-cover"
                    />
                  ) : (
                    <Avatar name={user.name || user.email} size="32" round={true} />
                  )}
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {user.name || user.email}
                  </span>
                  <span className={`material-icons ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    arrow_drop_down
                  </span>
                </button>
                {isMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <Link to="/profile" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center`}>
                      <FaUser className="mr-2" />
                      My Profile
                    </Link>
                    <Link to="/group-chat" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center`}>
                      <FaUsers className="mr-2" />
                      Group Chat
                    </Link>
                    <button
                      onClick={logout}
                      className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center`}
                    >
                      <IoExitOutline className="mr-2 text-red-500" />
                      <span className="text-red-500">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};
