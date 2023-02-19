import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import SignIn from './Components/Auth/SignIn';
import { microblog } from './Components/Interfaces';
import Header from './Components/Header';
import { SignOut } from './Components/Auth/SignOut';
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
export const Context = createContext<any>([]);
export const MicroBlogger = initializeApp(firebaseConfig);
export const auth = getAuth(MicroBlogger);
// const analytics = getAnalytics(MicroBlog);

// Initialize Firebase
export default function App() {
  const [user, setUser] = useState<user[]>([]);
  const [microblog, setMicroBlog] = useState<microblog[]>([]);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        microblog,
        setMicroBlog,
      }}
    >
      {/* <Routes> */}
      {/* <Route path="/" element={Timeline}></Route> */}
      {/* </Routes> */}
      <div>
        <Header user={user} />
        <div>
          <h2>Hello World</h2>
          <SignIn />
          <SignOut />
        </div>
      </div>
    </Context.Provider>
  );
}
