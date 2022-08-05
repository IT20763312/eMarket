import React from 'react'
import Adminnavbar from '../Adminnavbar';
import Adminmarketplaceorderslist from '../Adminmarketplaceorderslist';

function Adminmarketplaceorders({adminAuth}) {
  return (
    <>
    {adminAuth?(
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
