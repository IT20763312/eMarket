import React, { useState, useEffect } from "react";
import axios from "axios";
import './Liveprice.css';
//import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase-config";

/*let eth = new WebSocket('wss://stream.binance.com:9443/ws/ethusd@trade');
let btc = new WebSocket('wss://stream.binance.com:9443/ws/btcusd@trade');
let bnb = new WebSocket('wss://stream.binance.com:9443/ws/bnbusd@trade');

btc.onmessage = (event) => {
  let bitcoin = JSON.parse(event.data);
  document.getElementById('bitcoin').innerHTML = bitcoin.p;
}

eth.onmessage = (event) => {
  let ethereum = JSON.parse(event.data);
  document.getElementById('ethereum').innerHTML = ethereum.p;
}

bnb.onmessage = (event) => {
  let binancecoin = JSON.parse(event.data);
  document.getElementById('binancecoin').innerHTML = binancecoin.p;
}*/

/*var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var bnb = document.getElementById("binancecoin");

var liveprice = {
  "async": true,
  "scroosDomain": true,
  "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin&vs_currencies=usd",

  "method": "GET",
  "headers": {}
}

$.ajax(liveprice).done(function (response) {
  btc.innerHTML = response.bitcoin.usd;
  eth.innerHTML = response.ethereum.usd;
  bnb.innerHTML = response.binancecoin.usd;
});*/

/*const puppeteer = require("puppeteer");

async function scrapePrice(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="__next"]/div/div[1]/div[3]/div/div/div[2]/table/tbody/tr[1]/td[4]/div/a');
  const price = await el.getProperty('text');
  const btc = await price.jsonValue();

  {scrapePrice('https://coin-markets.club/countries/Sri-Lanka/index.html')}
  return btc;
}*/



function Liveprice({ isAuth, setIsAuth }) {


  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [bitcoinID, setBitcoinID] = useState("");
  const [ethereumID, setEthereumID] = useState("");
  const [binanceCoinID, setBinanceCoinID] = useState("");
  const [bitcoinSymbol,setBitcoinSymbol] = useState("");
  const [ethereumSymbol,setEthereumSymbol] = useState("");
  const [binanceCoinSymbol,setBinanceCoinSymbol] = useState("");
  const [bitcoinName,setBitcoinName] = useState("");
  const [ethereumName,setEthereumName] = useState("");
  const [binanceCoinName,setBinanceCoinName] = useState("");

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      }).catch(error => console.log(error));

    setBitcoinID("bitcoin");
    setBitcoinSymbol("btc");
    setBitcoinName("Bitcoin");

    setEthereumID("ethereum");
    setEthereumSymbol("eth");
    setEthereumName("Ethereum");

    setBinanceCoinID("binancecoin");
    setBinanceCoinSymbol("bnb")
    setBinanceCoinName("BNB");
  }, []);

  const btc = coins.filter(coin => coin.id.includes(bitcoinID)&&coin.symbol.includes(bitcoinSymbol)&&coin.name.includes(bitcoinName));
  const eth = coins.filter(coin => coin.id.includes(ethereumID)&&coin.symbol.includes(ethereumSymbol)&&coin.name.includes(ethereumName));
  const bnb = coins.filter(coin => coin.id.includes(binanceCoinID)&&coin.symbol.includes(binanceCoinSymbol)&&coin.name.includes(binanceCoinName));

  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
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
            {btc.map((coin) => {
              return (
                <h1>${coin.current_price}</h1>
              )
            })}
            <h1>Bitcoin</h1>
          </div>
        </div>
        <div className='coin-price'>
          <div className='logo'>
            <img src={process.env.PUBLIC_URL + "Logos/Ethereum.png"} alt='' />
          </div>
          <div>
            {eth.map((coin) => {
              return (
                <h1>${coin.current_price}</h1>
              )
            })}
            <h1>Ethereum</h1>
          </div>
        </div>
        <div className='coin-price'>
          <div className='logo'>
            <img src={process.env.PUBLIC_URL + "Logos/BNB.png"} alt='' />
          </div>
          <div>
            {bnb.map((coin) => {
              return (
                <h1>${coin.current_price}</h1>
              )
            })}
            <h1>BNB</h1>
          </div>
        </div>
        <div className='coin-price'>
          <Link to='/livelist'>
            <div className='more-coins'>
              <h1>More <br></br> Coins</h1>
            </div>
          </Link>
        </div>

        {!isAuth ? (
          <>
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
          </>
        ) : (
          <div className="signup-button">
            <button onClick={logOut}>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Liveprice;