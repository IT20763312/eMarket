import React, { useState } from 'react'
import './Adminloginform.css'
import { useNavigate } from "react-router-dom";
import { db } from '../Firebase-config';
import {collection,getDocs} from 'firebase/firestore';

function Adminloginform({ setAdminAuth }) {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [adminUsers, setAdminUsers] =useState([]);
    const adminUsersCollectionRef = collection(db, "adminUsers");

    const navigate = useNavigate();

    const register = () => {

        
        const getUsers = async () =>{
            const data = await getDocs(adminUsersCollectionRef);
            setAdminUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id})));

        }
        getUsers();
        
        adminUsers.map((user)=>{
            if(registerEmail===user.email && registerPassword===user.password){
                localStorage.setItem("adminAuth", true);
                setAdminAuth(true);
                alert("Signed in successfully!");
                navigate('/adminhome');
            }
            else{
                alert("Please enter the correct email or password");
            }
        })

    }

    return (
        <div className="adminlogin-form-main">
            <div className="adminlogin-form-sub-main">
                <div className="adminlogin-form-sub-sub-main">
                    <div className="adminlogin-form-imgs">
                        <div className="adminlogin-form-container-image">
                            <img src={process.env.PUBLIC_URL + "Logos/Login.png"} alt="profile" className="adminlogin-form-profile" />

                        </div>


                    </div>
                    <div className='adminlogin-form-details'>
                        <h1 className='adminlogin-form-heading'>Admin-Login</h1>
                        <div className='adminlogin-form-details'>
                            <input type="text" placeholder="Email" className="adminlogin-form-name" onChange={(event) => { setRegisterEmail(event.target.value); }} />
                        </div>
                        <div className="adminlogin-form-second-input">
                            <input type="password" placeholder="Password" className="adminlogin-form-name" onChange={(event) => { setRegisterPassword(event.target.value); }} />
                        </div>
                        <div className="adminlogin-form-login-button">
                            <button onClick={register} className='adminlogin-form-button'>Login</button>
                        </div>



                    </div>
                </div>


            </div>
        </div>
    )
}

export default Adminloginform
