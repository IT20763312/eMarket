import React, { useState } from 'react'
import './Adminaddproduct.css';
import { storage, db } from '../Firebase-config';
import { ref, getDownloadURL, uploadBytes, } from 'firebase/storage';
import { addDoc, collection, getDocs, } from 'firebase/firestore';

function Adminaddproduct() {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]);
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

    const [urls, setUrls] = useState([]);

    const categoriesCollectionRef = collection(db, "categories");

    const getCategories = async () => {
        const data = await getDocs(categoriesCollectionRef);
        setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const addImages = () => {
        images.map((image) => {
            const uploadTask = ref(storage, `Products/${title}/${image.name}`);
            uploadBytes(uploadTask, image)
                .then((snapshot) => {
                    console.log(snapshot);
                    const downloadTask = ref(storage, `Products/${title}/${image.name}`);
                    getDownloadURL(downloadTask)
                        .then((url) => {
                            setUrls((prevState) => [...prevState, url]);
                            console.log(urls);
                        })
                        .catch((err) => {
                            alert(err);
                        })

                })
                .catch((err) => {
                    alert(err);
                })
            return (<></>);
        })
    };

    const setProduct = () => {
        addDoc(collection(db, "Products"), {
            categoryId: category,
            productName: title,
            imageURLs: urls,
            productDescription: description,
            productPrice: Number(productPrice),
            shippingOptionOne: shippingOptionOne,
            shippingOptionOnePrice: Number(shippingOptionOnePrice),
            shippingOptionTwo: shippingOptionTwo,
            shippingOptionTwoPrice: Number(shippingOptionTwoPrice),
            shippingOptionThree: shippingOptionThree,
            shippingOptionThreePrice: Number(shippingOptionThreePrice),
            variations: variations,
            aliLink: aliexpressLink
        })
            .then(() => {
                setCategory("");
                setTitle("");
                setImages([]);
                setUrls([]);
                setDescription("");
                setProductPrice(0);
                setShippingOptionOne("");
                setShippingOptionOnePrice(0);
                setShippingOptionTwo("");
                setShippingOptionTwoPrice(0);
                setShippingOptionThree("");
                setShippingOptionThreePrice(0);
                setVariations("");
                setAliexpressLink("");
            })
            .catch((err) => {
                alert(err);
            })
    }


    return (
        <>
            <div className="adminaddproducts-form-main">
                <div className="adminaddproducts-form-sub-main">
                    <div className="adminaddproducts-form-sub-sub-main">
                        <div className='adminaddproducts-form-details'>
                            <h1 className='adminaddproducts-form-heading'>Add Products</h1>
                            <select required onChange={(event) => (setCategory(event.target.value))}>
                                <option>Select Category</option>
                                {categories.map((cate) => {
                                    return (
                                        <option value={cate.id}>{cate.categoryName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <button onClick={getCategories}>Show</button>
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <input required name='title' type="text" placeholder="Product Title" className="adminaddproducts-form-name" onChange={(event) => (setTitle(event.target.value))} />
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <input required name='pictures' type="file" multiple className="adminaddproducts-form-name" onChange={handleChange} />
                        </div>
                        <div className="adminaddproducts-form-signup-button">
                        <button className='adminaddproducts-form-button'  onClick={addImages}>Set Images</button>
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <textarea required name='description' placeholder="Product Description" className="adminaddproducts-form-name" onChange={(event) => (setDescription(event.target.value))} />
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <input required name='price' step={0.01} type="number" placeholder='Product Price' className="adminaddproducts-form-name" onChange={(event) => (setProductPrice(event.target.value))} />
                        </div>
                        <hr></hr>
                        <br></br>
                        <h1 className='adminaddproducts-form-heading'>Shipping Details</h1>
                        <div className='adminaddproducts-form-details'>
                            <select required onChange={(event) => (setShippingOptionOne(event.target.value))}>
                                <option value="">Shipping-Option-One</option>
                                <option value="Economy Shipping">Economy Shipping</option>
                                <option value="Standard Shipping">Standard Shipping</option>
                                <option value="Expedited Shipping">Expedited Shipping</option>
                            </select>
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <input required name='optiononeprice' step={0.01} type="number" placeholder='Option One Price' className="adminaddproducts-form-name" onChange={(event) => (setShippingOptionOnePrice(event.target.value))} />
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <select required onChange={(event) => (setShippingOptionTwo(event.target.value))}>
                                <option value="">Shipping-Option-Two</option>
                                <option value="Economy Shipping">Economy Shipping</option>
                                <option value="Standard Shipping">Standard Shipping</option>
                                <option value="Expedited Shipping">Expedited Shipping</option>
                            </select>
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <input required name='optiontwoprice' step={0.01} type="number" placeholder='Option Two Price' className="adminaddproducts-form-name" onChange={(event) => (setShippingOptionTwoPrice(event.target.value))} />
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <select required onChange={(event) => (setShippingOptionThree(event.target.value))}>
                                <option value="">Shipping-Option-Three</option>
                                <option value="Economy Shipping">Economy Shipping</option>
                                <option value="Standard Shipping">Standard Shipping</option>
                                <option value="Expedited Shipping">Expedited Shipping</option>
                            </select>
                        </div>
                        <div className='adminaddproducts-form-details'>
                            <input required name='optionthreeprice' step={0.01} type="number" placeholder='Option Three Price' className="adminaddproducts-form-name" onChange={(event) => (setShippingOptionThreePrice(event.target.value))} />
                        </div>
                        <hr></hr>
                        <br></br>
                        <h1 className='adminaddproducts-form-heading'>Product Variations</h1>
                        <div className='adminaddproducts-form-details'>
                            <textarea required placeholder='Variations' className="adminaddproducts-form-name" onChange={(event) => (setVariations(event.target.value))} />
                        </div>
                        <hr></hr>
                        <br></br>
                        <div className='adminaddproducts-form-details'>
                            <input required name='aliexpressLink' type="text" placeholder='AliExpress Product Link' className="adminaddproducts-form-name" onChange={(event) => (setAliexpressLink(event.target.value))} />
                        </div>
                        <br></br>
                        <div className="adminaddproducts-form-signup-button">
                            <button className='adminaddproducts-form-button' onClick={setProduct}>Add Product</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Adminaddproduct
