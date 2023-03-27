import React, { useEffect, useState } from "react";
function Welcome() {

    const [data,setData] = useState([{}])

    useEffect(() => {
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