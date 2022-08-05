import React from 'react'
import './Marketplaceorderviewpopup.css';

function Marketplaceorderviewpopup(props) {
  
    return (props.trigger)?(
        <div className='Marketplaceorderviewpopup'>
            <div className='Marketplaceorderviewpopup-inner'>
                <button onClick={()=>props.setTrigger(false)} className='Marketplaceorderviewpopup-closebtn'>Close</button>
                {props.children}
            </div>
        </div>
      ):"";
  
}

export default Marketplaceorderviewpopup
