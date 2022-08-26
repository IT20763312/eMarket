import React from 'react'
import Adminsignupform from '../Adminsignupform';
import Adminnavbar from '../Adminnavbar';

function Adminsignup({adminAuth}) {
  return (
    <>
    {adminAuth || localStorage.getItem("adminAuth", true) ?(
        <>
      <Adminnavbar/>
      <Adminsignupform/>
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

export default Adminsignup
