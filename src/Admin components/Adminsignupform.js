import React, { useState } from 'react';
import './Adminsignupform.css';
import { db } from '../Firebase-config';
import { addDoc, collection } from 'firebase/firestore';

function Adminsignupform() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const adminUsersCollectionRef = collection(db, "adminUsers");

    const register = async () => {
        if (registerEmail === "") {
            alert("Please enter the email")
        } else if (registerPassword === "") {
            alert("Please enter a password")
        } else {
            await addDoc(adminUsersCollectionRef, { email: registerEmail, password: registerPassword });
            alert("New admin created successfully");
        }
    }

    return (
        <div className="adminsignup-form-main">
            <div className="adminsignup-form-sub-main">
                <div className="adminsignup-form-sub-sub-main">
                    <div className="adminsignup-form-imgs">
                        <div className="adminsignup-form-container-image">
                            <img src={process.env.PUBLIC_URL + "Logos/Sign-up.png"} alt="profile" className="adminsignup-form-profile" />

                        </div>


                    </div>
                    <div className='adminsignup-form-details'>
                        <h1 className='adminsignup-form-heading'>Sign-Up</h1>
                        <div className='adminsignup-form-details'>
                            <input name='email' type="email" placeholder="Email" className="adminsignup-form-name" onChange={(event) => { setRegisterEmail(event.target.value); }} />

                        </div>
                        <div className="adminsignup-form-second-input">
                            <input name='password' type="password" placeholder="Password" className="adminsignup-form-name" onChange={(event) => { setRegisterPassword(event.target.value); }} />

                        </div>
                        <div className="adminsignup-form-signup-button">
                            <button onClick={register} className='adminsignup-form-button'>Sign-Up</button>
                        </div>

                    </div>
                </div>


            </div>
        </div>

    );

}

export default Adminsignupform
