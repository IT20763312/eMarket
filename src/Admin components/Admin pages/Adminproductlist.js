import React from 'react'
import Adminnavbar from '../Adminnavbar';
import AdminProductList from '../Admincategorywiseproductlist';

function Adminproductlist({adminAuth}) {
  return (
    <>
    {adminAuth || localStorage.getItem("adminAuth", true) ?(
      <>
      <Adminnavbar/>
      <AdminProductList/>
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

export default Adminproductlist
