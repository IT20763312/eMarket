import React from 'react'
import Adminnavbar from '../Adminnavbar';
import Admininvestmentorderslist from '../Admininvestmentorderslist';

function Admininvestmentorders({ adminAuth }) {
    return (
        <>
            {adminAuth  || sessionStorage.getItem("adminAuth", true) ? (
                <>
                    <Adminnavbar />
                    <Admininvestmentorderslist />
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

export default Admininvestmentorders
