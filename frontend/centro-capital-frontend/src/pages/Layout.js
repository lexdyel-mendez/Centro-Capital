import CustomFooter from "../components/CustomFooter";
import CustomNavbar from "../components/CustomNavbar";
import { initGA, logPageView, logSessionDuration, logBounce, logSession } from '../analytics';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga'

const Layout = () => {

  return (
    <>
    <CustomNavbar id="navbar"/>
    <CustomFooter id="footer"/>
    </>
  )
};

export default Layout;