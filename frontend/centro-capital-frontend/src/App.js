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
import ReactGA from 'react-ga'
import React, { useEffect, useState } from 'react';
import { initGA, logPageView, logSessionDuration, logBounce, logSession } from './analytics';

ReactGA.initialize('G-L6KNQ31WLF');

function App() {

  const [startTime, setStartTime] = useState(Date.now());
  const [pageViews, setPageViews] = useState(0);

  const handlePageView = () => {
    setPageViews((prev) => {
      if (prev === 0) {
        // Log a new session if it's the first page view.
        logSession();
      } else if (prev === 1) {
        // Log a bounce if the user only viewed one page during their session.
        logBounce();
      }

      return prev + 1;
    });
  };

  useEffect(() => {
    // Initialize Google Analytics and log the page view.
    initGA('UA-XXXXXXXXX-X');
    logPageView();
    handlePageView();

    return () => {
      // Calculate session duration and log it when the component is unmounted.
      const duration = Date.now() - startTime;
      logSessionDuration(duration);
    };
  }, []);

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
