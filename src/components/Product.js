import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, where, getDocs, query, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Product.css';
import Buynowpopup from './Popup/Buynowpopup';
import QRCode from 'react-qr-code';
import useGeoLocation from 'react-ipgeolocation';

function Products({ isAuth }) {

    const location = useLocation();
    const geoCountry = useGeoLocation();
    let navigate = useNavigate();
    let today = new Date().toLocaleDateString();

    const [product, setProduct] = useState([]);
    const [imageNumber, setImageNumber] = useState(0);
    const [qty, setQty] = useState(0);
    const [variationSelected, setVariationSelected] = useState("");
    const [shippingSelected, setShippingSelected] = useState(0);
    const [imageURL, setImageURL] = useState("");

    const [currencies, setCurrencies] = useState([]);

    const [buttonPopup, setButtonPopup] = useState(false);

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

    const q = query(collection(db, "Products"), where("__name__", "==", location.state.productId));

    const [scroll,setScroll] = useState(true);

    useEffect(() => {
        const getCurrencies = async () => {
            const q1 = collection(db, "currencies");
            const data = await getDocs(q1);
            setCurrencies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        const getProduct = async () => {
            const data = await getDocs(q);
            setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        if(scroll===true){
            window.scrollTo({top: 0, left: 0, behavior:'smooth'});
            setScroll(false);
          }
        getProduct();
        getCurrencies();
    },[scroll,q])

    const addToCart = (productName,link,price) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (isAuth) {
            if (qty <= 0) {
                alert("Please add the quantity")
            }
            else if (shippingSelected === 0) {
                alert("Please select a Shipping Method")
            } else {
                const uid = user.uid;
                addDoc(collection(db, "Cart"), {
                    uId: uid,
                    productId: location.state.productId,
                    qty: Number(qty),
                    variation: variationSelected,
                    shippingMethod: Number(shippingSelected),
                    date: Date(today),
                    imageURL: imageURL,
                    productName:productName,
                    aliLink:link,
                    productPrice: Number(price),
                })
                    .then(() => {
                        setShippingSelected(0);
                        setVariationSelected("");
                        setQty(0);
                        alert("Added to Cart");
                    })
                    .catch((err) => {
                        alert(err);
                    })
            }
        }
        else {
            navigate("/login")
        }
    }

    const order = async (productId, total, image, productName, link) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (isAuth) {
            if (qty <= 0) {
                alert("Please add the quantity")
            }
            else if (shippingSelected === 0) {
                alert("Please select a Shipping Method")
            } else if (country === "") {
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
                    qty: Number(qty),
                    variation: variationSelected,
                    shippingPrice: Number(shippingSelected),
                    total: Number(total),
                    trackingNumber: "",
                    image:image,
                    productName:productName,
                    aliLink:link,
                }).then(() => {

                    alert("Product ordered Successfully!");
                    navigate("/mymarketplaceorders")

                }).catch((err) => {
                    alert(err);
                })
            }
        } else {
            navigate("/login")
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
            {product.map((pro) => {
                const variations = pro.variations.split(" ");


                return (
                    <>
                        <div className='products-main'>
                            <div>
                                <div className='products-mainimage'>
                                    <img className='products-img' src={pro.imageURLs[imageNumber]} alt='mainimage' />
                                </div>
                                <div className='products-images'>
                                    <img onLoad={() => setImageURL(pro.imageURLs[0])} onClick={() => setImageNumber(0)} className='products-imgset' src={pro.imageURLs[0]} alt='image1' />
                                    <img onClick={() => setImageNumber(1)} className='products-imgset' src={pro.imageURLs[1]} alt='image2' />
                                    <img onClick={() => setImageNumber(2)} className='products-imgset' src={pro.imageURLs[2]} alt='image3' />
                                    <img onClick={() => setImageNumber(3)} className='products-imgset' src={pro.imageURLs[3]} alt='image4' />
                                    <img onClick={() => setImageNumber(4)} className='products-imgset' src={pro.imageURLs[4]} alt='image5' />
                                </div>
                            </div>
                            <div className='products-details'>
                                <h1 className='products-h1'>{pro.productName}</h1>
                                <p className='products-p'>{pro.productDescription}</p>
                                <p className='products-price'>{pro.productPrice}&nbsp;USDT</p>
                                <div className='products-qty'>
                                    <input className='products-input' placeholder='Quantity' type='number' onChange={(event) => { setQty(event.target.value); }}></input>
                                </div>
                                <div>
                                    <h2 className='products-h1'>Variations</h2>
                                    <br></br>
                                    {!variations[0] ? (
                                        <>
                                            <h4 className='products-h1'>No Variations</h4>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                {variations.map((i) => (
                                                    <>
                                                        <input className='products-variations' id={i} type='radio' name='variations' value={i} onChange={(event) => { setVariationSelected(event.target.value); }} />
                                                        <label htmlFor={i}>{i}</label>
                                                        <br></br>
                                                    </>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <br></br>
                                <div>
                                    <h2>Shipping details</h2>
                                    <br></br>
                                    <div>
                                        {!pro.shippingOptionOnePrice ? (
                                            <>

                                            </>
                                        ) : (
                                            <div>
                                                <input className='products-shipping' id={pro.shippingOptionOnePrice} type='radio' name='shipping' value={pro.shippingOptionOnePrice} onChange={(event) => { setShippingSelected(event.target.value); }} />
                                                <label >{pro.shippingOptionOne} = </label>
                                                <label >{pro.shippingOptionOnePrice} USDT</label>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {!pro.shippingOptionTwoPrice ? (
                                            <>

                                            </>
                                        ) : (
                                            <div>
                                                <input className='products-shipping' id={pro.shippingOptionTwoPrice} type='radio' name='shipping' value={pro.shippingOptionTwoPrice} onChange={(event) => { setShippingSelected(event.target.value); }} />
                                                <label >{pro.shippingOptionTwo} = </label>
                                                <label >{pro.shippingOptionTwoPrice} USDT</label>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {!pro.shippingOptionThreePrice ? (
                                            <>

                                            </>
                                        ) : (
                                            <div>
                                                <input className='products-shipping' id={pro.shippingOptionThreePrice} type='radio' name='shipping' value={pro.shippingOptionThreePrice} onChange={(event) => { setShippingSelected(event.target.value); }} />
                                                <label >{pro.shippingOptionThree} = </label>
                                                <label >{pro.shippingOptionThreePrice} USDT</label>
                                            </div>
                                        )}
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div>
                                        <button onClick={() => addToCart(pro.productName,pro.aliLink,pro.productPrice)} className='products-buttons'>Add to cart</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <button onClick={() => setButtonPopup(true)} className='products-buttons'>Buy now</button>
                                        <Buynowpopup setTrigger={setButtonPopup} trigger={buttonPopup}>
                                            <h2 className='products-h2'>Checkout</h2>
                                            <br></br>
                                            <div>
                                                <hr></hr>
                                                <h3 className='products-h3'>Shipping Details</h3>
                                            </div>
                                            <br></br>
                                            <div className='products-inputs'>
                                                <input defaultValue={geoCountry.country} required type='text' placeholder='Country' onChange={(event) => (setCountry(event.target.value))}></input>
                                            </div>
                                            <div className='products-contactnumberandname'>
                                                <div className='products-inputs'>
                                                    <input required type='text' placeholder='Contact Name' onChange={(event) => (setName(event.target.value))}></input>
                                                </div>
                                                <div className='products-inputs'>
                                                    <input required type='number' placeholder='Mobile Number' onChange={(event) => (setTelephoneNumber(event.target.value))}></input>
                                                </div>
                                            </div>
                                            <div className='products-contactnumberandname'>
                                                <div className='products-inputs'>
                                                    <input required type='text' placeholder='Street/House No' onChange={(event) => (setStreet(event.target.value))}></input>
                                                </div>
                                                <div className='products-inputs'>
                                                    <input type='text' placeholder='Apt/Suite (Optional)' onChange={(event) => (setOptional(event.target.value))}></input>
                                                </div>
                                            </div>
                                            <div className='products-contactnumberandname'>
                                                <div className='products-inputs'>
                                                    <input required type='text' placeholder='Province/State' onChange={(event) => (setStateOrProvince(event.target.value))}></input>
                                                </div>
                                                <div className='products-inputs'>
                                                    <input required type='text' placeholder='City' onChange={(event) => (setCity(event.target.value))}></input>
                                                </div>
                                            </div>
                                            <div className='products-inputs'>
                                                <input required type='text' placeholder='ZipCode' onChange={(event) => (setZipCode(event.target.value))}></input>
                                            </div>
                                            <div>
                                                <hr></hr>
                                                <h3 className='products-h3'>Payment Details</h3>
                                            </div>
                                            <br></br>
                                            <h4 className='products-h4'>Pay Via</h4>
                                            <div className='products-select'>
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
                                                        <h3 className='products-h3'>Please send total worth of {(pro.productPrice * qty) + (shippingSelected * qty)} USDT to below Address</h3>
                                                        <h2 onClick={() => copyToClipBoard(filteredCurr.currencyWalletId)} className='products-h2'>{filteredCurr.currencyWalletId}</h2>
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
                                            <div className='products-inputs'>
                                                <input required type='text' placeholder='Transaction ID of the payment' onChange={(event) => (setTransactionId(event.target.value))}></input>
                                            </div>
                                            <button onClick={() => order(location.state.productId, (((pro.productPrice * qty) + (shippingSelected * qty))),pro.imageURLs[0],pro.productName,pro.aliLink)}>Order</button>
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

export default Products
