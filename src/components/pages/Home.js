import React from 'react';
import LivePrice from '../Liveprice';
import Footer from '../Footer';
import Cards from '../Cards';
import Videosection from '../Videosection'
import Navbar from '../Navbar';
import '../../App.css';

function Home({isAuth,setIsAuth}) {
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <LivePrice isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Videosection />
      <Cards />
      <Footer />
    </>
  )
}

export default Home
