import React, { useEffect, useState } from "react";

function Welcome() {

    // usestate for setting a javascript
    // object for storing and using data
    const [state, setState] = useState([{}])

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("/centro-capital").then( response => {
            if(response.status == 200){
                return response.json()
            }
        }).then(data => setState(data))
    },[])

    return (
        <div>
            {state.Welcome}
        </div>
    )
}

export default Welcome;