import React,{useState,useEffect} from 'react';
import './Myinvestmentorderdetails.css';
import { collection, where, getDocs, query } from 'firebase/firestore';
import { useLocation} from 'react-router-dom';
import { db } from '../Firebase-config';

function Myinvestmentorderdetails() {

    const location = useLocation();
    const [scroll,setScroll] = useState(true);
    const [plan, setPlan] = useState([]);

    const q1 = query(collection(db, "investmentOrders"), where("__name__", "==", location.state.investmentID));

    useEffect(() => {
        const getPlan = async () => {
            const data = await getDocs(q1);
            setPlan(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getPlan();
        if(scroll===true){
            window.scrollTo({top: 0, left: 0, behavior:'smooth'});
            setScroll(false);
          }
    },[scroll,q1])

    return (
        <>
            {plan.map((invest) => {
                return (
                    <div className='Myinvestmentorderdetails'>
                        <div className='Myinvestmentorderdetails-inner'>
                            <h2 className='Myinvestmentorderdetails-h2'>Investment Plan Details</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className='Myinvestmentorderdetails-h3'>Invest Amount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount} {invest.currencySymbol}</h3>
                            <h3 className='Myinvestmentorderdetails-h3'>Monthly Interest Rate : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.monthlyInterestRate} % (Month : {invest.monthlyInterestRate / 12} %)</h3>
                            <h3 className='Myinvestmentorderdetails-h3'>Monthly Interest Amount : &nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount * invest.monthlyInterestRate / 12 / 100} {invest.currencySymbol}</h3>
                            <h3 className='Myinvestmentorderdetails-h3'>Yearly Interest Rate : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.yearlyInterestRate} % (Year : {invest.yearlyInterestRate} %)</h3>
                            <h3 className='Myinvestmentorderdetails-h3'>Yearly Interest Amount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invest.investAmount * invest.yearlyInterestRate / 100} {invest.currencySymbol}</h3>
                            <hr></hr>
                            <h2 className='Myinvestmentorderdetails-h2'>Selected Plan Details</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className='Myinvestmentorderdetails-h3'>Plan Period : {invest.investmentPlan}</h3>
                            <h3 className='Myinvestmentorderdetails-h3'>Interest : {invest.interest}</h3>
                            <h3 className='Myinvestmentorderdetails-h3'>My Wallet Id : {invest.interestWalletId}</h3>
                            <h3 className='Myinvestmentorderdetails-h3'>Trasaction Id : {invest.transactionId}</h3>

                            <br></br>
                            <hr></hr>
                            <hr></hr>
                            <h2 className='Myinvestmentorderdetails-h2'>Investment Plan Status</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className='Myinvestmentorderdetails-h3-active'>Plan Status : {invest.investmentPlanStatus}</h3>
                            <h3 className='Myinvestmentorderdetails-h3'>Any Detail About Plan : {invest.investmentPlanDetails}</h3>
                            <br></br>
                            <hr></hr>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Myinvestmentorderdetails
