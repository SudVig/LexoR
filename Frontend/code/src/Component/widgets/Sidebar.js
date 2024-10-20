import React,{useContext} from 'react';
import { FaTimes, FaUserCircle, FaClipboardCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
function Sidebar({ isOpen, setisOpen, profile }) {
  const navigate = useNavigate();
  const { loginId, setloginid } = useContext(UserContext);
  console.log("Sidebar profile:", profile);

  // Extract statistics from profile
  const { statistics, solved_problems } = profile ? profile : { statistics: {}, solved_problems: [] };

  // Define progress data based on statistics
  const progressData = {
    easy: { solved: statistics.solved_easy_count || 0, total: statistics.easy_count || 0 },
    medium: { solved: statistics.solved_medium_count || 0, total: statistics.medium_count || 0 },
    hard: { solved: statistics.solved_hard_count || 0, total: statistics.hard_count || 0 },
  };

  const handleLogout = () => {
    if(localStorage.getItem("loginid"))
      localStorage.removeItem('loginid');
    setloginid(null)
    navigate('/');
  };

  const renderProgressBar = (level, color, solved, total) => {
    const percentage = (total === 0) ? 0 : (solved / total) * 100;

    return (
      <div className='mb-4 w-full'>
        <h2 className='text-white text-md font-semibold mb-1'>
          {level.charAt(0).toUpperCase() + level.slice(1)} Problems
        </h2>
        <div className='relative w-full h-4 bg-slate-900 rounded'>
          <div
            className={`absolute top-0 left-0 h-full rounded ${color} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className='text-white text-xs mt-1'>{solved} / {total} Solved</div>
      </div>
    );
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-orange-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div
      style={{ boxShadow: '-4px 0 8px rgba(0, 0, 0, 0.2)', minWidth: '300px' }}
      className={`bg-slate-800 p-6 min-h-screen w-1/4 fixed top-0 right-0 transition-transform duration-400 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <FaTimes onClick={() => setisOpen(!isOpen)} className='hover:text-orange-400 text-white mb-4 cursor-pointer' size={24} />
      
      {/* User Details Card */}
      <div className='flex items-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 mb-6 shadow-lg border border-slate-600 transition-transform transform hover:scale-105 hover:shadow-xl'>
        <FaUserCircle className='text-white mr-3' size={50} />
        {profile ? (
          <div>
            <h3 className='text-lg font-bold text-white'>{profile.user.name}</h3>
            <p className='text-sm text-gray-200'>{profile.user.email}</p>
          </div>
        ) : (
          <div className='text-white'>Loading user profile...</div>
        )}
      </div>

      {/* Progress Bars */}
      <div className='flex flex-col items-start mt-2'>
        {renderProgressBar('easy', 'bg-gradient-to-r from-green-400 to-green-600', progressData.easy.solved, progressData.easy.total)}
        {renderProgressBar('medium', 'bg-gradient-to-r from-orange-400 to-orange-600', progressData.medium.solved, progressData.medium.total)}
        {renderProgressBar('hard', 'bg-gradient-to-r from-red-400 to-red-600', progressData.hard.solved, progressData.hard.total)}
      </div>

      {/* Previously Solved Problems */}
      <div className='flex-grow mt-4'>
        <h3 className='text-white text-lg font-semibold mb-2 flex items-center'>
          <FaClipboardCheck className='mr-2' />
          Previously Solved Problems
        </h3>
        <div className='max-h-64 overflow-y-auto bg-slate-900 p-2 rounded-lg shadow-lg scrollbar-hidden' style={{ height: 'calc(100vh - 200px)' }}>
          <ul className='text-white text-sm'>
            {solved_problems.map(problem => (
              <li key={problem.solved_id} className='flex justify-between py-1'>
                <span className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap md:whitespace-normal'>{problem.problem_name}</span>
                <span className={getLevelColor(problem.plevel)}>
                  {problem.plevel}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <div className='mt-4'>
        <button
          onClick={handleLogout}
          className='bg-gradient-to-tr from-orange-400 to-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500 transition duration-300 w-full text-sm'
        >
          Logout
        </button>
      </div>

      {/* CSS for hiding scrollbar */}
      <style>
        {`
          .scrollbar-hidden::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
          .scrollbar-hidden {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>
    </div>
  );
}

export default Sidebar;
