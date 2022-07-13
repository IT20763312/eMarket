import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../Firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import './Itemcategories.css'

function Itemcategories() {

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const categoriesCollectionRef = collection(db, "categories");

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCategories();
  });

  const filteredCategories = categories.filter(category => category.categoryName.toLowerCase().includes(search.toLowerCase()))

  const navigate = useNavigate();
  const toProductList=(id)=>{
    navigate('/productlist',{state:{categoryId:id}});
  }

  return (
    <>
      <div className="itemcategory-search">
        <br></br>
        <Link to='/mycart'>
        <p>My Cart</p>
        </Link>
        <br></br>
        <br></br>
        <h1 className="itemcategory-text">Search a Category</h1>

        <input type="text" placeholder="Search" className="itemcategory-input" onChange={(event) => { setSearch(event.target.value); }} />

      </div>
      <div className='itemcategories-row'>
        {filteredCategories.map((cate) => {
          return (
            <div className='itemcategories-column'>
              <div onClick={()=>{toProductList(cate.id)}}>
                <div className='itemcategories-card'>
                  <h3 className='itemcategories-h3'>{cate.categoryName}</h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Itemcategories
