import React, { useEffect, useState } from 'react'
import $ from "jquery";
import './Exchanges.css'

function Exchanges() {

    const [currentPrice, setCurrentPrice] = useState();
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        
        var liveprice = {
            "async": true,
            "scroosDomain": true,
            "url": "https://api.coingecko.com/api/v3/simple/price?ids="+currency+"&vs_currencies=usd",
      
            "method": "GET",
            "headers": {}
          }

        $.ajax(liveprice).then((res)=>{
            setCurrentPrice(res[currency]["usd"]);
        })
    })

    return (
        <>
            <h1>{currentPrice}</h1>
        </>
    )
}

export default Exchanges
