import React, { useState, useEffect } from 'react'
import './Myexchangeorders.css'
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Myexchangeorders() {

    const [scroll, setScroll] = useState(true);

    const [myOrdersExchanges, setMyOrdersExchanges] = useState([]);
    const [order, setOrder] = useState("All");

    const auth = getAuth();
    const user = auth.currentUser;

    var ref;

    if (order === "All") {
        const ordersCollectionRef = query(collection(db, "exchangeOrders"), where("uId", "==", user.uid));
        ref = ordersCollectionRef;
    } else {
        const ordersCollectionRef = query(collection(db, "exchangeOrders"), where("uId", "==", user.uid), where("status", "==", order));
        ref = ordersCollectionRef;
    }

    useEffect(() => {

        const getOrders = async () => {
            const data = await getDocs(ref);
            setMyOrdersExchanges(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, ref])

    const navigate = useNavigate();
    const set = (id) => {
        navigate('/myexchangeorderdetails', { state: { exchangeID: id } });
    }

    return (
        <>
            <h1 className='adminmarketplaceorderslist-h1'>My Orders</h1>
            <br></br>
            <div className='adminmarketplaceorderslist-filter'>
                <select onChange={(e) => setOrder(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Payment Confirmed">Payment Confirmed</option>
                    <option value="Exchange Released">Exchange Released</option>
                </select>
                <br></br>
            </div>
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
                                        <button onClick={() => set(Orders.id)} className='Myexchangeorders-btn'>View Details</button>
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
