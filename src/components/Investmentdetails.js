import React, { useEffect, useState } from 'react'
import './Investmentdetails.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, where, getDocs, query, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import QRCode from 'react-qr-code';

function Investmentdetails({ isAuth }) {

    let navigate = useNavigate();
    const location = useLocation();
    const [scroll,setScroll] = useState(true);
    const [plan, setPlan] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    const [investmentPlan,setInvestmentPlan] = useState("");
    const [interest,setInterest] = useState("");
    const [interestWalletId,setInterestWalletId] = useState("");
    const [transactionId,setTransactionId] = useState("");

    const q1 = query(collection(db, "investments"), where("__name__", "==", location.state.investmentID));

    const q2 = query(collection(db, "currencies"), where("currencySymbol", "==", location.state.currencySymbol));

    useEffect(() => {
        const getPlan = async () => {
            const data = await getDocs(q1);
            setPlan(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        const getCurrency = async () => {
            const data = await getDocs(q2);
            setCurrencies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getPlan();
        getCurrency();
        if(scroll===true){
            window.scrollTo({top: 0, left: 0, behavior:'smooth'});
            setScroll(false);
          }
    },[scroll,q1,q2])

    const addInvest = async (id,amount,currency,monthly,yearly) => {
        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid;
        if(isAuth){
            if(investmentPlan===""){
                alert("Please Select a Plan")
            }else if(interest===""){
                alert("Please Select a interest type")
            }else if(interestWalletId===""){
                alert("Please Enter The Wallet ID")
            }else if(transactionId===""){
                alert("Please Enter The Transaction ID")
            }else{
                addDoc(collection(db,"investmentOrders"),{
                    Uid:uid,
                    investmentId: id,
                    investmentPlan: investmentPlan,
                    interest: interest,
                    interestWalletId: interestWalletId,
                    transactionId:transactionId,
                    investAmount:Number(amount),
                    currencySymbol: currency,
                    investmentPlanDetails:"",
                    investmentPlanStatus:"Pending",
                    monthlyInterestRate:Number(monthly),
                    yearlyInterestRate:Number(yearly),
                }).then(()=>{
                    alert("Invested Successfully!");
                    navigate("/myinvestmentorders")
                }).catch((err)=>{
                    alert(err);
                })
            }
        }else{
            navigate("/login")
        }
    }

    return (
        <>
            {plan.map((invest) => {
                return (
                    <div className='Investmentdetails'>
                        <div className='Investmentdetails-inner'>
                            <h2 className='Investmentdetails-h2'>Investment Plan Details</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className='Investmentdetails-h3'>Invest Amount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount} {invest.currencySymbol}</h3>
                            <h3 className='Investmentdetails-h3'>Monthly Interest Rate : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.monthlyInterestRate} % (Month : {invest.monthlyInterestRate / 12} %)</h3>
                            <h3 className='Investmentdetails-h3'>Monthly Interest Amount : &nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount * invest.monthlyInterestRate / 12 / 100} {invest.currencySymbol}</h3>
                            <h3 className='Investmentdetails-h3'>Yearly Interest Rate : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.yearlyInterestRate} % (Year : {invest.yearlyInterestRate} %)</h3>
                            <h3 className='Investmentdetails-h3'>Yearly Interest Amount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount * invest.yearlyInterestRate / 100} {invest.currencySymbol}</h3>
                            <hr></hr>
                            <h2 className='Investmentdetails-h2'>Select Plan</h2>
                            <hr></hr>
                            <br></br>
                            <input name='plan' className='Investmentdetails-radio' type="radio" value="One Year" onChange={(event) => { setInvestmentPlan(event.target.value); }}/>&nbsp;&nbsp;One Year
                            <br></br>
                            <br></br>
                            <input name='plan' className='Investmentdetails-radio' type="radio" value="Two Year" onChange={(event) => { setInvestmentPlan(event.target.value); }}/>&nbsp;&nbsp;Two Year
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <h2 className='Investmentdetails-h2'>Select Interest</h2>
                            <hr></hr>
                            <br></br>
                            <input name='interest' className='Investmentdetails-radio' type="radio" value="Monthly" onChange={(event) => { setInterest(event.target.value); }}/>&nbsp;&nbsp;Monthly
                            <br></br>
                            <br></br>
                            <input name='interest' className='Investmentdetails-radio' type="radio" value="Yearly" onChange={(event) => { setInterest(event.target.value); }}/>&nbsp;&nbsp;Yearly
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <h2 className='Investmentdetails-h2'>Enter Wallet ID for Interest</h2>
                            <hr></hr>
                            <br></br>
                            <div className='Investmentdetails-input'>
                                <input placeholder='Wallet ID' className='Investmentdetails-text' type="text" onChange={(event) => { setInterestWalletId(event.target.value); }}/>
                            </div>
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <h2 className='Investmentdetails-h2'>Send Investment Amount</h2>
                            <hr></hr>
                            <br></br>
                            {currencies.map((curr) => {
                                return (
                                    <>
                                        <h3 className='Investmentdetails-h3'>Amount : {invest.investAmount}</h3>
                                        <h3 className='Investmentdetails-h3'>Currency Name : {curr.currencyName}</h3>
                                        <h3 className='Investmentdetails-h3'>Network : {curr.currencyNetwork}</h3>
                                        <h3 className='Investmentdetails-h3'>Wallet ID : {curr.currencyWalletId}</h3>
                                        <div className='Investmentdetails-qr'>
                                            <QRCode
                                                title={curr.currencySymbol}
                                                value={curr.currencyWalletId}
                                                bgColor='#FFFFFF'
                                                fgColor='#000000'
                                                size={200}
                                            />
                                        </div>
                                        <br></br>
                                        <div className='Investmentdetails-input'>
                                            <input placeholder='Transaction ID' className='Investmentdetails-text' type="text" onChange={(event) => { setTransactionId(event.target.value); }}/>
                                        </div>
                                        <br></br>
                                        <div className='Investmentdetails-input'>
                                            <button onClick={() => addInvest(invest.id,invest.investAmount,invest.currencySymbol,invest.monthlyInterestRate,invest.yearlyInterestRate)}>Invest</button>
                                        </div>

                                    </>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Investmentdetails
