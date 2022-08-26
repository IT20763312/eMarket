import React from 'react';
import Navbar from '../Adminnavbar';
import List from '../Adminrecomandationlist';

function Adminrecomandations({adminAuth}) {
    return (
        <>
        {adminAuth || localStorage.getItem("adminAuth", true) ?(
          <>
          <Navbar/>
          <List/>
          </>
        ):(
          <>
          {window.location.pathname='/adminlogin'}
          </>
        )
        }
        </>
        
      )
}

export default Adminrecomandations
