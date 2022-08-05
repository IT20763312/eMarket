import React, { useEffect, useState } from 'react';
import './Mymarketplaceordersdetails.css';
import { useLocation } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

function Mymarketplaceordersdetailsdetails() {

    const location = useLocation();

    const [myOrdersProducts, setMyOrdersProducts] = useState([]);

    const [scroll, setScroll] = useState(true);

    const q1 = query(collection(db, "marketplaceOrders"), where("__name__", "==", location.state.orderID));

    useEffect(() => {
        const getOrders = async () => {
            const data = await getDocs(q1);
            setMyOrdersProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    },[scroll,q1])

    const editOrderStatus = async (id) => {
        const orderDoc = doc(db, "marketplaceOrders", id);
        const newFields = { orderStatus: "Order Recieved Confirmed" };
        await updateDoc(orderDoc, newFields);
        alert("Order status updated!");
    }

    return (
        <>
            <>
            {myOrdersProducts.map((Orders) => {
                return (
                    <div className='Mymarketplaceordersdetails'>
                        <div className='Mymarketplaceordersdetails-inner'>
                        <>
                                                <img alt='image1' className='Mymarketplaceordersdetails-img' src={Orders.image} />
                                            </>

                                            <h2 className='Mymarketplaceordersdetails-h2'>Order Details</h2>
                                            <br></br>
                                            <hr></hr>
                                            <label className='Mymarketplaceordersdetails-label'>Order ID : {Orders.id}</label>
                                            <br></br>
                                            <label className='Mymarketplaceordersdetails-label'>Paid Via : {Orders.currencyZymbol}</label>
                                            <br></br>
                                            <label className='Mymarketplaceordersdetails-label'>Qty : {Orders.qty}</label>
                                            <br></br>
                                            <label className='Mymarketplaceordersdetails-label'>Shipping : {Orders.shippingPrice}</label>
                                            <br></br>
                                            <label className='Mymarketplaceordersdetails-label'>Total : {Orders.total} USDT</label>
                                            <br></br>
                                            <label className='Mymarketplaceordersdetails-label'>Transaction ID : {Orders.transactionId}</label>
                                            <br></br>
                                            <label className='Mymarketplaceordersdetails-label'>Variation : {Orders.variation}</label>
                                            <br></br>
                                            <label className='Mymarketplaceordersdetails-label'>Order Status : {Orders.orderStatus}</label>
                                            <br></br>
                                            <br></br>
                                            <hr></hr>
                                            <br></br>
                                            <h2 className='adminmarketplaceorderslist-h2'>Shipping Details</h2>
                                            <hr></hr>
                                            <label className='adminmarketplaceorderslist-label'>Customer Name : {Orders.name}</label>
                                            <br></br>
                                            <label className='adminmarketplaceorderslist-label'>Mobile No : {Orders.mobileNumber}</label>
                                            <br></br>
                                            <label className='adminmarketplaceorderslist-label'>Country : {Orders.country}</label>
                                            <br></br>
                                            <label className='adminmarketplaceorderslist-label'>State or Province : {Orders.stateOrProvince}</label>
                                            <br></br>
                                            <label className='adminmarketplaceorderslist-label'>City : {Orders.city}</label>
                                            <br></br>
                                            <label className='adminmarketplaceorderslist-label'>Street/House No : {Orders.streetHouseNo}</label>
                                            <br></br>
                                            <label className='adminmarketplaceorderslist-label'>Optional Address : {Orders.optional}</label>
                                            <br></br>
                                            <label className='adminmarketplaceorderslist-label'>ZipCode : {Orders.zipCode}</label>
                                            <br></br>
                                            <br></br>
                                            <hr></hr>
                                            <br></br>
                                            <h2 className='adminmarketplaceorderslist-h2'>Confirm Order Recieve</h2>
                                            <hr></hr>
                                            <br></br>
                                            <button onClick={() => editOrderStatus(Orders.id)} className='Mymarketplaceordersdetails-button'>Order Recieved</button>
                        </div>
                    </div>
                )
            })}
        </>
        </>
    )
}

export default Mymarketplaceordersdetailsdetails
