import React, { useEffect, useState } from 'react'
import { db } from '../Firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './Adminmarketplaceorderslist.css'
import {useNavigate} from 'react-router-dom'

function Adminmarketplaceorderslist() {

    const [orders, setOrders] = useState([]);

    const [scroll, setScroll] = useState(true);

    const ordersCollectionRef = collection(db, "marketplaceOrders");

    useEffect(() => {
        const getOrders = async () => {
            const data = await getDocs(ordersCollectionRef);
            setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    },[scroll,ordersCollectionRef])

    const navigate = useNavigate();
    const set = (id) =>{
        navigate('/adminmarketplaceorderdetails', { state: { orderID: id} });
      }

    return (
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
                {orders.map((order) => {
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
    )
}

export default Adminmarketplaceorderslist
