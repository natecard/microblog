import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const MicroBlog = initializeApp(firebaseConfig);
const auth = getAuth(MicroBlog);
// const analytics = getAnalytics(MicroBlog);

// Initialize Firebase
export default function App() {
  return (
    <div>
      <div>
        <h2>Hello World</h2>
      </div>
    </div>
  );
}
