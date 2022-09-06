import React from 'react'
import AdminNavBar from '../Adminnavbar';
import Adminaddproduct from '../Adminaddproduct';

function Adminaddproducts({adminAuth}) {
  return (
    <>
{adminAuth  || sessionStorage.getItem("adminAuth", true) ?(
    <>
    <AdminNavBar/>
    <Adminaddproduct/>
    </>
):(
    <>
    {window.location.pathname='/adminlogin'}
    </>
)}
    </>
  )
}

export default Adminaddproducts
