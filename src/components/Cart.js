import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase-config';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {

    const [scroll, setScroll] = useState(true);

    const [myCartProducts, setMyCartProducts] = useState([]);
    const [search, setSearch] = useState("");

    const filteredOrders = myCartProducts.filter(or => or.productName.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {

        const getCart = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            const q2 = query(collection(db, "Cart"), where("uId", "==", user.uid));
            const data = await getDocs(q2);
            setMyCartProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getCart();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll])

    let navigate = useNavigate();

    const deleteItem = async (id) => {
        const item = doc(db, "Cart", id);
        await deleteDoc(item).then(() => {
            alert("Item removed successfully");
            navigate('/mycart')
        }).catch((err) => {
            alert(err)
        })
    }

    const set = (id) => {
        navigate('/mycartbuynow', { state: { cartID: id } });
    }

    return (
        <>
            <h1 className='adminmarketplaceorderslist-h1'>My Cart</h1>
            <br></br>
            <div className='adminmarketplaceorderslist-filter'>
                <input onChange={(e) => setSearch(e.target.value)} placeholder="Search by Product Name" type="text" />
                <br></br>
                <br></br>
            </div>
            {filteredOrders.map((cartPro) => {
                return (
                    <>
                        <div className='mycart-column'>

                            <div className='mycart-card'>
                                <div className='mycart-image'>
                                    <img alt='image1' className='mycart-img' src={cartPro.imageURL} />
                                </div>
                                <div className='mycart-h2andh3andbutton'>
                                    <>
                                        <h2 className='mycart-h2'>{cartPro.productName}</h2>
                                        <h3 className='mycart-h3'>{cartPro.productPrice} &nbsp;USDT</h3>
                                    </>
                                    <h3 className='mycart-h3'>Quantity&nbsp; = &nbsp; {cartPro.qty}</h3>
                                    <h3 className='mycart-h3'>Shipping&nbsp; = &nbsp; {cartPro.shippingMethod} &nbsp; USDT</h3>
                                    <h3 className='mycart-h3'>Total&nbsp; = &nbsp; {cartPro.productPrice * cartPro.qty + cartPro.shippingMethod * cartPro.qty}&nbsp; USDT</h3>
                                    <div className='mycart-viewbuttonandbuynowbutton'>
                                        <button onClick={() => { deleteItem(cartPro.id) }}>Remove</button>&nbsp;&nbsp;
                                        <button onClick={() => set(cartPro.id)}>Buy Now</button>
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

export default Cart
