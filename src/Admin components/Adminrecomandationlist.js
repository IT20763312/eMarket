import React, { useState, useEffect } from 'react';
import './Adminrecomandationlist.css';
import { db } from '../Firebase-config';
import { collection, getDocs, query, where, doc , updateDoc } from 'firebase/firestore';

function Adminrecomandationlist() {

    const [recomandations, setRecomandations] = useState([]);
    const [filter, setFilter] = useState("All");

    const [scroll, setScroll] = useState(true);

    var ref;

    if (filter === "All") {
        const recomandationCollectionRef = query(collection(db, "recomandations"));
        ref = recomandationCollectionRef;
    } else {
        const recomandationCollectionRef = query(collection(db, "recomandations"), where("read", "==", filter));
        ref = recomandationCollectionRef;
    }

    useEffect(() => {
        const getRecomandations = async () => {
            const data = await getDocs(ref);
            setRecomandations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getRecomandations();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, ref])

    const set = async (id) => {
        const orderDoc = doc(db, "recomandations", id);
        const newFields = { read: "True" };
        await updateDoc(orderDoc, newFields);
        alert("Recomandation Read ! ");
    }

    return (
        <>
        <h1 className='Adminrecomandationlist-h1'>Customer Recomandations</h1>
            <br></br>
            <div className='Adminrecomandationlist-filter'>
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="False">Un-Read</option>
                    <option value="True">Read</option>
                </select>
            </div>
            <div className='Adminrecomandationlist-main'>
                <table className='Adminrecomandationlist-table'>
                    <tr>
                        <th className='Adminrecomandationlist-th'>Rec ID</th>
                        <th className='Adminrecomandationlist-th'>Email</th>
                        <th className='Adminrecomandationlist-th'>Recomandation</th>
                        <th className='Adminrecomandationlist-th'>Action</th>
                    </tr>
                    {recomandations.map((rec) => {
                        return (
                            <>
                                <tr>
                                    <td className='Adminrecomandationlist-td'>{rec.id}</td>
                                    <td className='Adminrecomandationlist-td'>{rec.email}</td>
                                    <td className='Adminrecomandationlist-td'>{rec.recomandation}</td>
                                    <td className='Adminrecomandationlist-td'>
                                        {rec.read === "False" ? (<>
                                            <button onClick={() => set(rec.id)}>Read</button>
                                        </>) : (<>Read</>)}

                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default Adminrecomandationlist
