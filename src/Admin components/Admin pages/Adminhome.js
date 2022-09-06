import React from 'react'
import AdminNavBar from '../Adminnavbar';
import Adminhomecards from '../Adminhomecards';

function Adminhome({adminAuth}) {

  return (
    <>
    {adminAuth  || sessionStorage.getItem("adminAuth", true) ?(
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
