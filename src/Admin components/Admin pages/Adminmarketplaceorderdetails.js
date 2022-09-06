import React from 'react'
import Adminnavbar from '../Adminnavbar';
import Adminmarketplaceorderlistdetails from '../Adminmarketplaceorderlistdetails'

function Adminmarketplaceorderdetails({adminAuth}) {
  return (
    <>
      <>
      {adminAuth  || sessionStorage.getItem("adminAuth", true) ? (
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
