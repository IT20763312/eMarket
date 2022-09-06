import React from 'react'
import Navbar from '../Navbar'
import LivePrice from '../Liveprice'
import Footer from '../Footer'
import Details from '../Myexchangeorderdetails';

function Exchangeorderdetails({isAuth,setIsAuth}) {
  return (
    <>
      {isAuth || sessionStorage.getItem("isAuth",true) ? (
                <>
                    <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
                    <LivePrice isAuth={isAuth} setIsAuth={setIsAuth} />
                    <Details />
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

export default Exchangeorderdetails
