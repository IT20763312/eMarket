import React from "react";
import Signupform from '../Signupform';
import Navbar from "../Navbar";
import Footer from "../Footer";

const Signup = ({isAuth,setIsAuth}) => {
    return(
        <>
            <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
            <Signupform setIsAuth={setIsAuth}/>
            <Footer/>
        </>
    )
}

export default Signup