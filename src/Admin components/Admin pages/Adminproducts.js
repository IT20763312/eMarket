import React from 'react'
import Adminnavbar from '../Adminnavbar';
import AdminProduct from '../Adminproduct';

function Adminproducts({adminAuth}) {
  return (
    <>
    {adminAuth || localStorage.getItem("adminAuth", true) ?(
      <>
      <Adminnavbar/>
      <AdminProduct/>
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

export default Adminproducts
