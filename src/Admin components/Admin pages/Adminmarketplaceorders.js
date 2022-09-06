import React from 'react'
import Adminnavbar from '../Adminnavbar';
import Adminmarketplaceorderslist from '../Adminmarketplaceorderslist';

function Adminmarketplaceorders({adminAuth}) {
  return (
    <>
    {adminAuth  || sessionStorage.getItem("adminAuth", true) ?(
      <>
      <Adminnavbar/>
      <Adminmarketplaceorderslist/>
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

export default Adminmarketplaceorders
