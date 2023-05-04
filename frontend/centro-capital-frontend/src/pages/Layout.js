import CustomFooter from "../components/CustomFooter";
import CustomNavbar from "../components/CustomNavbar";
import { initGA, logPageView, logSessionDuration, logBounce, logSession } from '../analytics';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga'

const Layout = () => {

  // const [pageViews, setPageView] = useState(0);

  // const handlePageView = () => {
  //   setPageView((prev) => {
  //     if (prev === 0) {
  //       // Initialize Google Analytics and log the page view.
  //       initGA('UA-266511060-2');
  //       logPageView();
  //     }

  //     return prev + 1;
  //   });
  // };

  // useEffect(() => {
  //   handlePageView();
  // }, []);

  return (
    <>
    <CustomNavbar/>
    <CustomFooter/>
    </>
  )
};

export default Layout;