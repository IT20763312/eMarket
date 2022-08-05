import React, { useEffect, useState } from 'react';
import './Admininvestmentorderlistdetails.css';
import { useLocation } from 'react-router-dom';
import { collection, where, getDocs, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase-config';

function Admininvestmentorderlistdetails() {

    const location = useLocation();
    const [scroll, setScroll] = useState(true);
    const [plan, setPlan] = useState([]);

    const [status, setStatus] = useState("");
    const [details, setDetails] = useState("");

    const q1 = query(collection(db, "investmentOrders"), where("__name__", "==", location.state.investmentID));

    useEffect(() => {
        const getPlan = async () => {
            const data = await getDocs(q1);
            setPlan(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getPlan();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, q1])

    const editStatus = async (id) => {
        if (status === "") {
            alert("Please Select The Status!")
        } else {
            const orderDoc = doc(db, "investmentOrders", id);
            const newFields = { investmentPlanStatus: status };
            await updateDoc(orderDoc, newFields);
            alert("Investment status updated!");
        }
    }

    const editDetails = async (id) => {
        if (details === "") {
            alert("Please add details!")
        } else {
            const orderDoc = doc(db, "investmentOrders", id)
            const newFields = { investmentPlanDetails: details };
            await updateDoc(orderDoc, newFields);
            alert("Investment Details Updated");
        }
    }

    return (
        <>
            {plan.map((invest) => {
                return (
                    <div className='Admininvestmentorderlistdetails'>
                        <div className='Admininvestmentorderlistdetails-inner'>
                            <h2 className='Admininvestmentorderlistdetails-h2'>Investment Plan Details</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Invest Amount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount} {invest.currencySymbol}</h3>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Monthly Interest Rate : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.monthlyInterestRate} % (Month : {invest.monthlyInterestRate / 12} %)</h3>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Monthly Interest Amount : &nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount * invest.monthlyInterestRate / 12 / 100} {invest.currencySymbol}</h3>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Yearly Interest Rate : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.yearlyInterestRate} % (Year : {invest.yearlyInterestRate} %)</h3>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Yearly Interest Amount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount * invest.yearlyInterestRate / 100} {invest.currencySymbol}</h3>
                            <hr></hr>
                            <h2 className='Admininvestmentorderlistdetails-h2'>Selected Plan Details</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className='Admininvestmentorderlistdetails-h3'>User ID : {invest.Uid}</h3>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Plan Period : {invest.investmentPlan}</h3>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Interest : {invest.interest}</h3>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Wallet Id : {invest.interestWalletId}</h3>
                            <h3 className='Admininvestmentorderlistdetails-h3'>Trasaction Id : {invest.transactionId}</h3>
                            <br></br>
                            <hr></hr>
                            <h2 className='Admininvestmentorderlistdetails-h2'>Investment Plan Status</h2>
                            <hr></hr>
                            <br></br>
                            <div className='Admininvestmentorderlistdetails-input'>
                                <select onChange={(event) => (setStatus(event.target.value))}>
                                    <option>{invest.investmentPlanStatus}</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Payment Confirmed">Payment Confirmed</option>
                                    <option value="Active">Active</option>
                                    <option value="Plan Over">Plan Over</option>
                                </select>
                            </div>
                            <div className='Admininvestmentorderlistdetails-btn'>
                                <button onClick={() => editStatus(invest.id)} className='Admininvestmentorderlistdetails-button'>Add Status</button>
                            </div>
                            <br></br>
                            <hr></hr>
                            <h2 className='Admininvestmentorderlistdetails-h2'>Investment Plan Details</h2>
                            <hr></hr>
                            <br></br>
                            <div className='Admininvestmentorderlistdetails-input'>
                                <textarea onChange={(event) => (setDetails(event.target.value))} className='Admininvestmentorderlistdetails-textarea' placeholder='Details' defaultValue={invest.investmentPlanDetails} />
                            </div>
                            <div className='Admininvestmentorderlistdetails-btn'>
                                <button onClick={() => editDetails(invest.id)} className='Admininvestmentorderlistdetails-button'>Edit Details</button>
                            </div>
                            <br></br>
                            <hr></hr>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Admininvestmentorderlistdetails
