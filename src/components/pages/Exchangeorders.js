import React from 'react'
import Navbar from '../Navbar';
import LivePrice from '../Liveprice';
import Myorders from '../Myexchangeorders';
import Footer from '../Footer';

function Exchangeorders({ isAuth, setIsAuth }) {
    return (
        <>
            {isAuth || sessionStorage.getItem("isAuth",true) ? (
                <>
                    <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
                    <LivePrice isAuth={isAuth} setIsAuth={setIsAuth} />
                    <Myorders />
                    <Footer />
                </>
            ) : (
                <>

                    {window.location.pathname = '/login'}

                </>
            )}
        </>
    )
}

export default Exchangeorders
