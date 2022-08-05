import React, { useState, useEffect } from 'react';
import './Admininvestmentorderslist.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config'
import { collection, getDocs, query } from 'firebase/firestore';

function Admininvestmentorderslist() {

    const [scroll, setScroll] = useState(true);

    const [investmentsOrders, setInvestmentsOrders] = useState([]);

    const q = query(collection(db, "investmentOrders"));

    useEffect(() => {
        const getInvestments = async () => {
            const data = await getDocs(q);
            setInvestmentsOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getInvestments();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    },[scroll,q])

    const navigate = useNavigate();
    const set = (id) =>{
        navigate('/admininvestmentorderdetails', { state: { investmentID: id} });
    }

    return (
        <>
        <h1 className='Admininvestmentorderslist-h1'>Investment Orders</h1>
            <div className='Admininvestmentorderslist-main'>
                
                <table className='Admininvestmentorderslist-table'>
                    <tr>
                        <th className='Admininvestmentorderslist-th'>ID</th>
                        <th className='Admininvestmentorderslist-th'>User ID</th>
                        <th className='Admininvestmentorderslist-th'>Currency Symbol</th>
                        <th className='Admininvestmentorderslist-th'>Invest Amount</th>
                        <th className='Admininvestmentorderslist-th'>Invest Status</th>
                        <th className='Admininvestmentorderslist-th'>Actions</th>
                    </tr>
                    {investmentsOrders.map((invest) => {
                        return (
                            <>
                                <tr>
                                    <td className='Admininvestmentorderslist-td'>{invest.id}</td>
                                    <td className='Admininvestmentorderslist-td'>{invest.Uid}</td>
                                    <td className='Admininvestmentorderslist-td'>{invest.currencySymbol}</td>
                                    <td className='Admininvestmentorderslist-td'>{invest.investAmount}</td>
                                    <td className='Admininvestmentorderslist-td'>{invest.investmentPlanStatus}</td>
                                    <td className='Admininvestmentorderslist-td'>
                                        <button onClick={()=>set(invest.id)}>View</button>
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

export default Admininvestmentorderslist
