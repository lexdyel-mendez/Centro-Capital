import React, { useEffect, useState } from "react";

function Welcome() {

    // usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState({
        welcome: ""
    });

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/centro-capital").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    welcome: data.Welcome
                });
            })
        );
    }, []);

    return (
        <div>
            <p>{data.welcome}</p>
        </div>
    )
}

export default Welcome;