import React from 'react'
import Navbar from '../Navbar';
import LivePrice from '../Liveprice';
import Myorders from '../Myinvestmentorders';
import Footer from '../Footer';

function Investmentorders({ isAuth, setIsAuth }) {
    return (
        <>
            {isAuth ? (
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

export default Investmentorders