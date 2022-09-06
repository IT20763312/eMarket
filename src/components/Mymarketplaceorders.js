import React, { useEffect, useState } from 'react';
import './Mymarketplaceorders.css';
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase-config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';


function Mymarketplaceorders() {

    const [myOrdersProducts, setMyOrdersProducts] = useState([]);
    const [order, setOrder] = useState("All");

    const [scroll, setScroll] = useState(true);

    const auth = getAuth();
    const user = auth.currentUser;

    var ref;

    if (order === "All") {
        const ordersCollectionRef = query(collection(db, "marketplaceOrders"), where("uId", "==", user.uid));
        ref = ordersCollectionRef;
    } else {
        const ordersCollectionRef = query(collection(db, "marketplaceOrders"), where("uId", "==", user.uid), where("orderStatus", "==", order));
        ref = ordersCollectionRef;
    }

    useEffect(() => {
        const getOrders = async () => {
            const data = await getDocs(ref);
            setMyOrdersProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, ref])

    const navigate = useNavigate();
    const set = (id) => {
        navigate('/mymarketplaceordersdetails', { state: { orderID: id } });
    }

    const product = (id) =>{
        navigate('/products',{state:{productId:id}});
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
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Ready to Ship">Ready to Ship</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Order Recieved Confirmed">Order Recieved Confirmed</option>
                </select>
                <br></br>
                <br></br>
            </div>
            {myOrdersProducts.map((Orders) => {

                return (
                    <>
                        <div className='mymarketplaceorders-column'>

                            <div className='mymarketplaceorders-card'>

                                <div className='mymarketplaceorders-image'>
                                    <img onClick={()=>product(Orders.productId)} alt='image1' className='mymarketplaceorders-img' src={Orders.image} />
                                </div>


                                <div className='mymarketplaceorders-h2andh3andbutton'>
                                    <>
                                        <h2 onClick={()=>product(Orders.productId)} className='mymarketplaceorders-h2'>{Orders.productName}</h2>
                                    </>

                                    <h3 className='mymarketplaceorders-h3'>Quantity&nbsp; = &nbsp; {Orders.qty}</h3>
                                    <h3 className='mymarketplaceorders-h3'>Shipping Price&nbsp; = &nbsp; {Orders.shippingPrice}</h3>
                                    <h3 className='mymarketplaceorders-h3'>Total&nbsp; = &nbsp; {Orders.total}&nbsp; USDT</h3>
                                    <h3 className='mymarketplaceorders-h3'>Order Status&nbsp; : &nbsp; {Orders.orderStatus}</h3>
                                    <div className='mymarketplaceorders-viewbuttonandbuynowbutton'>
                                        <button onClick={() => set(Orders.id)}>View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default Mymarketplaceorders
