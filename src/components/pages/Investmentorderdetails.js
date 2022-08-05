import React from 'react'
import Navbar from '../Navbar'
import LivePrice from '../Liveprice'
import Footer from '../Footer'
import Details from '../Myinvestmentorderdetails';

function Investmentorderdetails({isAuth,setIsAuth}) {
  return (
    <>
      {isAuth ? (
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

export default Investmentorderdetails
