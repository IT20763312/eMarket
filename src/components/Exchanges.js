import React, { useEffect, useState } from 'react'
import $ from "jquery";
import './Exchanges.css'
import { db } from '../Firebase-config';
import { collection, getDocs, query } from 'firebase/firestore';

function Exchanges() {

    const [currentPrice, setCurrentPrice] = useState();
    const [currentPriceTo, setCurrentPriceTo] = useState();
    const [currency, setCurrency] = useState("");
    const [currencyTo, setCurrencyTo] = useState("");

    const [currencies, setCurrencies] = useState([]);
    const [scroll, setScroll] = useState(true);

    const [amount, setAmount] = useState();

    const q1 = query(collection(db, "currencies"));

    useEffect(() => {

        const getCurrency = async () => {
            const data = await getDocs(q1);
            setCurrencies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getCurrency();

        var liveprice = {
            "async": true,
            "scroosDomain": true,
            "url": "https://api.coingecko.com/api/v3/simple/price?ids=" + currency + "&vs_currencies=usd",

            "method": "GET",
            "headers": {}
        }

        $.ajax(liveprice).then((res) => {
            setCurrentPrice(res[currency]["usd"]);
        })

        var livepriceto = {
            "async": true,
            "scroosDomain": true,
            "url": "https://api.coingecko.com/api/v3/simple/price?ids=" + currencyTo + "&vs_currencies=usd",

            "method": "GET",
            "headers": {}
        }

        $.ajax(livepriceto).then((res) => {
            setCurrentPriceTo(res[currencyTo]["usd"]);
        })

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [currencyTo,currency, scroll, q1])

    return (
        <>
            <div className='Exchanges'>
                <div className='Exchanges-inner'>
                    <h2 className='Exchanges-h2'>Exchanges !</h2>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <div className='Exchanges-select'>
                        <select onChange={(e) => setCurrency(e.target.value)}>
                            <option>Please Select a Currency</option>
                            {currencies.map((curr) => {
                                return (
                                    <option value={curr.currencyCode}>{curr.currencySymbol}</option>
                                )
                            })}
                        </select>
                    </div>
                    <br></br>
                    <div className='Exchanges-input'>
                        <input onChange={(e) => setAmount(e.target.value)} placeholder='Enter Amount' className='Exchanges-text' type="number" />
                    </div>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <h4 className='Exchanges-h4'>To</h4>
                    <br></br>
                    <div className='Exchanges-select'>
                        <select onChange={(e) => setCurrencyTo(e.target.value)}>
                            <option>Please Select a Currency</option>
                            {currencies.map((curr) => {
                                return (
                                    <option value={curr.currencyCode}>{curr.currencySymbol}</option>
                                )
                            })}
                        </select>
                    </div>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <h4 className='Exchanges-h4'>You will Recieve : </h4>
                    <br></br>
                    <h2 className='Exchanges-h2'>{(amount*currentPrice)/currentPriceTo}</h2>
                </div>
            </div>

        </>
    )
}

export default Exchanges
