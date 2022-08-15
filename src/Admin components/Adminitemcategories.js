import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase-config';
import { getDocs, collection,query,orderBy } from 'firebase/firestore';
import './Adminitemcategories.css'

function Adminitemcategories() {

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    const categoriesCollectionRef = query(collection(db, "categories"),orderBy("categoryName"));

    useEffect(() => {
        const getCategories = async () => {
            const data = await getDocs(categoriesCollectionRef);
            setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getCategories();
    });

    const filteredCategories = categories.filter(category => category.categoryName.toLowerCase().includes(search.toLowerCase()))

    const navigate = useNavigate();
    const toProductList = (id) => {
        navigate('/adminproductlist', { state: { categoryId: id } });
    }

    return (
        <>
            <div className="adminitemcategory-search">
                <br></br>
                <br></br>
                <h1 className="adminitemcategory-text">Search a Category</h1>

                <input type="text" placeholder="Search" className="adminitemcategory-input" onChange={(event) => { setSearch(event.target.value); }} />

            </div>
            <div className='adminitemcategories-row'>
                {filteredCategories.map((cate) => {
                    return (
                        <div className='adminitemcategories-column'>
                            <div onClick={() => { toProductList(cate.id) }}>
                                <div className='adminitemcategories-card'>
                                    <h3 className='adminitemcategories-h3'>{cate.categoryName}</h3>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Adminitemcategories
