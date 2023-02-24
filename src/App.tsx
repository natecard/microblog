import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseClient';
import SignIn from './Auth/SignIn';
import { post, userInfo } from './Components/Interfaces';
import Header from './Components/Header';
import SignOutButton from './Auth/SignOutUser';
import Timeline from './Components/Timeline';
import Landing from './Auth/SignIn';

export const Context = createContext<any>([]);

export default function App() {
  const [user, setUser] = useState<userInfo[]>([]);
  const [profilePic, setProfilePic] = useState('');
  const [uuid, setUuid] = useState('');
  const [post, setPost] = useState<post[]>([]);
  const [content, setContent] = useState('');
  const [sessionInfo, setSessionInfo] = useState<any>([]);
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
    //   const { name, value } = event.target;
    //   setPost((prevData) => {
    //     const newData = [...prevData];
    //     newData[index] = {
    //       ...newData[index],
    //       [name]: value,
    //     };
    //     return newData;
    //   });
  }

  // useEffect(() => {
  //   if (user !== null) {
  //     return setUser([user]);
  //   }
  // }, []);
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
        sessionInfo,
        setSessionInfo,
        boostPost,
        likePost,
        handlePostChange,
      }}
    >
      <Header displayName={''} uid={''} profilePic={''} email={''} />
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/home" element={<SignIn />}></Route>
        <Route path="/timeline" element={<Timeline />}></Route>
      </Routes>
    </Context.Provider>
  );
}
