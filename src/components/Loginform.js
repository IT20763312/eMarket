import React from 'react';
import './Loginform.css';
import {useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../Firebase-config';
import { useState } from 'react';

function Loginform({setIsAuth}) {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
  
    let navigate = useNavigate();

    const register = () => {
        
        signInWithEmailAndPassword(auth,registerEmail,registerPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            sessionStorage.setItem("isAuth", true);
            setIsAuth(true);
            alert("Successfully Signed in!");
            navigate("/");
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    const googleRegister = () => {
        signInWithPopup(auth,googleProvider).then(()=>{
            setIsAuth(true);
            sessionStorage.setItem("isAuth", true);
            navigate("/");
        })
        .catch((error)=>{
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    const facebookRegister = () =>{
        signInWithPopup(auth,facebookProvider).then((result)=>{
            setIsAuth(true);
            sessionStorage.setItem("isAuth",true);
            navigate("/");
        })
        .catch((error)=>{
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    return (
        <div className="login-form-main">
            <div className="login-form-sub-main">
                <div className="login-form-sub-sub-main">
                    <div className="login-form-imgs">
                        <div className="login-form-container-image">
                            <img src={process.env.PUBLIC_URL + "Logos/Login.png"} alt="profile" className="login-form-profile" />

                        </div>


                    </div>
                    <div className='login-form-details'>
                        <h1 className='login-form-heading'>Login</h1>
                        <div className='login-form-details'>
                            <input type="text" placeholder="Email" className="login-form-name" onChange={(event) => { setRegisterEmail(event.target.value); }} />
                        </div>
                        <div className="login-form-second-input">
                            <input type="password" placeholder="Password" className="login-form-name" onChange={(event) => { setRegisterPassword(event.target.value); }}/>
                        </div>
                        <div className="login-form-login-button">
                            <button onClick={register} className='login-form-button'>Login</button>
                        </div>
                        <div className='login-logos'>
                                <div className='login-single-logos'>
                                    <img alt='' onClick={googleRegister} src={process.env.PUBLIC_URL + "Logos/GoogleLogo.png"}></img>
                                </div>
                                <div className='login-single-logos'>
                                    <img alt='' onClick={facebookRegister} src={process.env.PUBLIC_URL + "Logos/FacebookLogo.png"}></img>
                                </div>
                            </div>
                        <p className="login-form-link">
                            <a className='login-form-a' href="/forgetpassword">Forgot password ?</a> Or <a href='/signup' className='login-form-a'>Sign Up ?</a>
                        </p>


                    </div>
                </div>


            </div>
        </div>
    );
}

export default Loginform;