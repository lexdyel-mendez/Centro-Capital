import ReactGA from 'react-ga';

export const initGA = (trackingID) => {
    ReactGA.initialize(UA-266511060-2)
}

export const trackPageView = (page) => {
    ReactGA.set({page});
    ReactGA.pageview(page);
}

export const trackEvent = (category, action, label, value) => {
    ReactGA.event({category, action, label, value});
}

