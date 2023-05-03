import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import Insights from './pages/Insights';
import Compare from './pages/Compare';
import Welcome from "./pages/Welcome";
import ReactGA from 'react-ga'
import React from 'react';
import AnalyticsHandler from './AnalyticsHandler';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <AnalyticsHandler />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="insights" element={<Insights />} />
            <Route path="compare" element={<Compare />} />
            <Route path="feedback" element={<Welcome />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
