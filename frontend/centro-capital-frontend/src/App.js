import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import Insights from './pages/Insights';
import Compare from './pages/Compare';

// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="insights" element={<Insights />} />
          <Route path="compare" element={<Compare />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
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
