import React, { useState, useEffect } from 'react';
import './Adminexchangeorderslist.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config'
import { collection, getDocs, query } from 'firebase/firestore';

function Adminexchangeorderslist() {

    const [scroll, setScroll] = useState(true);

    const [exchangeOrders, setExchangeOrders] = useState([]);

    const q = query(collection(db, "exchangeOrders"));

    useEffect(() => {
        const getExchanges = async () => {
            const data = await getDocs(q);
            setExchangeOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getExchanges();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    },[scroll,q])

    const navigate = useNavigate();
    const set = (id) =>{
        navigate('/adminexchangeorderdetails', { state: { exchangeID: id} });
    }

  return (
    <>
      <h1 className='Adminexchangeorderslist-h1'>Exchange Orders</h1>
      <div className='Adminexchangeorderslist-main'>
                
                <table className='Adminexchangeorderslist-table'>
                    <tr>
                        <th className='Adminexchangeorderslist-th'>ID</th>
                        <th className='Adminexchangeorderslist-th'>User ID</th>
                        <th className='Adminexchangeorderslist-th'>Currency</th>
                        <th className='Adminexchangeorderslist-th'>Currency To</th>
                        <th className='Adminexchangeorderslist-th'>Status</th>
                        <th className='Adminexchangeorderslist-th'>Actions</th>
                    </tr>
                    {exchangeOrders.map((exchange) => {
                        return (
                            <>
                                <tr>
                                    <td className='Adminexchangeorderslist-td'>{exchange.id}</td>
                                    <td className='Adminexchangeorderslist-td'>{exchange.uId}</td>
                                    <td className='Adminexchangeorderslist-td'>{exchange.currency}</td>
                                    <td className='Adminexchangeorderslist-td'>{exchange.currencyTo}</td>
                                    <td className='Adminexchangeorderslist-td'>{exchange.status}</td>
                                    <td className='Adminexchangeorderslist-td'>
                                        <button onClick={()=>set(exchange.id)}>View</button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </table>
            </div>
    </>
  )
}

export default Adminexchangeorderslist
