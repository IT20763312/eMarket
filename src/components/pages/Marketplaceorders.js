import React from 'react'
import Navbar from '../Navbar';
import LivePrice from '../Liveprice';
import Myorders from '../Mymarketplaceorders';
import Footer from '../Footer';

function Marketplaceorders({ isAuth, setIsAuth }) {
    return (
        <>
            {isAuth || localStorage.getItem("isAuth",true) ? (
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

export default Marketplaceorders
