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
  const {
    user,
    setUser,
    post,
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
    postText: string;
    setPostText: any;
    handlePostChange: Function;
  };
  async function savePost(string: string) {
    try {
      await addDoc(collection(db, 'posts'), {
        id: serverTimestamp(),
        author: user.displayName,
        profilePic: user.photoURL,
        content: postText,
        // likePost: likePost(),
        // boostPost: boostPost(),
      });
      console.log('sent');
    } catch (error) {
      console.error('Error writing new post to Firebase Database', error);
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
      <div>
        <h1>Hi</h1>
        <div
          id="messages-card"
          className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
        >
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">
            <div id="messages"></div>
            <form>
              <div>
                <label className="" htmlFor="post">
                  Message...
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
