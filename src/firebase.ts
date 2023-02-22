import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

export const MicroBlogger = initializeApp(firebaseConfig);
export const auth = getAuth(MicroBlogger);
const database = initializeFirestore(MicroBlogger, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
})
export const db = getFirestore(MicroBlogger);
// const analytics = getAnalytics(MicroBlog);
