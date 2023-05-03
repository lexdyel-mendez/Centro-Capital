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
import Welcome from "./pages/Welcome";
import ReactGA from 'react-ga4'
import React from 'react';

ReactGA.initialize('G-Q8GRTCK6RZ');
// ReactGA.send({
//   hitType: 'timing',
//   timingCategory: 'Engagement',
//   timingVar: 'Form Submission',
//   timingValue: 20000
// });

// console.log('Timing event sent:', {
//   timingCategory: 'Engagement',
//   timingVar: 'Form Submission',
//   timingValue: 20000
// });

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
            <Route path="feedback" element={<Welcome />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
