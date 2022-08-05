import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../Firebase-config';
import './Admincategorywiseproductlist.css';

function Admincategorywiseproductlist() {

    const location = useLocation();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const q = query(collection(db, "Products"), where("categoryId", "==", location.state.categoryId));

    const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
        const getProductList = async () => {
            const data = await getDocs(q);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getProductList();
    })

    const navigate = useNavigate();
    const toProduct = (id) => {
        navigate('/adminproducts', { state: { productId: id } });
    }

    return (
        <>
            <div className="admincategorywiseproductlist-search">
                <br></br>
                <br></br>
                <h1 className="admincategorywiseproductlist-text">Search a Product</h1>

                <input type="text" placeholder="Search" className="admincategorywiseproductlist-input" onChange={(event) => { setSearch(event.target.value); }} />

            </div>
            <div className='admincategorywiseproductlist-row'>
                {filteredProducts.map((pro) => {
                    return (
                        <div className='admincategorywiseproductlist-column'>

                            <div className='admincategorywiseproductlist-card'>
                                <div className='admincategorywiseproductlist-image'>
                                    <img alt='image1' className='admincategorywiseproductlist-img' src={pro.imageURLs[0]} />
                                </div>
                                <div className='admincategorywiseproductlist-h2andh3andbutton'>
                                    <h2 className='admincategorywiseproductlist-h2'>{pro.productName}</h2>
                                    <h3 className='admincategorywiseproductlist-h3'>{pro.productPrice} &nbsp;USDT</h3>
                                    <div className='admincategorywiseproductlist-viewbutton'>
                                        <button onClick={() => { toProduct(pro.id) }}>View</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Admincategorywiseproductlist
