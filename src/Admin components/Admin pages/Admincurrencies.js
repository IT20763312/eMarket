import React from 'react'
import AdminNavBar from '../Adminnavbar';
import ManageCurrencies from '../Adminmanagecurrencies';

function Admincurrencies({ adminAuth }) {
    return (
        <>
            {adminAuth || sessionStorage.getItem("adminAuth", true) ? (
                <>
                    <AdminNavBar />
                    <ManageCurrencies />
                </>
            ) : (
                <>
                    {window.location.pathname = '/adminlogin'}
                </>

            )}
        </>
    )
}

export default Admincurrencies
