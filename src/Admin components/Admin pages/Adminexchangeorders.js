import React from 'react';
import Adminnavbar from '../Adminnavbar';
import Adminexchangeorderslist from '../Adminexchangeorderslist';

function Adminexchangeorders({ adminAuth }) {
    return (
        <>
            {adminAuth  || sessionStorage.getItem("adminAuth", true) ? (
                <>
                    <Adminnavbar />
                    <Adminexchangeorderslist />
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

export default Adminexchangeorders
