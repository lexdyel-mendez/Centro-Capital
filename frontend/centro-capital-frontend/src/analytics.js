import ReactGA from 'react-ga';

export const initGA = (trackingID) => {
    ReactGA.initialize(trackingID);
};

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category, action, label, value) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
        value: value,
    });
};
export const logBounce = () => {
    logEvent('User', 'Bounce', 'Bounce');
};

export const logSession = () => {
    logEvent('User', 'New Session', 'New Session');
};


export const logSessionDuration = (duration) => {
    logEvent('User', 'Session Duration', 'Session Duration', duration);
};

