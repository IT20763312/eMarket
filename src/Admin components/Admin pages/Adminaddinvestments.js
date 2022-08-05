import React from 'react'
import Navbar from '../Adminnavbar';
import Form from '../Adminaddinvestmentsform';

function Adminaddinvestments({ adminAuth }) {
    return (
        <>
            {adminAuth ? (
                <>
                    <Navbar />
                    <Form />
                </>
            ) : (
                <>
                    {window.location.pathname = '/adminlogin'}
                </>
            )}
        </>
    )
}

export default Adminaddinvestments
