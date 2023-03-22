// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
  
function App() {
    // usestate for setting a javascript
    // object for storing and using msg
    const [msg, setmsg] = useState({});

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("/centro-capital").then((res) =>
            res.json().then((data) => {
                // Setting a msg from api
                setmsg({
                    msg: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        );
    }, []);
  
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                {/* Calling a msg from setdata for showing */}
                <p>{msg.name}</p>
                <p>{msg.age}</p>
                <p>{msg.date}</p>
                <p>{msg.programming}</p>
  
            </header>
        </div>
    );
}
  
export default App;