import React, { useState } from 'react'
import './Adminmanagecategories.css';
import { db } from '../Firebase-config';
import { addDoc, collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';


function Adminmanagecategories() {

    const [category, setCategory] = useState("");
    const [editcategory, setEditCategory] = useState("");
    const [editcategoryId, setEditCategoryId] = useState("");
    const [editcategoryName, setEditCategoryName] = useState("");

    const [editableCategories, setEditableCategories] = useState([])

    const categoriesCollectionRef = query(collection(db, "categories"), orderBy("categoryName"));

    const q1 = query(collection(db, "categories"))

    const addCategories = async () => {
        if (category === "") {
            alert("Please enter a category");
        } else {
            await addDoc(q1, { categoryName: category });
            alert("New category created!");
        }
    }

    const editCategories = async () => {
        if (editcategory === "") {
            alert("Please enter the edit category");
        } else {
            const categoryDoc = doc(db, "categories", editcategoryId)
            const newFields = { categoryName: editcategory };
            await updateDoc(categoryDoc, newFields);
            alert("Category Edited");
        }
    }

    const getEditableCategories = async () => {
        const data = await getDocs(categoriesCollectionRef);
        setEditableCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getEditableCategory = async (id, name) => {
        setEditCategoryName(name);
        setEditCategoryId(id);
    };

    return (
        <>
            <div className="admincategories-form-main">
                <div className="admincategories-form-sub-main">
                    <div className="admincategories-form-sub-sub-main">

                        <div className='admincategories-form-details'>
                            <h1 className='admincategories-form-heading'>Add Category</h1>
                            <div className='admincategories-form-details'>
                                <input name='category' type="text" placeholder="Category" className="admincategories-form-name" onChange={(event) => { setCategory(event.target.value); }} />

                            </div>
                            <div className="admincategories-form-signup-button">
                                <button onClick={addCategories} className='admincategories-form-button'>Add Category</button>
                            </div>

                        </div>

                        <div className='admincategories-form-details'>
                            <div className="admincategories-form-signup-button">
                                <button onClick={getEditableCategories} className='admincategories-form-button'>Show Editable Content</button>
                            </div>
                        </div>
                        <div className='admincategories-form-details'>
                            <h1 className='admincategories-form-heading'>Edit Category</h1>
                            <div className='admincategories-form-details'>
                                <input defaultValue={editcategoryName} name='Editcategory' type="text" placeholder="Edit Category Name" className="admincategories-form-name" onChange={(event) => { setEditCategory(event.target.value); }} />

                            </div>
                            <div className="admincategories-form-signup-button">
                                <button onClick={editCategories} className='admincategories-form-button'>Edit Category</button>
                            </div>

                        </div>

                    </div>


                </div>

            </div>

            <div>
                {editableCategories.map((cate) => {
                    return (
                        <>
                            <div className='admincategory-returns'>
                                <h2 className='admincategories-h2'>{cate.categoryName}</h2><button onClick={() => getEditableCategory(cate.id, cate.categoryName)}>Edit</button>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    )
}

export default Adminmanagecategories
