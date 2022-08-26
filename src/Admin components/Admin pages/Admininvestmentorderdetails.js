import React from 'react'
import Adminnavbar from '../Adminnavbar';
import Admininvestmentorderlistdetails from '../Admininvestmentorderlistdetails'

function Admininvestmentorderdetails({adminAuth}) {
  return (
    <>
      {adminAuth  || localStorage.getItem("adminAuth", true) ? (
                <>
                    <Adminnavbar />
                    <Admininvestmentorderlistdetails />
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

export default Admininvestmentorderdetails
