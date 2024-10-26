

import React, { createContext, useState} from 'react';
import Authpage from './Authpage';
import Home from './Component/Home'
import Coding from './Component/Coding'
import { Routes, Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
import Login from './Component/Login';
import Signup from './Component/Signup';
export const UserContext=createContext();

const MyContextProvider=({children})=>{
  const [loginId,setloginid]=useState(null);
  return(
    <UserContext.Provider value={{
      loginId,setloginid,
    }}>
      {children}
    </UserContext.Provider>
  )
}


function App() {
  return (<>
  <MyContextProvider>
  <title>LexoR</title>
    <Router>
      <Routes>
      <Route path="/" element={<Login/>}></Route>

        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/coding/:pblm_id" element={<Coding/>}></Route>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      
      </Routes>


    </Router>

    
  </MyContextProvider>
    {/* </UserContext.Provider> */}
    </>
  );
}

export default App;
