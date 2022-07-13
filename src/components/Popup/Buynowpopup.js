import React from 'react'
import './Buynowpopup.css'

function Buynowpopup(props) {
  return (props.trigger)?(
    <div className='buynowpopup'>
        <div className='buynowpopup-inner'>
            <button onClick={()=>props.setTrigger(false)} className='buynowpopup-closebtn'>Close</button>
            {props.children}
        </div>
    </div>
  ):"";
}

export default Buynowpopup
