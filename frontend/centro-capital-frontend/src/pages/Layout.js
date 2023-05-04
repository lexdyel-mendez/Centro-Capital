import CustomFooter from "../components/CustomFooter";
import CustomNavbar from "../components/CustomNavbar";
import React, { useState, useEffect } from 'react';
import { initGA, trackPageView } from '../analytics';
import ReactGA from 'react-ga';

const Layout = () => {

  const [startTime, setStartTime] = useState(Date.now());
  // const [endTime, setEndTime] = useState(Date.now());

  const trackingID='UA-266511060-2'

  useEffect(() => {
    initGA(trackingID);
    trackPageView(window.location.pathname)

    return () => {
      const duration = Date.now() - startTime;
      logSessionDuration(duration);
    };
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setEndTime(Date.now());
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   const timeSpent = (endTime - startTime) / 1000;
  //   ReactGA.timing({
  //     category: 'Page',
  //     variable: 'Time on Page',
  //     value: timeSpent,
  //   });
  // }, [endTime]);

  

  return (
    <>
    <CustomNavbar/>
    <CustomFooter/>
    </>
  )
};

export default Layout;