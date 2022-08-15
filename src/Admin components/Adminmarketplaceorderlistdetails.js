import React, { useState, useEffect } from 'react';
import './Adminmarketplaceorderlistdetails.css';
import { collection, where, getDocs, query, doc, updateDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { db } from '../Firebase-config';

function Adminmarketplaceorderlistdetails() {

    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [scroll, setScroll] = useState(true);

    const [orderStatus, setOrderStatus] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");

    const ordersCollectionRef = query(collection(db, "marketplaceOrders"), where("__name__", "==", location.state.orderID));

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
    }, [scroll, ordersCollectionRef])

    const editTrackingNo = async (id) => {
        if (trackingNumber === "") {
            alert("Please add the tracking number!")
        } else {
            const orderDoc = doc(db, "marketplaceOrders", id)
            const newFields = { trackingNumber: trackingNumber };
            await updateDoc(orderDoc, newFields);
            alert("Tracking Updated");
        }
    }

    const editOrderStatus = async (id) => {
        if (orderStatus === "") {
            alert("Please Select An Order Status")
        } else {
            const orderDoc = doc(db, "marketplaceOrders", id);
            const newFields = { orderStatus: orderStatus };
            await updateDoc(orderDoc, newFields);
            alert("Order status updated!");
        }
    }

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
            {orders.map((order) => {
                return (
                    <div className='Adminmarketplaceorderlistdetails'>
                        <div className='Adminmarketplaceorderlistdetails-inner'>
                            <h2 className='Adminmarketplaceorderlistdetails-h2'>Order Details</h2>
                            <hr></hr>
                            <label className='Adminmarketplaceorderlistdetails-label'>Order ID : {order.id}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Product ID : {order.productId}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Paid Via : {order.currencyZymbol}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Qty : {order.qty}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Shipping : {order.shippingPrice}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Total : {order.total} USDT</label>
                            <br></br>
                            <label onClick={() => copyToClipBoard(order.transactionId)} className='Adminmarketplaceorderlistdetails-label'>Transaction ID : {order.transactionId}</label>&nbsp;<a href='https://www.binance.com/en/my/wallet/history/deposit-crypto' target="_blank" rel="noopener noreferrer">check</a>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>User ID : {order.uId}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Order Date : {order.date}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Variation : {order.variation}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Ali Link : {order.aliLink}</label>&nbsp;<a href={order.aliLink} target="_blank" rel="noopener noreferrer">Go</a>
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <h2 className='Adminmarketplaceorderlistdetails-h2'>Shipping Details</h2>
                            <hr></hr>
                            <label className='Adminmarketplaceorderlistdetails-label'>Customer Name : {order.name}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Mobile No : {order.mobileNumber}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Country : {order.country}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>State or Province : {order.stateOrProvince}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>City : {order.city}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Street/House No : {order.streetHouseNo}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>Optional Address : {order.optional}</label>
                            <br></br>
                            <label className='Adminmarketplaceorderlistdetails-label'>ZipCode : {order.zipCode}</label>
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <h2 className='Adminmarketplaceorderlistdetails-h2'>Add tracking No</h2>
                            <hr></hr>
                            <br></br>
                            <div className='Adminmarketplaceorderlistdetails-input'>
                                <input defaultValue={order.trackingNumber} onChange={(event) => (setTrackingNumber(event.target.value))} type='text' placeholder='Tracking No'></input>
                            </div>
                            <br></br>
                            <br></br>
                            <div className='Adminmarketplaceorderlistdetails-btn'>
                                <button onClick={() => editTrackingNo(order.id)} className='Admininvestmentorderlistdetails-button'>Add Tracking</button>
                            </div>
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <h2 className='Adminmarketplaceorderlistdetails-h2'>Order Status</h2>
                            <hr></hr>
                            <br></br>
                            <div className='Adminmarketplaceorderlistdetails-input'>
                                <select onChange={(event) => (setOrderStatus(event.target.value))}>
                                    <option>{order.orderStatus}</option>
                                    <option value="Payment Confirmed">Payment Confirmed</option>
                                    <option value="Order Confirmed">Order Confirmed</option>
                                    <option value="Ready to Ship">Ready to Ship</option>
                                    <option value="Shipped">Shipped</option>
                                </select>
                            </div>
                            <br></br>
                            <br></br>
                            <div className='Adminmarketplaceorderlistdetails-btn'>
                                <button onClick={() => editOrderStatus(order.id)} className='Admininvestmentorderlistdetails-button'>Edit Status</button>
                            </div>
                            <br></br>
                            <br></br>
                            <hr></hr>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Adminmarketplaceorderlistdetails
