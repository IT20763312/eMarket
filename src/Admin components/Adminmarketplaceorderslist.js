import React, { useEffect, useState } from 'react'
import { db } from '../Firebase-config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import './Adminmarketplaceorderslist.css'
import { useNavigate } from 'react-router-dom'

function Adminmarketplaceorderslist() {

    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState("All");
    const [search, setSearch] = useState("");

    const [scroll, setScroll] = useState(true);

    var ref;

    if(order==="All"){
        const ordersCollectionRef = query(collection(db, "marketplaceOrders"),orderBy("date"));
        ref = ordersCollectionRef;
    } else {
        const ordersCollectionRef = query(collection(db, "marketplaceOrders"), where("orderStatus", "==", order),orderBy("date"));
        ref = ordersCollectionRef;
    }

    const filteredOrders = orders.filter(or => or.id.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const getOrders = async () => {
            const data = await getDocs(ref);
            setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, ref])

    const navigate = useNavigate();
    const set = (id) => {
        navigate('/adminmarketplaceorderdetails', { state: { orderID: id } });
    }

    return (
        <>
            <div className='adminmarketplaceorderslist-filter'>
                <select onChange={(e) => setOrder(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Payment Confirmed">Payment Confirmed</option>
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Ready to Ship">Ready to Ship</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Order Recieved Confirmed">Order Recieved Confirmed</option>
                </select>
                &nbsp;
                <input onChange={(e)=>setSearch(e.target.value)} placeholder="Search Order ID" type="text"/>
            </div>
            <div className='adminmarketplaceorderslist-main'>
                <table className='adminmarketplaceorderslist-table'>
                    <tr>
                        <th className='adminmarketplaceorderslist-th'>Order ID</th>
                        <th className='adminmarketplaceorderslist-th'>Country</th>
                        <th className='adminmarketplaceorderslist-th'>Quantity</th>
                        <th className='adminmarketplaceorderslist-th'>Price</th>
                        <th className='adminmarketplaceorderslist-th'>Status</th>
                        <th className='adminmarketplaceorderslist-th'></th>
                    </tr>
                    {filteredOrders.map((order) => {
                        return (
                            <>
                                <tr>
                                    <td className='adminmarketplaceorderslist-td'>{order.id}</td>
                                    <td className='adminmarketplaceorderslist-td'>{order.country}</td>
                                    <td className='adminmarketplaceorderslist-td'>{order.qty}</td>
                                    <td className='adminmarketplaceorderslist-td'>{order.total}&nbsp;USDT</td>
                                    <td className='adminmarketplaceorderslist-td'>{order.orderStatus}</td>
                                    <td className='adminmarketplaceorderslist-td'>
                                        <button onClick={() => set(order.id)}>View</button>
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

export default Adminmarketplaceorderslist
