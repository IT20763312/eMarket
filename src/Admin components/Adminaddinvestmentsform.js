import React, { useState } from 'react'
import './Adminaddinvestmentsform.css';
import { db } from '../Firebase-config'
import { addDoc, collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';

function Adminaddinvestmentsform() {

    const [currencySymbol, setCurrencySymbol] = useState("");
    const [investAmount, setInvestAmount] = useState(0);
    const [yearlyInterestRate, setYearlyInterestRate] = useState(0);
    const [monthlyInterestRate, setMonthlyInterestRate] = useState(0);
    const [investmentStatus, setInvestmentStatus] = useState("");

    const [editInvestmentId, setEditInvestmentId] = useState("");
    const [editcurrencySymbol, setEditCurrencySymbol] = useState("");
    const [editinvestAmount, setEditInvestAmount] = useState();
    const [edityearlyInterestRate, setEditYearlyInterestRate] = useState();
    const [editmonthlyInterestRate, setEditMonthlyInterestRate] = useState();

    const [editableInvestments, setEditableInvestements] = useState([]);

    const investmentsCollectionRef = collection(db, "investments");

    const addInvestment = async () => {
        await addDoc(investmentsCollectionRef, { currencySymbol: currencySymbol, investAmount: Number(investAmount), monthlyInterestRate: Number(monthlyInterestRate), yearlyInterestRate: Number(yearlyInterestRate), investmentStatus: investmentStatus });
        alert("New Investment Added!");
    }

    const q = query(collection(db, "investments"), orderBy("currencySymbol"), orderBy("investAmount"));

    const getEditableInvestments = async () => {
        const data = await getDocs(q);
        setEditableInvestements(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getEditableInvestment = async (id, symbol, amount, yearly, monthly) => {
        setEditInvestmentId(id);
        setEditCurrencySymbol(symbol);
        setEditInvestAmount(amount);
        setEditYearlyInterestRate(yearly);
        setEditMonthlyInterestRate(monthly);
    };

    const editInvestment = async () => {
        const investmentDoc = doc(db, "investments", editInvestmentId)
        const newFields = { currencySymbol: editcurrencySymbol, investAmount: Number(editinvestAmount), monthlyInterestRate: Number(editmonthlyInterestRate), yearlyInterestRate: Number(edityearlyInterestRate) };
        await updateDoc(investmentDoc, newFields);
        alert("Investment Updated");
    }

    const disable = async (id) => {
        const investmentDoc = doc(db, "investments", id)
        const newFields = { investmentStatus: "Disable" };
        await updateDoc(investmentDoc, newFields);
        alert("Investment Status Updated");
    }

    const active = async (id) => {
        const investmentDoc = doc(db, "investments", id)
        const newFields = { investmentStatus: "Active" };
        await updateDoc(investmentDoc, newFields);
        alert("Investment Status Updated");
    }

    return (
        <>

            <div className="adminaddinvestmentsform-form-main">
                <div className="adminaddinvestmentsform-form-sub-main">
                    <div className="adminaddinvestmentsform-form-sub-sub-main">

                        <div className='adminaddinvestmentsform-form-details'>
                            <h1 className='adminaddinvestmentsform-form-heading'>Add Investment</h1>
                            <div className='adminaddinvestmentsform-form-details'>
                                <input name='currency' type="text" placeholder="Currency Symbol" className="adminaddinvestmentsform-form-name" onChange={(event) => { setCurrencySymbol(event.target.value); }} />
                            </div>
                            <div className='adminaddinvestmentsform-form-details'>
                                <input name='currency' type="number" placeholder="Invest Amount" className="adminaddinvestmentsform-form-name" onChange={(event) => { setInvestAmount(event.target.value); }} />
                            </div>
                            <div className='adminaddinvestmentsform-form-details'>
                                <input name='currency' type="number" placeholder="Yearly Interest Rate Anually" className="adminaddinvestmentsform-form-name" onChange={(event) => { setYearlyInterestRate(event.target.value); }} />
                            </div>
                            <div className='adminaddinvestmentsform-form-details'>
                                <input name='currency' type="number" placeholder="Monthly Interest Rate Anually" className="adminaddinvestmentsform-form-name" onChange={(event) => { setMonthlyInterestRate(event.target.value); }} />
                            </div>
                            <div className='adminaddinvestmentsform-form-details'>
                                <select className="adminaddinvestmentsform-form-name" onChange={(event) => { setInvestmentStatus(event.target.value); }}>
                                    <option>Investment Status</option>
                                    <option value='Active'>Active</option>
                                    <option value='Disable'>Disable</option>
                                </select>
                            </div>
                            <div className="adminaddinvestmentsform-form-signup-button">
                                <button onClick={addInvestment} className='adminaddinvestmentsform-form-button'>Add Investment</button>
                            </div>
                        </div>

                        <div className='adminaddinvestmentsform-form-details'>
                            <div className="adminaddinvestmentsform-form-signup-button">
                                <button onClick={getEditableInvestments} className='adminaddinvestmentsform-form-button'>Show Editable Content</button>
                            </div>
                        </div>
                        <div className='adminaddinvestmentsform-form-details'>
                            <h1 className='adminaddinvestmentsform-form-heading'>Edit Investment</h1>
                            <div className='adminaddinvestmentsform-form-details'>
                                <input defaultValue={editcurrencySymbol} name='currency' type="text" placeholder="Currency Symbol" className="adminaddinvestmentsform-form-name" onChange={(event) => { setEditCurrencySymbol(event.target.value); }} />
                            </div>
                            <div className='adminaddinvestmentsform-form-details'>
                                <input value={editinvestAmount} name='currency' type="number" placeholder="Invest Amount" className="adminaddinvestmentsform-form-name" onChange={(event) => { setEditInvestAmount(event.target.value); }} />
                            </div>
                            <div className='adminaddinvestmentsform-form-details'>
                                <input value={edityearlyInterestRate} name='currency' type="number" placeholder="Yearly Interest Rate Anually" className="adminaddinvestmentsform-form-name" onChange={(event) => { setEditYearlyInterestRate(event.target.value); }} />
                            </div>
                            <div className='adminaddinvestmentsform-form-details'>
                                <input value={editmonthlyInterestRate} name='currency' type="number" placeholder="Monthly Interest Rate Anually" className="adminaddinvestmentsform-form-name" onChange={(event) => { setEditMonthlyInterestRate(event.target.value); }} />
                            </div>
                            <div className="adminaddinvestmentsform-form-signup-button">
                                <button onClick={editInvestment} className='admincurrencies-form-button'>Edit Investment</button>
                            </div>

                        </div>

                    </div>


                </div>

            </div>
            <div className='adminmarketplaceorderslist-main'>
                <table className='adminmarketplaceorderslist-table'>
                    <tr>
                        <th className='adminmarketplaceorderslist-th'>ID</th>
                        <th className='adminmarketplaceorderslist-th'>Currency Symbol</th>
                        <th className='adminmarketplaceorderslist-th'>Invest Amount</th>
                        <th className='adminmarketplaceorderslist-th'>Invest Status</th>
                        <th className='adminmarketplaceorderslist-th'>Actions</th>
                    </tr>
                    {editableInvestments.map((invest) => {
                        return (
                            <>
                                <tr>
                                    <td className='adminmarketplaceorderslist-td'>{invest.id}</td>
                                    <td className='adminmarketplaceorderslist-td'>{invest.currencySymbol}</td>
                                    <td className='adminmarketplaceorderslist-td'>{invest.investAmount}</td>
                                    <td className='adminmarketplaceorderslist-td'>{invest.investmentStatus}</td>
                                    <td className='adminmarketplaceorderslist-td'>
                                        <button onClick={() => getEditableInvestment(invest.id, invest.currencySymbol, invest.investAmount, invest.yearlyInterestRate, invest.monthlyInterestRate)}>Edit</button>
                                        {invest.investmentStatus === "Active" ? (<><button onClick={() => disable(invest.id)}>Disable</button></>) : (<><button onClick={() => active(invest.id)}>Active</button></>)}
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

export default Adminaddinvestmentsform
