import React from 'react'
import { FaUser } from 'react-icons/fa'

function Header() {
  return (
    <div>
            <header className='bg-gray-200 flex flex-row justify-between px-5 py-3 shadow-2xl'>
        <p className='text-slate-800 text-2xl items-center font-extrabold'>NP</p>
  
       
        <FaUser className='text-slate-800 text-2xl items-center' />
        
      </header>
    </div>
  )
}

export default Header
