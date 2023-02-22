import React, { useContext, useEffect } from 'react';

import { post, userInfo } from './Interfaces';
import { Context } from '../App';
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import MicroBlog from './MicroBlog';
import { auth, db } from '../firebase';
import Header from './Header';
import { SignIn } from './Auth/SignIn';
import SignOutUser from './Auth/SignOutUser';

export default function Timeline() {
  const {
    user,
    setUser,
    post,
    setPostsArray,
    likePost,
    boostPost,
    postsArray,
    handlePostChange,
    setPostText,
    postText,
  } = useContext(Context) as {
    user: any;
    setUser: any;
    post: post[];
    likePost: Function;
    boostPost: Function;
    postsArray: any[];
    setPostsArray: any;
    postText: string;
    setPostText: any;
    handlePostChange: Function;
  };
  async function savePost(string: string) {
    try {
      await addDoc(collection(db, 'posts'), {
        timestamp: serverTimestamp(),
        author: user.displayName,
        profilePic: user.photoURL,
        content: postText,
        likes: 0,
        id: serverTimestamp(),
      });
      console.log('sent');
    } catch (error) {
      console.error('Error writing new post to Firebase Database', error);
    }
  }

  // function loadPosts() {
  //   try {
  //     const postQuery = query(
  //       collection(db, 'posts'),
  //       orderBy('timestamp', 'desc'),
  //       limit(20)
  //     );
  //   } catch (error) {
  //     console.error('Error retrieving posts from Firebase Database', error);
  //   }
  //   try {
  //     onSnapshot(postQuery, (snapshot) => {
  //       snapshot.docChanges().forEach(function (change) {
  //         // if (change.type === 'removed') {
  //         //   deletePost(change.doc.id);
  //         // } else
  //         {
  //           let post = change.doc.data();
  //           displayPosts(
  //             change.doc.id,
  //             post.timestamp,
  //             post.displayName,
  //             post.content,
  //             post.profilePic,
  //             post.imageUrl
  //           );
  //         }
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // function displayPosts(
  //   id: string,
  //   timestamp: string,
  //   displayName: any,
  //   content: any,
  //   profilePic: any,
  //   imageUrl: any
  // ) {
  //   postsArray.map((post: post) => {
  //     <MicroBlog
  //       id={post.id}
  //       author={post.author}
  //       title={post.title}
  //       profilePic={post.profilePic}
  //       content={post.content}
  //       likes={0}
  //       timestamp={post.id}
  //       likePost={likePost()}
  //     />;
  //   });
  // }

  // function deletePost(id: string) {}

  return (
    <div>
      <div>
        <h1>Hi</h1>
        <div id="messages-card" className="">
          <div className="">
            <div id="messages"></div>
            <form>
              <div>
                <label className="" htmlFor="post">
                  Post
                </label>
                <input
                  onChange={(event) => setPostText(event.target.value)}
                  className=""
                  id="post"
                  value={postText}
                  type="text"
                  autoComplete="off"
                />
              </div>
              <button onClick={() => savePost(postText)} className="">
                Send
              </button>
            </form>
          </div>
        </div>
        <SignIn />
      </div>
      <SignOutUser />
    </div>
  );
}
