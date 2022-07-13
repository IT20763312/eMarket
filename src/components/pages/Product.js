import React from 'react'
import Navbar from '../Navbar';
import Liveprice from '../Liveprice';
import Products from '../Product';
import Footer from '../Footer';

function Product({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar />
      <Liveprice isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Products isAuth={isAuth} />
      <Footer/>
    </>
  )
}

export default Product
