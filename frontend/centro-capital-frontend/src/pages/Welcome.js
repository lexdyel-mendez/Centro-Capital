import React, { useEffect, useState } from "react";
function Welcome() {

    // usestate for setting a javascript
    // object for storing and using data
    const [data,setData] = useState([{}])

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("/centro-capital").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    },[])

    return(
        <div>
            {(typeof data.Welcome === 'undefined') ? (
                <p>Loading...</p>
            ): (
                data.Welcome.map((msg, i) =>(
                    <p key={i}>{msg}</p>
                )))}
        </div>
    )
}

export default Welcome;