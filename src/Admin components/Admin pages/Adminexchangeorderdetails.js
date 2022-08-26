import React from 'react';
import Adminnavbar from '../Adminnavbar';
import Adminexchangeorderlistdetails from '../Adminexchangeorderlistdetails';


function Adminexchangeorderdetails({adminAuth}) {
  return (
    <>
      {adminAuth  || localStorage.getItem("adminAuth", true) ? (
                <>
                    <Adminnavbar />
                    <Adminexchangeorderlistdetails />
                </>
            ) : (
                <>
                    {window.location.pathname = '/adminlogin'}
                </>
            )
            }
    </>
  )
}

export default Adminexchangeorderdetails
