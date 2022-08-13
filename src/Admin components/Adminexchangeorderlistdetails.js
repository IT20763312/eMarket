import React, { useEffect, useState } from 'react';
import './Adminexchangeorderlistdetails.css';
import { useLocation } from 'react-router-dom';
import { collection, where, getDocs, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase-config';

function Adminexchangeorderlistdetails() {

    const location = useLocation();
    const [scroll, setScroll] = useState(true);
    const [exchange, setExchange] = useState([]);

    const [status, setStatus] = useState("");

    const q1 = query(collection(db, "exchangeOrders"), where("__name__", "==", location.state.exchangeID));

    useEffect(() => {
        const getExchange = async () => {
            const data = await getDocs(q1);
            setExchange(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getExchange();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, q1])

    const editStatus = async (id) => {
        if (status === "") {
            alert("Please Select The Status!")
        } else {
            const orderDoc = doc(db, "exchangeOrders", id);
            const newFields = { status: status };
            await updateDoc(orderDoc, newFields);
            alert("Status updated!");
        }
    }

    return (
        <>
            {exchange.map((ex) => {
                return (
                    <div className='Adminexchangeorderlistdetails'>
                        <div className='Adminexchangeorderlistdetails-inner'>
                            <h2 className='Adminexchangeorderlistdetails-h2'>Exchange Details</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className='Adminexchangeorderlistdetails-h3'>currency : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ex.currency}</h3>
                            <h3 className='Adminexchangeorderlistdetails-h3'>Amount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ex.amount}</h3>
                            <h3 className='Adminexchangeorderlistdetails-h3'>Currency To : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ex.currencyTo}</h3>
                            <h3 className='Adminexchangeorderlistdetails-h3'>Recieving Amount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ex.recievingAmount}</h3>
                            <h3 className='Adminexchangeorderlistdetails-h3'>Status : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ex.status}</h3>
                            <hr></hr>
                            <h2 className='Adminexchangeorderlistdetails-h2'>Details</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className='Adminexchangeorderlistdetails-h3'>User ID : {ex.uId}</h3>
                            <h3 className='Adminexchangeorderlistdetails-h3'>Exchange ID : {ex.id}</h3>
                            <h3 className='Adminexchangeorderlistdetails-h3'>Date : {ex.date}</h3>
                            <h3 className='Adminexchangeorderlistdetails-h3'>Transaction ID : {ex.transactionId}</h3>
                            <h3 className='Adminexchangeorderlistdetails-h3'>Wallet ID : {ex.walletId}</h3>
                            <br></br>
                            <hr></hr>
                            <h2 className='Adminexchangeorderlistdetails-h2'>Investment Plan Status</h2>
                            <hr></hr>
                            <br></br>
                            <div className='Adminexchangeorderlistdetails-input'>
                                <select onChange={(event) => (setStatus(event.target.value))}>
                                    <option>{ex.status}</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Payment Confirmed">Payment Confirmed</option>
                                    <option value="Exchange Released">Exchange Released</option>
                                </select>
                            </div>
                            <div className='Adminexchangeorderlistdetails-btn'>
                                <button onClick={() => editStatus(ex.id)} className='Adminexchangeorderlistdetails-button'>Add Status</button>
                            </div>
                            <br></br>
                            <hr></hr>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Adminexchangeorderlistdetails
