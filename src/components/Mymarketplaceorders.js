import React, { useEffect, useState } from 'react';
import './Mymarketplaceorders.css';
import {useNavigate} from 'react-router-dom'
import { db } from '../Firebase-config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';


function Mymarketplaceorders() {

    const [myOrdersProducts, setMyOrdersProducts] = useState([]);

    const [scroll, setScroll] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            const q1 = query(collection(db, "marketplaceOrders"), where("uId", "==", user.uid));
            const data = await getDocs(q1);
            setMyOrdersProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    },[scroll])

    const navigate = useNavigate();
    const set = (id) =>{
      navigate('/mymarketplaceordersdetails', { state: { orderID: id} });
    }

    return (
        <>
            {myOrdersProducts.map((Orders) => {

                return (
                    <>
                        <div className='mymarketplaceorders-column'>

                            <div className='mymarketplaceorders-card'>

                                <div className='mymarketplaceorders-image'>
                                    <img alt='image1' className='mymarketplaceorders-img' src={Orders.image} />
                                </div>


                                <div className='mymarketplaceorders-h2andh3andbutton'>
                                    <>
                                        <h2 className='mymarketplaceorders-h2'>{Orders.productName}</h2>
                                    </>

                                    <h3 className='mymarketplaceorders-h3'>Quantity&nbsp; = &nbsp; {Orders.qty}</h3>
                                    <h3 className='mymarketplaceorders-h3'>Shipping Price&nbsp; = &nbsp; {Orders.shippingPrice}</h3>
                                    <h3 className='mymarketplaceorders-h3'>Total&nbsp; = &nbsp; {Orders.total}&nbsp; USDT</h3>
                                    <h3 className='mymarketplaceorders-h3'>Order Status&nbsp; : &nbsp; {Orders.orderStatus}</h3>
                                    <div className='mymarketplaceorders-viewbuttonandbuynowbutton'>
                                        <button onClick={()=>set(Orders.id)}>View</button>
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
