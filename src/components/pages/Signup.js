import React from "react";
import Signupform from '../Signupform';
import Navbar from "../Navbar";

const Signup = ({setIsAuth}) => {
    return(
        <>
            <Navbar />
            <Signupform setIsAuth={setIsAuth}/>
        </>
    )
}

export default Signup