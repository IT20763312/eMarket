import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { signOut } from "firebase/auth";
import { auth } from "../Firebase-config";

function Navbar({ isAuth, setIsAuth }) {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            navigate("/");
        });
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className='navbar-logo-word'>
                        <img src={process.env.PUBLIC_URL + "Main-Logo.gif"} className='navbar-logo' alt='' />
                        &nbsp; Market
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/categories' className='nav-links' onClick={closeMobileMenu}>
                                MarketPlace
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/exchanges' className='nav-links' onClick={closeMobileMenu}>
                                Exchanges
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/investments' className='nav-links' onClick={closeMobileMenu}>
                                Investments
                            </Link>
                        </li>
                        {!isAuth ? (
                            <>
                                <li className='nav-item-btn'>
                                    <Link to='/login'>
                                        <div>

                                            <button>Login</button>

                                        </div>
                                    </Link>
                                </li>
                                <li className='nav-item-btn'>
                                    <Link to='/signup'>
                                        <div>
                                            <button>Sign-up</button>
                                        </div>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item-btn'>
                                    <div>
                                        <button onClick={logOut}>Log Out</button>
                                    </div>
                                </li>
                                <li className='nav-item-btn'>
                                    

                                </li>
                            </>
                        )}
                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Navbar
