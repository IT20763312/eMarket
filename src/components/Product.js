import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, where, getDocs, query, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Product.css';

function Products({ isAuth }) {

    const location = useLocation();
    let navigate = useNavigate();
    let today = new Date().toLocaleDateString();

    const [product, setProduct] = useState([]);
    const [imageNumber, setImageNumber] = useState(0);
    const [qty, setQty] = useState(0);
    const [variationSelected, setVariationSelected] = useState("");
    const [shippingSelected, setShippingSelected] = useState(0);
    const [imageURL, setImageURL] = useState("");

    const q = query(collection(db, "Products"), where("__name__", "==", location.state.productId));

    useEffect(() => {
        const getProduct = async () => {
            const data = await getDocs(q);
            setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getProduct();
    })

    const addToCart = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (isAuth) {
            if (qty <= 0) {
                alert("Please add the quantity")
            }
            else if(shippingSelected===0){
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
                                        <button onClick={() => addToCart()} className='products-buttons'>Add to cart</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <button className='products-buttons'>Buy now</button>
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
