import React, { useState, useEffect } from 'react'
import './Myexchangeorders.css'
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Myexchangeorders() {

    const [scroll, setScroll] = useState(true);

    const [myOrdersExchanges, setMyOrdersExchanges] = useState([]);

    useEffect(() => {

        const getOrders = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            const q1 = query(collection(db, "exchangeOrders"), where("uId", "==", user.uid));
            const data = await getDocs(q1);
            setMyOrdersExchanges(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll])

    const navigate = useNavigate();
    const set = (id) =>{
      navigate('/myexchangeorderdetails', { state: { exchangeID: id} });
    }

    return (
        <>
            <div className='Myexchangeorders-row'>
                {myOrdersExchanges.map((Orders) => {
                    const date = (Orders.date).split(" ")
                    return (
                        <div className='Myexchangeorders-column'>
                            <div className='Myexchangeorders-card'>
                                <div className='Myexchangeorders-h2andh3andbutton'>
                                    <h3 className='Myexchangeorders-h3'>Currency : {Orders.currency}</h3>
                                    <h3 className='Myexchangeorders-h3'>To : {Orders.currencyTo}</h3>
                                    <h3 className='Myexchangeorders-h3'>Amount : {Orders.amount} {Orders.currency}</h3>
                                    <h3 className='Myexchangeorders-h3'>Date : {date[1]}/{date[2]}/{date[3]}</h3>
                                    <h3 className='Myexchangeorders-h3'>Status : {Orders.status}</h3>
                                    <div className='Myexchangeorders-viewbutton'>
                                        <button onClick={()=>set(Orders.id)} className='Myexchangeorders-btn'>View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Myexchangeorders
