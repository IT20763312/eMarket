import React from 'react'
import AdminNavBar from '../Adminnavbar';
import Adminhomecards from '../Adminhomecards';

function Adminhome({adminAuth}) {

  return (
    <>
    {adminAuth  || localStorage.getItem("adminAuth", true) ?(
      <>
      <AdminNavBar/>
      <Adminhomecards/>
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

export default Adminhome
