import React from 'react'
import LivePrice from '../Liveprice';
import Footer from '../Footer';
import Navbar from '../Navbar';
import InvestmentCards from '../Investmentcards';

function Investmentshome({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <LivePrice isAuth={isAuth} setIsAuth={setIsAuth}/>
      <InvestmentCards/>
      <Footer />
    </>
  )
}

export default Investmentshome
