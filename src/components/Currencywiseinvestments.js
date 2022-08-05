import React, { useEffect, useState } from 'react';
import './Currencywiseinvestments.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, where, getDocs, query, orderBy } from 'firebase/firestore';


function Currencywiseinvestments() {

    const location = useLocation();

    const [investments,setInvestments] = useState([]);

    const [scroll,setScroll] = useState(true);

    const q = query(collection(db, "investments"), where("currencySymbol", "==", location.state.currencyID),orderBy("investAmount"));

    useEffect(()=>{
        const getInvestments = async () => {
            const data = await getDocs(q);
            setInvestments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            
          }
        getInvestments();
        
        if(scroll===true){
          window.scrollTo({top: 0, left: 0, behavior:'smooth'});
          setScroll(false);
        }
    }, [scroll,q])

    const navigate = useNavigate();
    const set = (id,symbol) =>{
      navigate('/investmentdetails', { state: { investmentID: id, currencySymbol: symbol } });
    }

  return (
    <>
      <div className='Currencywiseinvestments-row'>
        {investments.map((invest) => {
          return (
            <div className='Currencywiseinvestments-column'>
              <div className='Currencywiseinvestments-card'>
                <div className='Currencywiseinvestments-h1-main'>
                    <h1 className='Currencywiseinvestments-h1'>{invest.currencySymbol}</h1>
                </div>
                <div className='Currencywiseinvestments-h2andh3andbutton'>
                  <h2 className='Currencywiseinvestments-h2'>{invest.investAmount}&nbsp;{invest.currencySymbol}</h2>
                  <h3 className='Currencywiseinvestments-h3'>Monthly Interest : {invest.monthlyInterestRate}% (Month: {invest.monthlyInterestRate/12}%)</h3>
                  <h3 className='Currencywiseinvestments-h3'>Yearly Interest : {invest.yearlyInterestRate}% (Year: {invest.yearlyInterestRate}%)</h3>
                  <div className='Currencywiseinvestments-viewbutton'>
                    <button className='Currencywiseinvestments-btn' onClick={()=>set(invest.id,invest.currencySymbol)}>View Details</button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Currencywiseinvestments
