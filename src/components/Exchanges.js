import React, { useEffect, useState } from 'react'
import $ from "jquery";
import './Exchanges.css'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase-config';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import Popup from '../components/Popup/Exchangespopup';
import QRCode from 'react-qr-code';

function Exchanges({ isAuth }) {

    const [currencies, setCurrencies] = useState([]);
    const [scroll, setScroll] = useState(true);
    let today = new Date().toLocaleDateString();

    const [currentPrice, setCurrentPrice] = useState();
    const [currentPriceTo, setCurrentPriceTo] = useState();
    const [currency, setCurrency] = useState("");
    const [currencyTo, setCurrencyTo] = useState("");

    const [profit, setProfit] = useState();
    const [minAmount, setMinAmount] = useState();
    const [maxAmount, setMaxAmount] = useState();

    const [amount, setAmount] = useState(0);

    const [transactionId, setTransactionId] = useState("");
    const [walletId, setWalletId] = useState("");

    const [buttonPopup, setButtonPopup] = useState(false);

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

        currencies.filter(curr => curr.currencyCode === currencyTo).map(fillteredProfit => (
            setProfit(fillteredProfit.profit)
        ))

        currencies.filter(curr => curr.currencyCode === currency).map(fillteredMinAmount => (
            setMinAmount(fillteredMinAmount.minAmount)
        ))

        currencies.filter(curr => curr.currencyCode === currency).map(fillteredMaxAmount => (
            setMaxAmount(fillteredMaxAmount.maxAmount)
        ))

    }, [currencyTo, currency, scroll, q1, currencies])

    const navigate = useNavigate();

    const set = () => {
        if (isAuth === true) {
            if (currency === "" && currencyTo === "" && amount === 0) {
                alert("Please Select The Fields and set the amount?")
            }
            else {
                setScroll(true);
                setButtonPopup(true);
            }
        }
        else {
            navigate("/login");
        }
    }

    const order = async () => {
        const auth = getAuth()
        const user = auth.currentUser;
        if (isAuth) {
            if (walletId === "") {
                alert("Please Enter the Wallet Id");
            } else if (transactionId === "") {
                alert("Please Enter the Transaction Id");
            } else {
                const uid = user.uid;
                addDoc(collection(db, "exchangeOrders"), {
                    uId: uid,
                    date: Date(today),
                    amount: Number(amount),
                    currency: currency,
                    currencyTo: currencyTo,
                    recievingAmount: Number(((amount * currentPrice) / currentPriceTo) * (100 - profit) / 100),
                    walletId: walletId,
                    transactionId: transactionId,
                    status: "Pending",
                }).then(() => {
                    alert("Exchange ordered Successfully!");
                    navigate("/myexchangeorders")
                }).catch((err) => {
                    alert(err);
                })
            }
        }
        else {
            navigate("/login");
        }
    }

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
            <div className='Exchanges-L'>
                <Link className='Exchanges-link' to="/myexchangeorders">
                    My Exchanges
                </Link>
            </div>
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
                    {amount > maxAmount ? (<><h4 className='Exchanges-h4-msg'>Max Amount is : {maxAmount}</h4></>) : (<></>)}
                    {amount < minAmount ? (<><h4 className='Exchanges-h4-msg'>Min Amount is : {minAmount}</h4></>) : (<></>)}
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
                    {currencyTo === "" ? (<></>) : (<>
                        <h2 className='Exchanges-h2'>{((amount * currentPrice) / currentPriceTo) * (100 - profit) / 100}</h2>
                    </>)}
                    <div className='Exchanges-btn'>
                        <button onClick={set} className='Exchanges-button'>Exchange</button>
                        <Popup setTrigger={setButtonPopup} trigger={buttonPopup}>
                            <h2 className='Exchanges-h2'>Pay-out!</h2>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <h4 className='Exchanges-h4'>Currency : {currency}</h4>
                            <br></br>
                            <h4 className='Exchanges-h4'>To : {currencyTo}</h4>
                            <br></br>
                            <h4 className='Exchanges-h4'>Amount : {amount} ({currency})</h4>
                            <br></br>
                            <h4 className='Exchanges-h4'>Recieving : {((amount * currentPrice) / currentPriceTo) * (100 - profit) / 100} ({currencyTo})</h4>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <h2 className='Exchanges-h2'>Enter Transaction Details!</h2>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            {currencies.filter(curr => curr.currencyCode === currency).map((details) => {
                                return (<>
                                    <h4 className='Exchanges-h4'>Send {amount} {details.currencySymbol} to below address</h4>
                                    <br></br>
                                    <h4 className='Exchanges-h4'>Network : {details.currencyNetwork}</h4>
                                    <br></br>
                                    <h4 onClick={() => copyToClipBoard(details.currencyWalletId)} className='Exchanges-h4'>Wallet Id : {details.currencyWalletId}</h4>
                                    <br></br>
                                    <QRCode
                                        title={details.currencySymbol}
                                        value={details.currencyWalletId}
                                        bgColor='#FFFFFF'
                                        fgColor='#000000'
                                        size={200}
                                    />
                                    <br></br>
                                    <br></br>
                                    <div className='Exchanges-input'>
                                        <input onChange={(event) => setTransactionId(event.target.value)} placeholder='Enter Transaction Id' className='Exchanges-text' type="text" />
                                    </div>
                                </>)
                            })}
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <h2 className='Exchanges-h2'>Add Exchange Wallet Id!</h2>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            {currencies.filter(curr => curr.currencyCode === currencyTo).map((details) => {
                                return (
                                    <>
                                        <h4 className='Exchanges-h4'>You Will recieve {((amount * currentPrice) / currentPriceTo) * (100 - profit) / 100} {details.currencySymbol} for the below Wallet ID Address</h4>
                                        <br></br>
                                        <h4 className='Exchanges-h4'>Please add the wallet for the correct network...</h4>
                                        <br></br>
                                        <h4 className='Exchanges-h4'>Currency : {details.currencySymbol}</h4>
                                        <br></br>
                                        <h4 className='Exchanges-h4'>Network : {details.currencyNetwork}</h4>
                                        <br></br>
                                        <div className='Exchanges-input'>
                                            <input onChange={(event) => setWalletId(event.target.value)} placeholder='Enter Wallet Id' className='Exchanges-text' type="text" />
                                        </div>
                                        <br></br>
                                        <hr></hr>
                                        <div className='Exchanges-btn'>
                                            <button onClick={order}>Order</button>
                                        </div>
                                    </>
                                )
                            })}
                        </Popup>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Exchanges
