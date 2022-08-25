import React, { useState } from 'react';
import './Resetpasswordform.css';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../Firebase-config';
import { useNavigate , useLocation } from "react-router-dom";

function Resetpasswordform() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let navigate = useNavigate();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const oobCode = queryParams.get("oobCode");

    const resetPassword = () => {
        if (password === "") {
            alert("Please Enter the Password!")
        } else if (confirmPassword === "") {
            alert("Please Enter the Confirm Password!")
        } else if (password !== confirmPassword) {
            alert("Password and Confirm Password Doesn't match, Please Update!")
        } else {
            confirmPasswordReset(auth,oobCode,password).then(()=>{
                alert("Password Reseted Successfully!");
                navigate("/login");
            }).catch((err)=>{
                alert(err);
            })
        }
    }

    return (
        <div className="Resetpasswordform-form-main">
            <div className="Resetpasswordform-form-sub-main">
                <div className="Resetpasswordform-form-sub-sub-main">
                    <div className='Resetpasswordform-form-details'>
                        <h1 className='Resetpasswordform-form-heading'>Reset Password</h1>
                        <div className='Resetpasswordform-form-details'>
                            <input type="password" placeholder="Enter Password" className="Resetpasswordform-form-name" onChange={(event) => { setPassword(event.target.value); }} />
                        </div>
                        <div className='Resetpasswordform-form-second-input'>
                            <input type="password" placeholder="Enter Confirm Password" className="Resetpasswordform-form-name" onChange={(event) => { setConfirmPassword(event.target.value); }} />
                        </div>
                        <div className="Resetpasswordform-form-login-button">
                            <button onClick={resetPassword} className='Resetpasswordform-form-button'>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Resetpasswordform
