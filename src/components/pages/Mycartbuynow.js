import React from 'react'
import Navbar from '../Navbar';
import LivePrice from '../Liveprice';
import Buynow from '../Cartbuynow';
import Footer from '../Footer';

function Mycartbuynow({ isAuth, setIsAuth }) {
    return (
        <>
            {isAuth || sessionStorage.getItem("isAuth",true) ? (
                <>
                    <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
                    <LivePrice isAuth={isAuth} setIsAuth={setIsAuth} />
                    <Buynow />
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

export default Mycartbuynow
