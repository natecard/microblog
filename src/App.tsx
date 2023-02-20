import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignIn } from './Components/Auth/SignIn';
import { post, userInfo } from './Components/Interfaces';
import Header from './Components/Header';
import SignOutButton from './Components/Auth/SignOutUser';
import Timeline from './Components/Timeline';
import { auth } from './firebase';
import { User } from 'firebase/auth';

export const Context = createContext<any>([]);

export default function App() {
  const [user, setUser] = useState<User[]>([]);
  const [post, setPost] = useState<post[]>([]);
  const [posts, setPosts] = useState<post[]>([]);
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
        post,
        setPost,
      }}
    >
      <Routes>
        <Route path="/microblog" element={<Timeline />}></Route>
        <Route path="/" element={<Timeline />}></Route>
      </Routes>
    </Context.Provider>
  );
}
