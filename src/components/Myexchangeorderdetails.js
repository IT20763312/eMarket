import React, { useState, useEffect } from 'react';
import './Myexchangeorderdetails.css';
import { collection, where, getDocs, query } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { db } from '../Firebase-config';

function Myexchangeorderdetails() {

  const location = useLocation();
  const [scroll, setScroll] = useState(true);
  const [exchange, setExchange] = useState([]);

  const q1 = query(collection(db, "exchangeOrders"), where("__name__", "==", location.state.exchangeID));

  useEffect(() => {
    const getPlan = async () => {
      const data = await getDocs(q1);
      setExchange(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPlan();
    if (scroll === true) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setScroll(false);
    }
  }, [scroll, q1])

  return (
    <>
      {exchange.map((ex) => {
        return (
          <div className='Myexchangeorderdetails'>
            <div className='Myexchangeorderdetails-inner'>
              <h2 className='Myexchangeorderdetails-h2'>Exchange Details</h2>
              <hr></hr>
              <br></br>
              <h3 className='Myexchangeorderdetails-h3'>Currency : {ex.currency}</h3>
              <h3 className='Myexchangeorderdetails-h3'>Currency To : {ex.currencyTo}</h3>
              <h3 className='Myexchangeorderdetails-h3'>Amount : {ex.amount}</h3>
              <h3 className='Myexchangeorderdetails-h3'>Receiving Amount : {ex.recievingAmount}</h3>
              <br></br>
              <hr></hr>
              <h2 className='Myexchangeorderdetails-h2'>Transaction Details</h2>
              <hr></hr>
              <br></br>
              <h3 className='Myexchangeorderdetails-h3'>Transaction ID : {ex.transactionId}</h3>
              <h3 className='Myexchangeorderdetails-h3'>Currency To : {ex.walletId}</h3>
              <br></br>
              <hr></hr>
              <h2 className='Myexchangeorderdetails-h2'>Exchange Status</h2>
              <hr></hr>
              <br></br>
              <h3 className='Myexchangeorderdetails-h3-active'>Exchange Status : {ex.status}</h3>
              <br></br>
              <hr></hr>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Myexchangeorderdetails
