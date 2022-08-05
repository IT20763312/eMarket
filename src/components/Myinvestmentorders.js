import React, { useEffect, useState } from 'react'
import './Myinvestmentorders.css'
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Myinvestmentorders() {

    const [scroll, setScroll] = useState(true);

    const [myOrdersInvestments, setMyOrdersInvestments] = useState([]);

    useEffect(() => {

        const getOrders = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            const q1 = query(collection(db, "investmentOrders"), where("Uid", "==", user.uid));
            const data = await getDocs(q1);
            setMyOrdersInvestments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll])

    const navigate = useNavigate();
    const set = (id) =>{
      navigate('/myinvestmentorderdetails', { state: { investmentID: id} });
    }

    return (
        <>
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
