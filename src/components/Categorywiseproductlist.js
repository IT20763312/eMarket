import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../Firebase-config';
import './Categorywiseproductlist.css';

function Categorywiseproductlist() {

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
    navigate('/products', { state: { productId: id } });
  }

  return (
    <>
      <div className="categorywiseproductlist-search">
        <br></br>
        <br></br>
        <h1 className="categorywiseproductlist-text">Search a Product</h1>

        <input type="text" placeholder="Search" className="categorywiseproductlist-input" onChange={(event) => { setSearch(event.target.value); }} />

      </div>
      <div className='categorywiseproductlist-row'>
        {filteredProducts.map((pro) => {
          return (
            <div className='categorywiseproductlist-column'>

              <div className='categorywiseproductlist-card'>
                <div className='categorywiseproductlist-image'>
                  <img alt='image1' className='categorywiseproductlist-img' src={pro.imageURLs[0]} />
                </div>
                <div className='categorywiseproductlist-h2andh3andbutton'>
                  <h2 className='categorywiseproductlist-h2'>{pro.productName}</h2>
                  <h3 className='categorywiseproductlist-h3'>{pro.productPrice} &nbsp;USDT</h3>
                  <div className='categorywiseproductlist-viewbutton'>
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

export default Categorywiseproductlist

