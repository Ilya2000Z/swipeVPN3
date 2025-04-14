import { initializeApp, getApp, getApps,  } from '@react-native-firebase/app';
import { getAnalytics } from '@react-native-firebase/analytics';

export const firebaseConfig = {
    apiKey: "AIzaSyDEMk9uw1SFQ3VlULcV9tC2uWdKOgjcnL8",
    projectId: "sample-firebase-ai-app-510ab",
    appId: "1:626303996097:android:d6af73a5bb06292edc8440",
    messagingSenderId: "626303996097",
    storageBucket: "sample-firebase-ai-app-510ab.appspot.com",
  };

// let app;
// let analytics;

// if (!getApps().length) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = getApp();
// }

// try {
//   analytics = getAnalytics(app);
// } catch (e) {
//   console.warn('Analytics is not available:', e);
// }

// export { app, analytics };