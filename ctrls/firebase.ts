import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

if (!process.env.REACT_APP_FIREBASE_CONFIG) {
  throw new Error('please defined "REACT_APP_FIREBASE_CONFIG"');
}

const config = JSON.parse(window.atob(process.env.REACT_APP_FIREBASE_CONFIG));

export const app = initializeApp(config);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const auth = getAuth(app);
