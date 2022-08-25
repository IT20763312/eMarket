import React, { useState } from 'react';
import './Forgetpasswordform.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase-config';
import { useNavigate } from "react-router-dom";

function Forgetpasswordform() {

  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  const sendEmail = () => {
    if (email === "") {
      alert("Please enter the Email!")
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Password Reset Link Sent to the Email!");
        navigate("/login");
      }).catch((err) => {
        alert(err);
      })
    }
  }

  return (
    <div className="Forgetpasswordform-form-main">
      <div className="Forgetpasswordform-form-sub-main">
        <div className="Forgetpasswordform-form-sub-sub-main">
          <div className='Forgetpasswordform-form-details'>
            <h1 className='Forgetpasswordform-form-heading'>Forgot Password</h1>
            <div className='Forgetpasswordform-form-details'>
              <input type="text" placeholder="Enter Email" className="Forgetpasswordform-form-name" onChange={(event) => { setEmail(event.target.value); }} />
            </div>
            <div className="Forgetpasswordform-form-login-button">
              <button onClick={sendEmail} className='Forgetpasswordform-form-button'>Enter</button>
            </div>
            <p className="Forgetpasswordform-form-link">
              <a className='Forgetpasswordform-form-a' href='/login'>Login ?</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Forgetpasswordform
