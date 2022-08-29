import React, { useEffect } from "react";
import './Liveprice.css';
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase-config";


function Liveprice({ isAuth, setIsAuth }) {

  const navigate = useNavigate();

  useEffect(() => {

    var btc = document.getElementById("bitcoin");
    var eth = document.getElementById("ethereum");
    var ltc = document.getElementById("litecoin");

    var liveprice = {
      "async": true,
      "scroosDomain": true,
      "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Clitecoin&vs_currencies=usd",

      "method": "GET",
      "headers": {}
    }

    $.ajax(liveprice).done(function (response) {
      btc.innerHTML = response.bitcoin.usd;
      eth.innerHTML = response.ethereum.usd;
      ltc.innerHTML = response.litecoin.usd;
    });
  }, []);



  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.setItem("isAuth", false);
      setIsAuth(false);
      navigate("/");
    });
  };

  return (
    <div className="App">
      <div className='container'>
        <div className='coin-price'>
          <div className='logo'>
            <img src={process.env.PUBLIC_URL + "Logos/Bitcoin.png"} alt='' />
          </div>
          <div>
            <h1>$<span id="bitcoin"></span></h1>
            <h1>Bitcoin</h1>
          </div>
        </div>
        <div className='coin-price'>
          <div className='logo'>
            <img src={process.env.PUBLIC_URL + "Logos/Ethereum.png"} alt='' />
          </div>
          <div>
            <h1>$<span id="ethereum"></span></h1>
            <h1>Ethereum</h1>
          </div>
        </div>
        <div className='coin-price'>
          <div className='logo'>
            <img src={process.env.PUBLIC_URL + "Logos/Litecoin.png"} alt='' />
          </div>
          <div>
            <h1>$<span id="litecoin"></span></h1>
            <h1>Litecoin</h1>
          </div>
        </div>
        <div className='coin-price'>
          <Link to='/livelist'>
            <div className='more-coins'>
              <h1>More <br></br> Coins</h1>
            </div>
          </Link>
        </div>

        {isAuth ? (
          <>
            <div className="signup-button">
              <button onClick={logOut}>Log Out</button>
            </div>
          </>
        ) : (<>
          <Link to='/login'>
            <div className="login-button">
              <button>Login</button>
            </div>
          </Link>

          <Link to='/signup'>
            <div className="signup-button">
              <button>Sign-up</button>
            </div>
          </Link>
        </>)}
      </div>
    </div>
  );
}

export default Liveprice;