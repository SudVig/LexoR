import React from 'react';
import { LANGUAGE_VERSIONS } from "../Constants/Constant";

const languages = Object.entries(LANGUAGE_VERSIONS);

const Languageselector = ({ Language, onSelect }) => {
  // Handler function to call onSelect with the selected language
  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    onSelect(selectedLanguage);
  };

  return (
    <div className='w-fit p-2'>
      <select
        name="language"
        id="language"
        onChange={handleChange}
        value={Language} // Set the current value of the select
        className='p-2 bg-white border border-gray-300 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ease-in-out duration-200'
      >
        {
          languages.map(([lang, version]) => (
            <option 
              key={lang} 
              value={lang}
            >
              {lang} - {version}
            </option>
          ))
        }
      </select>
    </div>
  );
}

export default Languageselector;
