import { useEffect } from "react";
import { initGA, trackPageView } from './analytics';
import{useNavigate, useLocation} from 'react-router-dom';

const trackingID='UA-266511060-2'
const AnalyticsHandler = () => {

    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
      initGA(trackingID);
    
    trackPageView(window.location.pathname)
    
    const unlisten = navigate.listen(({location}) => {
      trackPageView(location.pathname);
    })
    
    return () => unlisten()
    
    }, [navigate,location]);
    return null;
}
export default AnalyticsHandler
