import React from 'react'
import Navbar from '../Navbar';
import LivePrice from '../Liveprice';
import Cart from '../Cart';
import Footer from '../Footer';

function Mycart({ isAuth, setIsAuth }) {
    return (
        <>
            {isAuth ? (
                <>
                    <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
                    <LivePrice isAuth={isAuth} setIsAuth={setIsAuth} />
                    <Cart />
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

export default Mycart
