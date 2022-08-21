import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { db } from '../Firebase-config'
import { addDoc, collection } from 'firebase/firestore';

function Footer() {

    const [email, setEmail] = useState("");
    const [recomandation, setRecomandation] = useState("");

    const recomandsCollectionRef = collection(db, "recomandations");

    const addRecomandation = async () => {
        
        if (email === "") {
            alert("Please enter the email !");
        } else if (recomandation === "") {
            alert("Please enter anything without blank !");
        } else {
            await addDoc(recomandsCollectionRef, { email: email, recomandation: recomandation, read:"False" }).then((re) => {
                alert("Thankyou for the recomandation !");
            });

        }
    }

    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the best marketplace using crypto for best deals
                </p>
                <p className='footer-subscription-text'>
                    Any recomandations ?.
                </p>
                <div className='input-areas'>

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className='footer-input'
                        name='email'
                        type='email'
                        placeholder='Your Email'
                        defaultValue={email}
                    /><br></br>
                    <textarea
                        onChange={(e) => setRecomandation(e.target.value)}
                        className='footer-input'
                        name='recomandation'
                        type='text'
                        placeholder='Your Recomandation'
                        defaultValue={recomandation}
                    /><br></br>
                    <button onClick={addRecomandation}>Enter</button>

                </div>
            </section>
            <div class='footer-links'>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <Link to='/'><h2>MarketPlace</h2></Link>
                        <Link to='/'>My cart</Link>
                        <Link to='/'>My orders</Link>
                    </div>
                    <div class='footer-link-items'>
                        <Link to='/'><h2>Exchanges</h2></Link>
                        <Link to='/'>Exchange Orders</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <Link to='/'><h2>Investments</h2></Link>
                        <Link to='/'>My investments</Link>
                    </div>
                    <div class='footer-link-items'>
                        <Link to='/'><h2>About Us</h2></Link>
                        <Link to='/'>About us</Link>
                        <Link to='/'>Advertisements</Link>
                    </div>
                    <div class='footer-link-items'>
                        <Link to='/'><h2>Social Media</h2></Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                        <Link to='/'>LinkedIn</Link>
                    </div>
                </div>
            </div>
            <section class='social-media'>
                <div class='social-media-wrap'>
                    <div class='footer-logo'>
                        <Link to='/' className='social-logo'>
                            <img src={process.env.PUBLIC_URL + "Main-Logo.gif"} alt='' />
                            &nbsp; Market
                        </Link>
                    </div>
                    <small class='website-rights'>eMarket © 2022</small>
                    <div class='social-icons'>
                        <Link
                            class='social-icon-link facebook'
                            to='/'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <i class='fab fa-facebook-f' />
                        </Link>
                        <Link
                            class='social-icon-link instagram'
                            to='/'
                            target='_blank'
                            aria-label='Instagram'
                        >
                            <i class='fab fa-instagram' />
                        </Link>
                        <Link
                            class='social-icon-link youtube'
                            to='/'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <i class='fab fa-youtube' />
                        </Link>
                        <Link
                            class='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <i class='fab fa-twitter' />
                        </Link>
                        <Link
                            class='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <i class='fab fa-linkedin' />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;