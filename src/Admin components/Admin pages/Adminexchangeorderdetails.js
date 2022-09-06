import React from 'react';
import Adminnavbar from '../Adminnavbar';
import Adminexchangeorderlistdetails from '../Adminexchangeorderlistdetails';


function Adminexchangeorderdetails({adminAuth}) {
  return (
    <>
      {adminAuth  || sessionStorage.getItem("adminAuth", true) ? (
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
