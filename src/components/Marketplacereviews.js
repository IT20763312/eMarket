import React, { useEffect, useState } from 'react';
import './Marketplacereviews.css';
import { useLocation } from 'react-router-dom'
import { db } from '../Firebase-config';
import { getDocs, collection, query, where, limit } from 'firebase/firestore';

function Marketplacereviews() {

    const location = useLocation();

    const [reviews, setReviews] = useState([]);

    const q1 = query(collection(db, "marketplaceReviews"), where("productId", "==", location.state.productId), limit(10));

    useEffect(() => {
        const getReviews = async () => {
            const data = await getDocs(q1);
            setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getReviews();
    }, [q1])

    return (
        <>
        <h1 className='Marketplacereviews-h1'>Customer Reviews</h1>
            {reviews === null ? (<>
                <h3 className='Marketplacereviews-h3'>No Reviews to Show</h3>
            </>) : (<>
                <div className='Marketplacereviews-row'>
                    {reviews.map((rev) => {
                        return (
                            <div className='Marketplacereviews-column'>
                                <div className='Marketplacereviews-card'>
                                    <h3 className='Marketplacereviews-h3'>{rev.review}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>)}
        </>
    )
}

export default Marketplacereviews
