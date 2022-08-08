import React, { useState } from 'react'
import './Adminmanagecurrencies.css'
import {db} from '../Firebase-config'
import {addDoc, collection, getDocs, doc, updateDoc} from 'firebase/firestore';

function Adminmanagecurrencies() {

    const [currencyName,setCurrencyName] = useState("");
    const [currencySymbol,setCurrencySymbol] = useState("");
    const [currencyNetwork,setCurrencyNetwork] = useState("");
    const [currencyWalletId,setCurrencyWalletId] = useState("");
    const [currencyCode,setCurrencyCode] = useState("");

    const [editCurrencyId, setEditCurrencyId] = useState("");
    const [editCurrencyName,setEditCurrencyName] = useState("");
    const [editCurrencySymbol,setEditCurrencySymbol] = useState("");
    const [editCurrencyNetwork,setEditCurrencyNetwork] = useState("");
    const [editCurrencyWalletId,setEditCurrencyWalletId] = useState("");
    const [editCurrencyCode,setEditCurrencyCode] = useState("");

    const [editableCurrencies,setEditableCurrencies] = useState([]);

    const currenciesCollectionRef = collection(db, "currencies");

    const addCurrencies = async () => {
        await addDoc(currenciesCollectionRef, { currencyName: currencyName, currencySymbol: currencySymbol, currencyNetwork: currencyNetwork, currencyWalletId: currencyWalletId, currencyCode:currencyCode });
        alert("New currency Added!");
    }

    const getEditableCurrencies = async () => {
        const data = await getDocs(currenciesCollectionRef);
        setEditableCurrencies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getEditableCurrency = async (id,name,symbol,network,walletId,code) => {
        setEditCurrencyId(id);
        setEditCurrencyName(name);
        setEditCurrencySymbol(symbol);
        setEditCurrencyNetwork(network);
        setEditCurrencyWalletId(walletId);
        setEditCurrencyCode(code)
    };

    const editCurrencies = async () => {
        const currencyDoc = doc(db,"currencies",editCurrencyId)
        const newFields = { currencyName: editCurrencyName, currencySymbol: editCurrencySymbol, currencyNetwork: editCurrencyNetwork, currencyWalletId: editCurrencyWalletId, currencyCode:editCurrencyCode};
        await updateDoc(currencyDoc,newFields);
        alert("Currency Updated");
     } 

  return (
    <>
            <div className="admincurrencies-form-main">
                <div className="admincurrencies-form-sub-main">
                    <div className="admincurrencies-form-sub-sub-main">

                        <div className='admincurrencies-form-details'>
                            <h1 className='admincurrencies-form-heading'>Add Currency</h1>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Name" className="admincurrencies-form-name" onChange={(event) => { setCurrencyName(event.target.value); }}/>
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Symbol" className="admincurrencies-form-name" onChange={(event) => { setCurrencySymbol(event.target.value); }}/>
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Network" className="admincurrencies-form-name" onChange={(event) => { setCurrencyNetwork(event.target.value); }}/>
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Wallet Id" className="admincurrencies-form-name" onChange={(event) => { setCurrencyWalletId(event.target.value); }}/>
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Code" className="admincurrencies-form-name" onChange={(event) => { setCurrencyCode(event.target.value); }}/>
                            </div>
                            <div className="admincurrencies-form-signup-button">
                                <button onClick={addCurrencies} className='admincurrencies-form-button'>Add Currency</button>
                            </div>
                        </div>

                        <div className='admincurrencies-form-details'>
                            <div className="admincurrencies-form-signup-button">
                                <button onClick={getEditableCurrencies} className='admincurrencies-form-button'>Show Editable Content</button>
                            </div>
                        </div>
                        <div className='admincurrencies-form-details'>
                            <h1 className='admincurrencies-form-heading'>Edit Currency</h1>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencyName} name='Editcurrency' type="text" placeholder="Edit Currency Name" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencyName(event.target.value); }}/>
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencySymbol} name='Editcurrency' type="text" placeholder="Edit Currency Symbol" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencySymbol(event.target.value); }}/>
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencyNetwork} name='Editcurrency' type="text" placeholder="Edit Currency Network" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencyNetwork(event.target.value); }}/>
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencyWalletId} name='Editcurrency' type="text" placeholder="Edit Currency Wallet Id" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencyWalletId(event.target.value); }}/>
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencyCode} name='Editcurrency' type="text" placeholder="Edit Currency Wallet Id" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencyCode(event.target.value); }}/>
                            </div>
                            <div className="admincurrencies-form-signup-button">
                                <button onClick={editCurrencies} className='admincurrencies-form-button'>Edit Currency</button>
                            </div>

                        </div>

                    </div>


                </div>

            </div>

            <div>
                <br></br>
                <div className='admincurrencies-returns'>
                    <h2 className='admincurrencies-h2'>Currency Name</h2>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                {editableCurrencies.map((curr) => {
                    return (
                        <>
                            <div className='admincurrencies-returns'>
                            <h2 className='admincurrencies-h2'>{curr.currencyName}</h2>
                            <button onClick={()=>getEditableCurrency(curr.id,curr.currencyName,curr.currencySymbol,curr.currencyNetwork,curr.currencyWalletId,curr.currencyCode)}>Edit</button>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
  )
}

export default Adminmanagecurrencies
