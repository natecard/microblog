import React from 'react';
import { post } from './Interfaces';

export default function MicroBlog(props: post) {
  return (
    <div className="" id={props.uuid}>
      <div>
        <h2>{props.author}</h2>
        <img src={props.profilePic} />
      </div>
      <p>{props.content}</p>
      <div>
        <button onClick={() => props.likePost()} className="btn gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Like
        </button>{' '}
      </div>
    </div>
  );
}
