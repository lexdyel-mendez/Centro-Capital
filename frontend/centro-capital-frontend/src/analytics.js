import ReactGA from 'react-ga';

export const initGA = (trackingID) => {
    ReactGA.initialize(trackingID)
}

export const trackPageView = (page) => {
    ReactGA.set({page});
    ReactGA.pageview(page);
}

export const trackEvent = (category, action, label, value) => {
    ReactGA.event({category, action, label, value});
}

export const trackSessionDuration = (duration) => {
    trackEvent('User', 'Session Duration', 'Session Duration', duration);
  };
  