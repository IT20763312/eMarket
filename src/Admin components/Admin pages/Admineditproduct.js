import React from 'react'
import AdminNavBar from '../Adminnavbar';
import AdminEditProduct from '../Admineditproducts';

function Admineditproduct({adminAuth}) {
  return (
    <>
            {adminAuth || localStorage.getItem("adminAuth", true) ? (
                <>
                    <AdminNavBar />
                    <AdminEditProduct />
                </>
            ) : (
                <>
                    {window.location.pathname = '/adminlogin'}
                </>

            )}
        </>
  )
}

export default Admineditproduct
