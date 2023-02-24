import React, { useContext, useEffect } from 'react';
import { post, userInfo } from './Interfaces';
import { Context } from '../App';
import MicroBlog from './MicroBlog';
import { supabase } from '../supabaseClient';
import SignOutUser from '../Auth/SignOutUser';

export default function Timeline() {
  const {
    user,
    post,
    setPostsArray,
    likePost,
    boostPost,
    postsArray,
    handlePostChange,
    setPostText,
    postText,
  } = useContext(Context) as {
    user: any[];
    post: post[];
    likePost: Function;
    boostPost: Function;
    postsArray: any[];
    setPostsArray: any;
    postText: string;
    setPostText: any;
    handlePostChange: Function;
  };
  // async function loadPost(string: string) {
  //   try {
  //     const { data, error } = await supabase
  //       .from('posts')
  //       .select('timestamp, author, profilePic, content, likes, id');
  //     console.log('loading...');
  //   } catch (error) {
  //     console.error('Error writing new post to Supabase Database', error);
  //   }
  // }
  async function savePost(string: string) {
    const { data: posts, error } = await supabase
      .from('posts')
      .insert([
        { profilePic: user.profilePic },
        { content: postText },
        { author: user.displayName },
      ]);
    const handleInserts = (payload) => {
      console.log('Change received!', payload);
    };
    await supabase.from('posts').on('INSERT', handleInserts).subscribe();
  }
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
        <h1>{`Hi, ${user.displayName}`}</h1>
        <div id="post-card" className="">
          <div className="">
            <div id="posts"></div>
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
      </div>
      <SignOutUser />
    </div>
  );
}
