import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, where, getDocs, query } from 'firebase/firestore';
import './Adminproduct.css';

function Adminproduct() {

    const location = useLocation();

    const [product, setProduct] = useState([]);
    const [imageNumber, setImageNumber] = useState(0);

    const q = query(collection(db, "Products"), where("__name__", "==", location.state.productId));

    useEffect(() => {
        const getProduct = async () => {
            const data = await getDocs(q);
            setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getProduct();
    })

    const navigate = useNavigate();
    const toEditProduct = (id) => {
        navigate('/admineditproducts', { state: { productId: id } });
    }

    return (
        <>
            {product.map((pro) => {
                const variations = pro.variations.split(" ");


                return (
                    <>
                        <div className='adminproducts-main'>
                            <div>
                                <div className='adminproducts-mainimage'>
                                    <img className='adminproducts-img' src={pro.imageURLs[imageNumber]} alt='mainimage' />
                                </div>
                                <div className='adminproducts-images'>
                                    <img onClick={() => setImageNumber(0)} className='adminproducts-imgset' src={pro.imageURLs[0]} alt='image1' />
                                    <img onClick={() => setImageNumber(1)} className='adminproducts-imgset' src={pro.imageURLs[1]} alt='image2' />
                                    <img onClick={() => setImageNumber(2)} className='adminproducts-imgset' src={pro.imageURLs[2]} alt='image3' />
                                    <img onClick={() => setImageNumber(3)} className='adminproducts-imgset' src={pro.imageURLs[3]} alt='image4' />
                                    <img onClick={() => setImageNumber(4)} className='adminproducts-imgset' src={pro.imageURLs[4]} alt='image5' />
                                </div>
                            </div>
                            <div className='adminproducts-details'>
                                <h1 className='adminproducts-h1'>{pro.productName}</h1>
                                <p className='adminproducts-p'>{pro.productDescription}</p>
                                <p className='adminproducts-price'>{pro.productPrice}&nbsp;USDT</p>
                                <div>
                                    <h2 className='adminproducts-h1'>Variations</h2>
                                    <br></br>
                                    {!variations[0] ? (
                                        <>
                                            <h4 className='adminproducts-h1'>No Variations</h4>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                {variations.map((i) => (
                                                    <>
                                                        <input className='adminproducts-variations' id={i} type='radio' name='variations' value={i} />
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
                                                <input className='adminproducts-shipping' id={pro.shippingOptionOnePrice} type='radio' name='shipping' value={pro.shippingOptionOnePrice} />
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
                                                <input className='adminproducts-shipping' id={pro.shippingOptionTwoPrice} type='radio' name='shipping' value={pro.shippingOptionTwoPrice} />
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
                                                <input className='adminproducts-shipping' id={pro.shippingOptionThreePrice} type='radio' name='shipping' value={pro.shippingOptionThreePrice} />
                                                <label >{pro.shippingOptionThree} = </label>
                                                <label >{pro.shippingOptionThreePrice} USDT</label>
                                            </div>
                                        )}
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div>
                                        <button onClick={() => { toEditProduct(pro.id) }} className='adminproducts-buttons'>Edit</button>
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

export default Adminproduct
