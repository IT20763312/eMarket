import React, { useState, useEffect } from 'react';
import './Adminexchangeorderslist.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore';

function Adminexchangeorderslist() {

    const [scroll, setScroll] = useState(true);

    const [exchangeOrders, setExchangeOrders] = useState([]);
    const [order, setOrder] = useState("All");
    const [search, setSearch] = useState("");

    var ref;

    if (order === "All") {
        const ordersCollectionRef = query(collection(db, "exchangeOrders"));
        ref = ordersCollectionRef;
    } else {
        const ordersCollectionRef = query(collection(db, "exchangeOrders"), where("status", "==", order));
        ref = ordersCollectionRef;
    }

    const filteredOrders = exchangeOrders.filter(or => or.id.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const getExchanges = async () => {
            const data = await getDocs(ref);
            setExchangeOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getExchanges();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, ref])

    const navigate = useNavigate();
    const set = (id) => {
        navigate('/adminexchangeorderdetails', { state: { exchangeID: id } });
    }

    return (
        <>
            <h1 className='Adminexchangeorderslist-h1'>Exchange Orders</h1>
            <br></br>
            <div className='adminmarketplaceorderslist-filter'>
                <select onChange={(e) => setOrder(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Payment Confirmed">Payment Confirmed</option>
                    <option value="Exchange Released">Exchange Released</option>
                </select>
                &nbsp;
                <input onChange={(e) => setSearch(e.target.value)} placeholder="Search Exchange ID" type="text" />
            </div>
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
                    {filteredOrders.map((exchange) => {
                        return (
                            <>
                                <tr>
                                    <td className='Adminexchangeorderslist-td'>{exchange.id}</td>
                                    <td className='Adminexchangeorderslist-td'>{exchange.uId}</td>
                                    <td className='Adminexchangeorderslist-td'>{exchange.currency}</td>
                                    <td className='Adminexchangeorderslist-td'>{exchange.currencyTo}</td>
                                    <td className='Adminexchangeorderslist-td'>{exchange.status}</td>
                                    <td className='Adminexchangeorderslist-td'>
                                        <button onClick={() => set(exchange.id)}>View</button>
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
