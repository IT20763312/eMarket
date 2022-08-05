import React from 'react'
import Navbar from '../Navbar'
import Liveprice from '../Liveprice'
import Footer from '../Footer'
import Details from '../Investmentdetails';

function Investmentdetails({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Liveprice isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Details isAuth={isAuth}/>
      <Footer/>
    </>
  )
}

export default Investmentdetails
