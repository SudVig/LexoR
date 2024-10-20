import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { HiMenuAlt1 } from 'react-icons/hi';
import {  getProblemswithStatus } from '../Api';

import { UserContext } from '../../App';
import { useContext } from 'react';

function Problemlist({ isOpen, setisOpen, uid }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { loginId, setloginid } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await getProblemswithStatus(loginId);
        setData(fetchedData);
        console.log("hi"+data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loginId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800">
        <p className="text-white text-xl md:text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-row justify-center'>
      <div className='py-5 md:py-10 w-5/6 flex flex-col'>
        <div className='flex justify-between text-white text-base md:text-2xl font-semibold pb-5'>
          <p className="text-lg md:text-2xl">Problems</p>
          <HiMenuAlt1 
            onClick={() => setisOpen(!isOpen)} 
            className='hover:text-orange-400 text-2xl md:text-3xl' 
          />
        </div>
        <div className='relative'>
          {data.success ? (
            data.problems.map((problem) => (
              <Tile key={problem.id} problem={problem} />
            ))
          ) : (
            <div className='text-white'>No problems available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Problemlist;
