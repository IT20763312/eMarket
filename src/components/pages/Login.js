import React from 'react'
import Loginform from '../Loginform';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Login = ({isAuth,setIsAuth}) => {
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Loginform setIsAuth={setIsAuth}/>
      <Footer/>
    </>
  )
}

export default Login
