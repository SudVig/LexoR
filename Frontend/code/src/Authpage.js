import React, { useState } from 'react'
import Login from './Component/Login'
import Signup from './Component/Signup'

const Authpage = () => {

    const [isLogin ,setisLogin]=useState(true)

  return (
    <div className='overflow-y-hidden'>

       { isLogin?<Login isLogin={isLogin} setisLogin={setisLogin} />:<Signup isLogin={isLogin} setisLogin={setisLogin}  />}
      
    </div>
  )
}

export default Authpage
