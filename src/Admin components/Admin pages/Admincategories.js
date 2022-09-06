import React from 'react'
import AdminNavBar from '../Adminnavbar';
import ManageCategories from '../Adminmanagecategories';

function Admincategories({adminAuth}) {
  return (
    <>
    {adminAuth  || sessionStorage.getItem("adminAuth", true) ?(
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
