import React from 'react';
import './Exchangespopup.css';

function Exchangespopup(props) {
    return (props.trigger)?(
        <div className='Exchangespopup'>
            <div className='Exchangespopup-inner'>
                <button onClick={()=>props.setTrigger(false)} className='Exchangespopup-closebtn'>Close</button>
                {props.children}
            </div>
        </div>
      ):"";
}

export default Exchangespopup
