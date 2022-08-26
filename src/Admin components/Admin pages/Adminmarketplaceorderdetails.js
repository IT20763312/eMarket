import React from 'react'
import Adminnavbar from '../Adminnavbar';
import Adminmarketplaceorderlistdetails from '../Adminmarketplaceorderlistdetails'

function Adminmarketplaceorderdetails({adminAuth}) {
  return (
    <>
      <>
      {adminAuth  || localStorage.getItem("adminAuth", true) ? (
                <>
                    <Adminnavbar />
                    <Adminmarketplaceorderlistdetails />
                </>
            ) : (
                <>
                    {window.location.pathname = '/adminlogin'}
                </>
            )
            }
    </>
    </>
  )
}

export default Adminmarketplaceorderdetails
