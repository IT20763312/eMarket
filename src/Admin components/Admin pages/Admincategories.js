import React from 'react'
import AdminNavBar from '../Adminnavbar';
import ManageCategories from '../Adminmanagecategories';

function Admincategories({adminAuth}) {
  return (
    <>
    {adminAuth  || localStorage.getItem("adminAuth", true) ?(
      <>
      <AdminNavBar/>
      <ManageCategories/>
      </>
    ):(
      <>
      {window.location.pathname='/adminlogin'}
      </>
    
    )}
    </>
  )
}

export default Admincategories
