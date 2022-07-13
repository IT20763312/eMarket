import React from 'react'
import Loginform from '../Loginform';
import Navbar from '../Navbar';

const Login = ({setIsAuth}) => {
  return (
    <>
      <Navbar />
      <Loginform setIsAuth={setIsAuth}/>
    </>
  )
}

export default Login
