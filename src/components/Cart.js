import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase-config';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Buynowpopup from './Popup/Buynowpopup';

function Cart() {

    const [myCartProducts, setMyCartProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const [buttonPopup, setButtonPopup] = useState(false);

    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState(0);
    const [street, setStreet] = useState("");
    const [optional, setOptional] = useState("");
    const [stateOrProvince, setStateOrProvince] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");


    useEffect(() => {
        const getCart = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            const q = query(collection(db, "Cart"), where("uId", "==", user.uid));
            const data = await getDocs(q);
            setMyCartProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getCart();
    })

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

    return (
        <>
            {myCartProducts.map((cartPro) => {
                {
                    var productPrice;
                    var qty;
                    var shipping;
                    qty = cartPro.qty;
                    shipping = cartPro.shippingMethod;
                    const getProduct = async () => {
                        const q = query(collection(db, "Products"), where("__name__", "==", cartPro.productId));
                        const data = await getDocs(q);
                        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    }
                    getProduct();
                }
                return (
                    <>
                        <div className='mycart-column'>

                            <div className='mycart-card'>
                                <div className='mycart-image'>
                                    <img alt='image1' className='mycart-img' src={cartPro.imageURL} />
                                </div>
                                <div className='mycart-h2andh3andbutton'>
                                    {products.map((pro) => {
                                        {
                                            productPrice = pro.productPrice;
                                        }
                                        return (<>
                                            <h2 className='mycart-h2'>{pro.productName}</h2>
                                            <h3 className='mycart-h3'>{pro.productPrice} &nbsp;USDT</h3>
                                        </>
                                        )
                                    })}
                                    <h3 className='mycart-h3'>Quantity&nbsp; = &nbsp; {cartPro.qty}</h3>
                                    <h3 className='mycart-h3'>Shipping&nbsp; = &nbsp; {cartPro.shippingMethod} &nbsp; USDT</h3>
                                    <h3 className='mycart-h3'>Total&nbsp; = &nbsp; {(productPrice * qty) + (shipping * qty)}&nbsp; USDT</h3>
                                    <div className='mycart-viewbuttonandbuynowbutton'>
                                        <button onClick={() => { deleteItem(cartPro.id) }}>Remove</button>&nbsp;&nbsp;
                                        <button onClick={() => setButtonPopup(true)}>Buy Now</button>
                                        <Buynowpopup setTrigger={setButtonPopup} trigger={buttonPopup}>
                                            <h2 className='mycart-h2'>Checkout</h2>
                                            <br></br>
                                            <div>
                                                <hr></hr>
                                                <h3 className='mycart-h3'>Shipping Details</h3>
                                            </div>
                                            <br></br>
                                            <div className='mycart-input'>
                                                <input type='text' placeholder='Country'></input>
                                            </div>
                                            <div className='mycart-contactnumberandname'>
                                                <div className='mycart-input'>
                                                    <input type='text' placeholder='Contact Name'></input>
                                                </div>
                                                <div className='mycart-input'>
                                                    <input type='number' placeholder='Mobile Number'></input>
                                                </div>
                                            </div>
                                            <div className='mycart-contactnumberandname'>
                                                <div className='mycart-input'>
                                                    <input type='text' placeholder='Street/House No'></input>
                                                </div>
                                                <div className='mycart-input'>
                                                    <input type='text' placeholder='Apt/Suite (Optional)'></input>
                                                </div>
                                            </div>
                                            <div className='mycart-contactnumberandname'>
                                                <div className='mycart-input'>
                                                    <input type='text' placeholder='Province/State'></input>
                                                </div>
                                                <div className='mycart-input'>
                                                    <input type='text' placeholder='City'></input>
                                                </div>
                                            </div>
                                            <div className='mycart-input'>
                                                <input type='text' placeholder='ZipCode'></input>
                                            </div>
                                            <div>
                                                <hr></hr>
                                                <h3 className='mycart-h3'>Payment Details</h3>
                                            </div>
                                            <br></br>
                                            <h4 className='mycart-h4'>Pay Via</h4>
                                            <div className='mycart-select'>
                                            <select placeholder='Select a coin'>
                                                <option></option>
                                            </select>
                                            </div>
                                            <div className='mycart-input'>
                                                <input type='text' placeholder='Transaction ID'></input>
                                            </div>
                                        </Buynowpopup>
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
