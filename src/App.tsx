import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignIn } from './Components/Auth/SignIn';
import { post, userInfo } from './Components/Interfaces';
import Header from './Components/Header';
import SignOutButton from './Components/Auth/SignOutUser';
import Timeline from './Components/Timeline';
import { auth } from './firebase';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

export const Context = createContext<any>([]);

export default function App() {
  const [user, setUser] = useState<User[]>([]);
  const [post, setPost] = useState<post[]>([]);
  const [postsArray, setPostsArray] = useState<any[]>([]);
  const [postText, setPostText] = useState('');
  function likePost(id: any) {
    // posts.map((post)=>{
    //   post.filter(id) => post.id
    // })
  }
  function boostPost(id: any) {
    // posts.map((post)=>{
    //   post.filter(id) => post.id
    // })
  }
  function handlePostChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { name, value } = event.target;
    setPost((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [name]: value,
      };
      return newData;
    });
  }

  useEffect(() => {
    if (auth.currentUser !== null) {
      return setUser([auth.currentUser]);
    }
  }, [auth]);
  // user.map((user: userInfo) => {
  //   (user.uid = user.uid),
  //     (user.displayName = user.displayName),
  //     (user.profilePic = user.profilePic),
  //     (user.email = user.email);
  // });
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        postsArray,
        setPostsArray,
        post,
        setPost,
        postText,
        setPostText,
        boostPost,
        likePost,
        handlePostChange,
      }}
    >
      <Header displayName={''} uid={''} profilePic={''} email={''} />
      <Routes>
        <Route path="/microblog" element={<Timeline />}></Route>
        <Route path="/" element={<Timeline />}></Route>
      </Routes>
    </Context.Provider>
  );
}
