import React from 'react'
import Navbar from '../Navbar';
import Liveprice from '../Liveprice';
import Products from '../Product';
import Review from '../Marketplacereviews';
import Footer from '../Footer';

function Product({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Liveprice isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Products isAuth={isAuth} />
      <Review/>
      <Footer/>
    </>
  )
}

export default Product
