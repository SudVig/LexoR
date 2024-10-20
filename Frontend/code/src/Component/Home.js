import React, { useContext, useEffect, useState } from 'react';
import Problemlist from './widgets/Problemlist';
import Sidebar from './widgets/Sidebar';

import { UserContext } from '../App'; // Adjust the path as needed
import { getProfileById } from './Api';
import { useNavigate } from 'react-router';

function Home() {
  const { loginId, setloginid } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!loginId) {
      const storedLoginId = localStorage.getItem('loginid');
      if (storedLoginId) {
        setloginid(storedLoginId);
      } else {
        console.warn('No login ID found in localStorage');
        nav("/");
      }
    }

    if (loginId) {
      async function fetchData() {
        try {
          const val = await getProfileById(loginId);
          setProfile(val);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setProfile(null);
        }
      }
      fetchData();
    }
  }, [loginId, setloginid]);

  return (
    <div className='relative bg-gradient-to-br from-slate-900 to-slate-800'> 
      <div id="ov" className='min-h-screen min-w-screen flex flex-row overflow-x-hidden'>
      
         
        
        <Problemlist isOpen={isOpen} setisOpen={setIsOpen} uid={loginId} />
        <Sidebar isOpen={isOpen} setisOpen={setIsOpen} profile={profile} loginId={loginId} setloginid={setloginid} />
      </div>
    </div>
  );
}

export default Home;
