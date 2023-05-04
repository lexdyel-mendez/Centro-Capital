import CustomFooter from "../components/CustomFooter";
import CustomNavbar from "../components/CustomNavbar";
import { initGA, logPageView, logSessionDuration, logBounce, logSession } from '../analytics';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga'

const Layout = () => {

  // const [startTime, setStartTime] = useState(Date.now());
  // const [pageViews, setPageViews] = useState(0);

  // const handlePageView = () => {
  //   setPageViews((prev) => {
  //     if (prev === 0) {
  //       // Log a new session if it's the first page view.
  //       logSession();
  //     } else if (prev === 1) {
  //       // Log a bounce if the user only viewed one page during their session.
  //       logBounce();
  //     }

  //     return prev + 1;
  //   });
  // };

  // useEffect(() => {
  //   // Initialize Google Analytics and log the page view.
  //   initGA('UA-266511060-2');
  //   logPageView();
  //   handlePageView();

  //   return () => {
  //     // Calculate session duration and log it when the component is unmounted.
  //     const duration = Date.now() - startTime;
  //     logSessionDuration(duration);
  //   };
  // }, []);

  const [pageViews, setPageViews] = useState(0);

  const handlePageView = () => {
    setPageView((prev) => {
      if (prev === 0) {
        // Initialize Google Analytics and log the page view.
        initGA('UA-266511060-2');
        logPageView();
      }

      return prev + 1;
    });
  };

  useEffect(() => {
    handlePageView();
  }, []);

  return (
    <>
    <CustomNavbar/>
    <CustomFooter/>
    </>
  )
};

export default Layout;