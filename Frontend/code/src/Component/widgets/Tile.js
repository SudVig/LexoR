import React from 'react';
import { FaYoutube } from 'react-icons/fa';
import { HiNewspaper } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

function Tile({ problem }) {
  const handleLinkClick = (e) => {
    e.stopPropagation(); // Prevent the NavLink click event 
  };

  // Determine background color for the problem level with reduced opacity
  const getLevelColor = () => {
    switch (problem.plevel) {
      case 'Easy':
        return 'bg-green-500'; // Dimmer green for easy
      case 'Medium':
        return 'bg-orange-500'; // Dimmer orange for medium
      case 'Hard':
        return 'bg-red-500'; // Dimmer red for hard
      default:
        return 'bg-gray-700'; // Default color for unknown levels
    }
  };

  return (
    <div className={`w-full bg-opacity-40 backdrop-blur-md bg-gray-600 text-white transition-all duration-300 ease-in-out mb-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br from-orange-400 to-orange-600`}>
      <NavLink 
        key={problem.pid} 
        to={`/coding/${problem.pid}`} 
        className="flex flex-col sm:flex-row justify-between items-start px-6 py-4 h-full"
      >
        {/* Problem Name and Solved Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center flex-grow">
          <h3 className="break-words font-semibold text-xl sm:text-lg md:text-xl">
            <span className={`flex-grow ${problem.issolved ? 'text-white' : ''}`}>
              {problem.pid + ".  " + problem.pname}
            </span>
            {problem.issolved && (
              <span className="ml-2 bg-green-500 text-white rounded-full px-2 text-sm">Solved</span>
            )}
          </h3>
        </div>

        {/* Additional Links and Problem Level */}
        <div className='flex items-center mt-2 sm:mt-0'>
          <div className='flex items-center'>
            <a 
              href={problem.particle} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={handleLinkClick} 
              className='mr-4'
            >
              <HiNewspaper size={28} className='hover:text-orange-300 transition duration-200' />
            </a>
            <a 
              href={problem.pyoutube} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={handleLinkClick}
            >
              <FaYoutube size={28} color='red' className='hover:scale-110 transition duration-200' />
            </a>
          </div>

          {/* Problem Level with a background and fully opaque text */}
          <div className={`rounded-full ${getLevelColor()} bg-opacity-75 px-3 ml-4`}>
            <span className='text-sm font-bold text-white'>
              {problem.plevel}
            </span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Tile;
