import React from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const Chip = ({ testcase_no, isSelected, onClick, ispass }) => {
  return (
    <div
      className={`cursor-pointer px-3 py-1 flex items-center ${isSelected ? 'border-b-4 border-orange-500' : 'border border-none'}`}
      onClick={onClick}
      style={{ height: '40px' }} // Set a height for the container
      role="button" // Improves accessibility
      tabIndex={0} // Allows keyboard navigation
      onKeyPress={(e) => { if (e.key === 'Enter') onClick(); }} // Handle Enter key press
    >
      Case {testcase_no}
      {ispass ? (
        <AiOutlineCheckCircle className='text-green-500 ml-2' style={{ verticalAlign: 'middle' }} />
      ) : (
        <AiOutlineCloseCircle className='text-red-500 ml-2' style={{ verticalAlign: 'middle' }} />
      )}
    </div>
  );
};

export default Chip;
