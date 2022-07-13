import React from 'react'
import Navbar from '../Navbar';
import Liveprice from '../Liveprice';
import ProductList from '../Categorywiseproductlist';
import Footer from '../Footer';

function Productlist({isAuth,setIsAuth}) {
  return (
    <>
        <Navbar/>
        <Liveprice isAuth={isAuth} setIsAuth={setIsAuth}/>
        <ProductList/>
        <Footer/>
    </>
  )
}

export default Productlist
