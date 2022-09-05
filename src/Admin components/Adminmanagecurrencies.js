import React, { useState } from 'react'
import './Adminmanagecurrencies.css'
import { db } from '../Firebase-config'
import { addDoc, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

function Adminmanagecurrencies() {

    const [currencyName, setCurrencyName] = useState("");
    const [currencySymbol, setCurrencySymbol] = useState("");
    const [currencyNetwork, setCurrencyNetwork] = useState("");
    const [currencyWalletId, setCurrencyWalletId] = useState("");
    const [currencyCode, setCurrencyCode] = useState("");
    const [exchangeProfit, setExchangeProfit] = useState();
    const [exchangeMinAmount, setExchangeMinAmount] = useState();
    const [exchangeMaxAmount, setExchangeMaxAmount] = useState();

    const [editCurrencyId, setEditCurrencyId] = useState("");
    const [editCurrencyName, setEditCurrencyName] = useState("");
    const [editCurrencySymbol, setEditCurrencySymbol] = useState("");
    const [editCurrencyNetwork, setEditCurrencyNetwork] = useState("");
    const [editCurrencyWalletId, setEditCurrencyWalletId] = useState("");
    const [editCurrencyCode, setEditCurrencyCode] = useState("");
    const [editExchangeProfit, setEditExchangeProfit] = useState();
    const [editExchangeMinAmount, setEditExchangeMinAmount] = useState();
    const [editExchangeMaxAmount, setEditExchangeMaxAmount] = useState();

    const [editableCurrencies, setEditableCurrencies] = useState([]);

    const currenciesCollectionRef = collection(db, "currencies");

    const addCurrencies = async () => {
        if (currencyName === "") {
            alert("Please enter the currency name")
        } else if (currencySymbol === "") {
            alert("Please enter the currecy symbol")
        } else if (currencyNetwork === "") {
            alert("Please enter the currency netwok")
        } else if (currencyWalletId === "") {
            alert("Please enter the wallet ID")
        } else if (currencyCode === "") {
            alert("Please enter the currency code")
        } else if (exchangeProfit === null) {
            alert("Please enter the exchange profit")
        } else if (exchangeMinAmount === null) {
            alert("Please enter the min exchange amount")
        } else if (exchangeMaxAmount === null) {
            alert("Please enter the max exchange amount")
        } else {
            await addDoc(currenciesCollectionRef, { maxAmount: Number(exchangeMaxAmount), minAmount: Number(exchangeMinAmount), profit: Number(exchangeProfit), currencyName: currencyName, currencySymbol: currencySymbol, currencyNetwork: currencyNetwork, currencyWalletId: currencyWalletId, currencyCode: currencyCode });
            alert("New currency Added!");
        }
    }

    const getEditableCurrencies = async () => {
        const data = await getDocs(currenciesCollectionRef);
        setEditableCurrencies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getEditableCurrency = async (id, name, symbol, network, walletId, code, profit, min, max) => {
        setEditCurrencyId(id);
        setEditCurrencyName(name);
        setEditCurrencySymbol(symbol);
        setEditCurrencyNetwork(network);
        setEditCurrencyWalletId(walletId);
        setEditCurrencyCode(code);
        setEditExchangeProfit(profit);
        setEditExchangeMinAmount(min);
        setEditExchangeMaxAmount(max);
    };

    const editCurrencies = async () => {
        if (editCurrencyName === "") {
            alert("Please enter the currency name")
        } else if (editCurrencySymbol === "") {
            alert("Please enter the currecy symbol")
        } else if (editCurrencyNetwork === "") {
            alert("Please enter the currency netwok")
        } else if (editCurrencyWalletId === "") {
            alert("Please enter the wallet ID")
        } else if (editCurrencyCode === "") {
            alert("Please enter the currency code")
        } else if (editExchangeProfit === null) {
            alert("Please enter the exchange profit")
        } else if (editExchangeMinAmount === null) {
            alert("Please enter the min exchange amount")
        } else if (editExchangeMaxAmount === null) {
            alert("Please enter the max exchange amount")
        } else {
            const currencyDoc = doc(db, "currencies", editCurrencyId)
            const newFields = { maxAmount: Number(editExchangeMaxAmount), minAmount: Number(editExchangeMinAmount), profit: Number(editExchangeProfit), currencyName: editCurrencyName, currencySymbol: editCurrencySymbol, currencyNetwork: editCurrencyNetwork, currencyWalletId: editCurrencyWalletId, currencyCode: editCurrencyCode };
            await updateDoc(currencyDoc, newFields);
            alert("Currency Updated");
        }
    }

    return (
        <>
            <div className="admincurrencies-form-main">
                <div className="admincurrencies-form-sub-main">
                    <div className="admincurrencies-form-sub-sub-main">

                        <div className='admincurrencies-form-details'>
                            <h1 className='admincurrencies-form-heading'>Add Currency</h1>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Name" className="admincurrencies-form-name" onChange={(event) => { setCurrencyName(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Symbol" className="admincurrencies-form-name" onChange={(event) => { setCurrencySymbol(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Network" className="admincurrencies-form-name" onChange={(event) => { setCurrencyNetwork(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Wallet Id" className="admincurrencies-form-name" onChange={(event) => { setCurrencyWalletId(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="text" placeholder="Currency Code" className="admincurrencies-form-name" onChange={(event) => { setCurrencyCode(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="number" placeholder="Profit in percentage" className="admincurrencies-form-name" onChange={(event) => { setExchangeProfit(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="number" placeholder="Exchange Min Amount" className="admincurrencies-form-name" onChange={(event) => { setExchangeMinAmount(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input name='currency' type="number" placeholder="Exchange Max Amount" className="admincurrencies-form-name" onChange={(event) => { setExchangeMaxAmount(event.target.value); }} />
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
                                <input defaultValue={editCurrencyName} name='Editcurrency' type="text" placeholder="Edit Currency Name" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencyName(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencySymbol} name='Editcurrency' type="text" placeholder="Edit Currency Symbol" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencySymbol(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencyNetwork} name='Editcurrency' type="text" placeholder="Edit Currency Network" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencyNetwork(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencyWalletId} name='Editcurrency' type="text" placeholder="Edit Currency Wallet Id" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencyWalletId(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input defaultValue={editCurrencyCode} name='Editcurrency' type="text" placeholder="Edit Currency Wallet Id" className="admincurrencies-form-name" onChange={(event) => { setEditCurrencyCode(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input Value={editExchangeProfit} name='Editcurrency' type="number" placeholder="Profit in percentage" className="admincurrencies-form-name" onChange={(event) => { setEditExchangeProfit(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input Value={editExchangeMinAmount} name='Editcurrency' type="number" placeholder="Exchange Min Amount" className="admincurrencies-form-name" onChange={(event) => { setEditExchangeMinAmount(event.target.value); }} />
                            </div>
                            <div className='admincurrencies-form-details'>
                                <input Value={editExchangeMaxAmount} name='Editcurrency' type="number" placeholder="Exchange Max Amount" className="admincurrencies-form-name" onChange={(event) => { setEditExchangeMaxAmount(event.target.value); }} />
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
                                <button onClick={() => getEditableCurrency(curr.id, curr.currencyName, curr.currencySymbol, curr.currencyNetwork, curr.currencyWalletId, curr.currencyCode, curr.profit, curr.minAmount, curr.maxAmount)}>Edit</button>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    )
}

export default Adminmanagecurrencies
