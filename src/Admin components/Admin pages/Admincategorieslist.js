import React from 'react';
import AdminNavBar from '../Adminnavbar';
import CategoriesList from '../Adminitemcategories';

function Admincategorieslist({adminAuth}) {
  return (
    <>
    {adminAuth  || sessionStorage.getItem("adminAuth", true) ?(
      <>
      <AdminNavBar/>
      <CategoriesList/>
      </>
    ):(
      <>
      {window.location.pathname='/adminlogin'}
      </>
    
    )}
    </>
  )
}

export default Admincategorieslist
