import React, { useContext } from 'react';

import { post, userInfo } from './Interfaces';
import { Context } from '../App';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import MicroBlog from './MicroBlog';
import { auth, db } from '../firebase';
import Header from './Header';
import { SignIn } from './Auth/SignIn';
import SignOutUser from './Auth/SignOutUser';

export default function Timeline() {
  const { user, setUser, likePost, boostPost } = useContext(Context);
  async function savePost(postText) {
    try {
      await addDoc(collection(getFirestore(), 'posts'), {
        name: auth.currentUser?.displayName,
        post: postText,
        profilePicUrl: auth.currentUser?.photoURL,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error writing new post to Firebase Database');
    }
  }
  // onSnapshot(userRef, (snapshot) => {
  //   const blog = snapshot.docs.map((d) => d.data());
  //   const uiList = blog.map((post) => {
  //     return (
  //       <MicroBlog
  //         id={post.id}
  //         author={post.author}
  //         title={post.title}
  //         image={post.image}
  //         content={post.content}
  //         likePost={() => likePost()}
  //         boostPost={() => boostPost()}
  //       />
  //     );
  //   });
  // });

  return (
    <div>
      <Header
        displayName={user.displayName}
        uid={user.uid}
        profilePic={user.profilePic}
        email={user.email}
      />
      <div>
        <h1>Hi</h1>
        <SignIn />
      </div>
      <SignOutUser />
    </div>
  );
}
