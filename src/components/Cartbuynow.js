import React, { useState, useEffect } from 'react';
import './Cartbuynow.css';
import { collection, query, where, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase-config';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';

function Cartbuynow() {

    let today = new Date().toLocaleDateString();

    const location = useLocation();
    const [scroll, setScroll] = useState(true);

    const [CartbuynowProducts, setCartbuynowProducts] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState(0);
    const [street, setStreet] = useState("");
    const [optional, setOptional] = useState("");
    const [stateOrProvince, setStateOrProvince] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [currencySymbol, setCurrencySymbol] = useState("");
    const [transactionId, setTransactionId] = useState("");

    const q2 = query(collection(db, "Cart"), where("__name__", "==", location.state.cartID));

    useEffect(() => {
        const getCurrencies = async () => {
            const q1 = collection(db, "currencies");
            const data = await getDocs(q1);
            setCurrencies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        const getCart = async () => {
            const data = await getDocs(q2);
            setCartbuynowProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }

        getCart();
        getCurrencies();
    }, [scroll, q2])

    let navigate = useNavigate()

    const order = async (id,productId, variation, quantity, totalPrice, shipping, image, productName, link) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (country === "") {
            alert("Please enter the Country!")
        } else if (name === "") {
            alert("Please enter the Name!")
        } else if (telephoneNumber === 0) {
            alert("Please enter the Mobile Number!")
        } else if (street === "") {
            alert("Please enter the Street/House No!")
        } else if (stateOrProvince === "") {
            alert("Please enter the State/Province!")
        } else if (city === "") {
            alert("Please enter the City!")
        } else if (zipCode === "") {
            alert("Please enter the Zipcode!")
        } else if (transactionId === "") {
            alert("Please enter the payment Transaction ID!")
        } else {
            const uid = user.uid;
            addDoc(collection(db, "marketplaceOrders"), {
                uId: uid,
                productId: productId,
                country: country,
                name: name,
                mobileNumber: telephoneNumber,
                streetHouseNo: street,
                optional: optional,
                stateOrProvince: stateOrProvince,
                city: city,
                zipCode: zipCode,
                currencyZymbol: currencySymbol,
                transactionId: transactionId,
                orderStatus: "Pending",
                date: Date(today),
                qty: Number(quantity),
                variation: variation,
                total: Number(totalPrice),
                shippingPrice: Number(shipping),
                trackingNumber: "",
                image: image,
                productName: productName,
                aliLink: link,
            }).then(() => {
                const item = doc(db, "Cart", id);
                deleteDoc(item).then(() => {
                    alert("Product ordered Successfully!");
                    navigate("/mymarketplaceorders")
                }).catch((err) => {
                    alert(err);
                })
            }).catch((err) => {
                alert(err);
            })
        }
    }

    return (
        <>
            {CartbuynowProducts.map((cartPro) => {
                return (
                    <div className='Cartbuynow'>
                        <div className='Cartbuynow-inner'>
                            <h2 className='Cartbuynow-h2'>Checkout</h2>
                            <br></br>
                            <div>
                                <hr></hr>
                                <h3 className='Cartbuynow-h3'>Shipping Details</h3>
                            </div>
                            <br></br>
                            <div className='Cartbuynow-input'>
                                <input required type='text' placeholder='Country' onChange={(event) => (setCountry(event.target.value))}></input>
                            </div>
                            <div className='Cartbuynow-contactnumberandname'>
                                <div className='Cartbuynow-input'>
                                    <input required type='text' placeholder='Contact Name' onChange={(event) => (setName(event.target.value))}></input>
                                </div>
                                <div className='Cartbuynow-input'>
                                    <input required type='number' placeholder='Mobile Number' onChange={(event) => (setTelephoneNumber(event.target.value))}></input>
                                </div>
                            </div>
                            <div className='Cartbuynow-contactnumberandname'>
                                <div className='Cartbuynow-input'>
                                    <input required type='text' placeholder='Street/House No' onChange={(event) => (setStreet(event.target.value))}></input>
                                </div>
                                <div className='Cartbuynow-input'>
                                    <input type='text' placeholder='Apt/Suite (Optional)' onChange={(event) => (setOptional(event.target.value))}></input>
                                </div>
                            </div>
                            <div className='Cartbuynow-contactnumberandname'>
                                <div className='Cartbuynow-input'>
                                    <input required type='text' placeholder='Province/State' onChange={(event) => (setStateOrProvince(event.target.value))}></input>
                                </div>
                                <div className='Cartbuynow-input'>
                                    <input required type='text' placeholder='City' onChange={(event) => (setCity(event.target.value))}></input>
                                </div>
                            </div>
                            <div className='Cartbuynow-input'>
                                <input required type='text' placeholder='ZipCode' onChange={(event) => (setZipCode(event.target.value))}></input>
                            </div>
                            <div>
                                <hr></hr>
                                <h3 className='Cartbuynow-h3'>Payment Details</h3>
                            </div>
                            <br></br>
                            <h4 className='Cartbuynow-h4'>Pay Via</h4>
                            <div className='Cartbuynow-select'>
                                <select onChange={(event) => (setCurrencySymbol(event.target.value))} placeholder='Select a coin'>
                                    <option value={""} >Select a Currency</option>
                                    {currencies.map((curr) => {
                                        return (
                                            <option value={curr.currencySymbol}>{curr.currencySymbol}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>

                                {currencies.filter(curr => curr.currencySymbol === currencySymbol).map(filteredCurr => (
                                    <>
                                        <h3 className='Cartbuynow-h3'>Please send total worth of <b> {(cartPro.productPrice * cartPro.qty) + (cartPro.shippingMethod * cartPro.qty)}</b> USDT to below Address</h3>
                                        <h2 className='Cartbuynow-h2'>{filteredCurr.currencyWalletId}</h2>
                                        <h2 className='products-h2'>Network : {filteredCurr.currencyNetwork}</h2>
                                        <div className='products-qr'>
                                            <QRCode
                                                title={filteredCurr.currencySymbol}
                                                value={filteredCurr.currencyWalletId}
                                                bgColor='#FFFFFF'
                                                fgColor='#000000'
                                                size={200}
                                            />
                                        </div>
                                    </>
                                ))}

                            </div>
                            <br></br>
                            <div className='Cartbuynow-input'>
                                <input required type='text' placeholder='Transaction ID of the payment' onChange={(event) => (setTransactionId(event.target.value))}></input>
                            </div>
                            <div className='Cartbuynow-input'>
                                <button onClick={() => order(cartPro.id, cartPro.productId, cartPro.variation, cartPro.qty, ((cartPro.productPrice * cartPro.qty) + (cartPro.shippingMethod * cartPro.qty)), cartPro.shippingMethod, cartPro.imageURL, cartPro.productName, cartPro.aliLink)}>Order</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Cartbuynow
