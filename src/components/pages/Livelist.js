import React from 'react';
import Livecoinlist from '../Livecoinlist';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Livelist({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Livecoinlist/>
      <Footer/>
    </>
  )
}

export default Livelist
