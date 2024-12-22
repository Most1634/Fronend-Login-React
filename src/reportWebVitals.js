import { reportWebVitals } from 'web-vitals';

const sendToAnalytics = (metric) => {
  // Log the metric or send it to an analytics endpoint
  console.log(metric);
};

reportWebVitals(sendToAnalytics);
