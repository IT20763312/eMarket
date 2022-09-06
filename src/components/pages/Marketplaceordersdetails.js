import React from 'react'
import Navbar from '../Navbar';
import LivePrice from '../Liveprice';
import Myordersdetails from '../Mymarketplaceordersdetails';
import Footer from '../Footer';

function Marketplaceordersdetails({ isAuth, setIsAuth }) {
  return (
    <>
            {isAuth || sessionStorage.getItem("isAuth",true) ? (
                <>
                    <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
                    <LivePrice isAuth={isAuth} setIsAuth={setIsAuth} />
                    <Myordersdetails />
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

export default Marketplaceordersdetails
