import React from 'react'
import Navbar from '../Navbar';
import Liveprice from '../Liveprice';
import Itemcategories from '../Itemcategories';
import Footer from '../Footer';

function Categories({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar />
      <Liveprice isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Itemcategories/>
      <Footer/>
    </>
  )
}

export default Categories
