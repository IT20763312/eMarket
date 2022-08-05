import React from 'react'
import LivePrice from '../Liveprice';
import Footer from '../Footer';
import Navbar from '../Navbar';
import List from '../Currencywiseinvestments'

function Investmentlist({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <LivePrice isAuth={isAuth} setIsAuth={setIsAuth}/>
      <List/>
      <Footer />
    </>
  )
}

export default Investmentlist
