import React from 'react'
import LivePrice from '../Liveprice';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Exchanges from '../Exchanges';

function Exchange({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <LivePrice isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Exchanges isAuth={isAuth}/>
      <Footer />
    </>
  )
}

export default Exchange
