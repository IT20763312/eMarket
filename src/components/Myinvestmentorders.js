import React, { useEffect, useState } from 'react'
import './Myinvestmentorders.css'
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Myinvestmentorders() {

    const [scroll, setScroll] = useState(true);

    const [myOrdersInvestments, setMyOrdersInvestments] = useState([]);
    const [order, setOrder] = useState("All");

    const auth = getAuth();
    const user = auth.currentUser;

    var ref;

    if (order === "All") {
        const ordersCollectionRef = query(collection(db, "investmentOrders"), where("Uid", "==", user.uid));
        ref = ordersCollectionRef;
    } else {
        const ordersCollectionRef = query(collection(db, "investmentOrders"), where("Uid", "==", user.uid), where("investmentPlanStatus", "==", order));
        ref = ordersCollectionRef;
    }

    useEffect(() => {

        const getOrders = async () => {
            const data = await getDocs(ref);
            setMyOrdersInvestments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, ref])

    const navigate = useNavigate();
    const set = (id) => {
        navigate('/myinvestmentorderdetails', { state: { investmentID: id } });
    }

    return (
        <>
            <h1 className='Admininvestmentorderslist-h1'>Investment Orders</h1>
            <br></br>
            <div className='adminmarketplaceorderslist-filter'>
                <select onChange={(e) => setOrder(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Payment Confirmed">Payment Confirmed</option>
                    <option value="Active">Active</option>
                    <option value="Plan Over">Plan Over</option>
                </select>
            </div>
            <div className='Myinvestmentorders-row'>
                {myOrdersInvestments.map((Orders) => {
                    return (
                        <div className='Myinvestmentorders-column'>
                            <div className='Myinvestmentorders-card'>
                                <div className='Myinvestmentorders-h1-main'>
                                    <h1 className='Myinvestmentorders-h1'>{Orders.currencySymbol}</h1>
                                </div>
                                <div className='Myinvestmentorders-h2andh3andbutton'>
                                    <h2 className='Myinvestmentorders-h2'>{Orders.investAmount}&nbsp;{Orders.currencySymbol}</h2>
                                    <h3 className='Myinvestmentorders-h3'>Status : {Orders.investmentPlanStatus}</h3>
                                    <div className='Myinvestmentorders-viewbutton'>
                                        <button className='Myinvestmentorders-btn' onClick={() => set(Orders.id)}>View Details</button>
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

export default Myinvestmentorders
