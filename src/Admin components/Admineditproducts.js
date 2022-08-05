import React, { useState, useEffect } from 'react'
import './Admineditproducts.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';

function Admineditproducts() {

    const location = useLocation();

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [shippingOptionOne, setShippingOptionOne] = useState("");
    const [shippingOptionOnePrice, setShippingOptionOnePrice] = useState(0);
    const [shippingOptionTwo, setShippingOptionTwo] = useState("");
    const [shippingOptionTwoPrice, setShippingOptionTwoPrice] = useState(0);
    const [shippingOptionThree, setShippingOptionThree] = useState("");
    const [shippingOptionThreePrice, setShippingOptionThreePrice] = useState(0);
    const [variations, setVariations] = useState("");
    const [aliexpressLink, setAliexpressLink] = useState("");

    const q = query(collection(db, "Products"), where("__name__", "==", location.state.productId));

    useEffect(() => {
        const getProduct = async () => {
            const data = await getDocs(q);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getProduct();
    })

    const setEditableProduct = async (id, name, description, price, optionOne, optionOnePrice, optionTwo, optionTwoPrice, optionThree, optionThreePrice, variations, link) => {
        setProductId(id);
        setTitle(name);
        setDescription(description);
        setProductPrice(price);
        setShippingOptionOne(optionOne);
        setShippingOptionOnePrice(optionOnePrice);
        setShippingOptionTwo(optionTwo);
        setShippingOptionTwoPrice(optionTwoPrice);
        setShippingOptionThree(optionThree);
        setShippingOptionThreePrice(optionThreePrice);
        setVariations(variations);
        setAliexpressLink(link);
    }

    const editProducts = async () => {
        let confirmAction = window.confirm("Are you Sure to update the product ?");
        if (confirmAction) {
            const productDoc = doc(db, "Products", productId)
            const newFields = { productName: title, productDescription: description, productPrice: Number(productPrice), shippingOptionOne: shippingOptionOne, shippingOptionTwo: shippingOptionTwo, shippingOptionThree: shippingOptionThree, shippingOptionOnePrice: Number(shippingOptionOnePrice), shippingOptionTwoPrice: Number(shippingOptionTwoPrice), shippingOptionThreePrice: Number(shippingOptionThreePrice), variations: variations, aliLink: aliexpressLink };
            await updateDoc(productDoc, newFields);
            alert("Product Updated!");
        } else {
            alert("Canceled!");
        }
    }

    let navigate = useNavigate();

    const deleteProducts = async (id) => {
        let confirmAction = window.confirm("Are you Sure to delete the product ?");
        if (confirmAction) {
            const item = doc(db, "Products", id);
            await deleteDoc(item).then(() => {
                alert("Product removed successfully!");
                navigate('/admincategorieslist')
            }).catch((err) => {
                alert(err)
            })
        } else{
            alert("Canceled!")
        }
    }


    return (
        <>
            {products.map((pro) => {
                return (


                    <div className="admineditproducts-form-main">
                        <div className="admineditproducts-form-sub-main">
                            <div className="admineditproducts-form-sub-sub-main">
                                <div className='admineditproducts-form-details'>
                                    <h1 className='admineditproducts-form-heading'>Edit Product</h1>
                                </div>
                                <div className="admineditproducts-form-signup-button">
                                    <button onClick={() => setEditableProduct(pro.id, pro.productName, pro.productDescription, pro.productPrice, pro.shippingOptionOne, pro.shippingOptionOnePrice, pro.shippingOptionTwo, pro.shippingOptionTwoPrice, pro.shippingOptionThree, pro.shippingOptionThreePrice, pro.variations, pro.aliLink)} className='admineditproducts-form-button'>Show Editable Fields</button>
                                </div>
                                <div className='admineditproducts-form-details'>
                                    <input defaultValue={title} required name='title' type="text" placeholder="Product Title" className="admineditproducts-form-name" onChange={(event) => (setTitle(event.target.value))} />
                                </div>
                                <div className='admineditproducts-form-details'>
                                    <textarea defaultValue={description} required name='description' placeholder="Product Description" className="admineditproducts-form-name" onChange={(event) => (setDescription(event.target.value))} />
                                </div>
                                <div className='admineditproducts-form-details'>
                                    <input Value={productPrice} required name='price' step={0.01} type="number" placeholder='Product Price' className="admineditproducts-form-name" onChange={(event) => (setProductPrice(event.target.value))} />
                                </div>
                                <hr></hr>
                                <br></br>
                                <h1 className='admineditproducts-form-heading'>Shipping Details</h1>
                                <div className='admineditproducts-form-details'>
                                    <select required onChange={(event) => (setShippingOptionOne(event.target.value))}>
                                        <option value={shippingOptionOne}>{shippingOptionOne}</option>
                                        <option value="Economy Shipping">Economy Shipping</option>
                                        <option value="Standard Shipping">Standard Shipping</option>
                                        <option value="Expedited Shipping">Expedited Shipping</option>
                                    </select>
                                </div>
                                <div className='admineditproducts-form-details'>
                                    <input Value={shippingOptionOnePrice} required name='optiononeprice' step={0.01} type="number" placeholder='Option One Price' className="admineditproducts-form-name" onChange={(event) => (setShippingOptionOnePrice(event.target.value))} />
                                </div>
                                <div className='admineditproducts-form-details'>
                                    <select required onChange={(event) => (setShippingOptionTwo(event.target.value))}>
                                        <option value={shippingOptionTwo}>{shippingOptionTwo}</option>
                                        <option value="Economy Shipping">Economy Shipping</option>
                                        <option value="Standard Shipping">Standard Shipping</option>
                                        <option value="Expedited Shipping">Expedited Shipping</option>
                                    </select>
                                </div>
                                <div className='admineditproducts-form-details'>
                                    <input Value={shippingOptionTwoPrice} required name='optiontwoprice' step={0.01} type="number" placeholder='Option Two Price' className="admineditproducts-form-name" onChange={(event) => (setShippingOptionTwoPrice(event.target.value))} />
                                </div>
                                <div className='admineditproducts-form-details'>
                                    <select required onChange={(event) => (setShippingOptionThree(event.target.value))}>
                                        <option value={shippingOptionThree}>{shippingOptionThree}</option>
                                        <option value="Economy Shipping">Economy Shipping</option>
                                        <option value="Standard Shipping">Standard Shipping</option>
                                        <option value="Expedited Shipping">Expedited Shipping</option>
                                    </select>
                                </div>
                                <div className='admineditproducts-form-details'>
                                    <input Value={shippingOptionThreePrice} required name='optionthreeprice' step={0.01} type="number" placeholder='Option Three Price' className="admineditproducts-form-name" onChange={(event) => (setShippingOptionThreePrice(event.target.value))} />
                                </div>
                                <hr></hr>
                                <br></br>
                                <h1 className='admineditproducts-form-heading'>Product Variations</h1>
                                <div className='admineditproducts-form-details'>
                                    <textarea defaultValue={variations} required placeholder='Variations' className="admineditproducts-form-name" onChange={(event) => (setVariations(event.target.value))} />
                                </div>
                                <hr></hr>
                                <br></br>
                                <div className='admineditproducts-form-details'>
                                    <input defaultValue={aliexpressLink} required name='aliexpressLink' type="text" placeholder='AliExpress Product Link' className="admineditproducts-form-name" onChange={(event) => (setAliexpressLink(event.target.value))} />
                                </div>
                                <br></br>
                                <div className="admineditproducts-form-signup-button">
                                    <button onClick={editProducts} className='admineditproducts-form-button'>Edit Product</button>
                                </div>
                                <div className="admineditproducts-form-signup-button">
                                    <button onClick={() => deleteProducts(pro.id)} className='admineditproducts-form-button'>Delete Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Admineditproducts
