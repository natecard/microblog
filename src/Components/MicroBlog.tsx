import React from 'react';
import {post} from './Interfaces';

export default function MicroBlog(props: post) {
	return (
		<div
			className="
      grid 
      grid-cols-6 
      grid-rows-6
      max-h-96 
      lg:px-16  
      w-[20rem] 
      md:w-[40rem] 
      lg:w-[50rem]
      rounded-md 
      border-solid 
      border 
      bg-white 
      text-black
			dark:bg-black
			dark:text-white"
			id={props.uuid}
		>
			<div className="flex items-center justify-evenly col-start-1 col-span-2 row-start-1 row-span-3 flex-row">
				<img
					className=" items-center rounded-full  h-10 md:h-12 lg:h-20"
					src={props.profilePic}
				/>
				<h2 className="col-span-4 col-start-3 font-semibold">{props.author}</h2>
			</div>
			<p className="row-start-3 col-start-1 col-span-6 flex self-end font-medium text-xl">
				{props.content}
			</p>
			<div className="row-start-6 col-span-6 flex place-content-between items-end col-start-1">
				<button
					onClick={() => props.likePost()}
					className="btn border-0 text-black bg-white dark:bg-black dark:text-white gap-2"
				>
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
							strokeWidth={2}
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					Like
				</button>{' '}
				<button
					onClick={() => props.likePost()}
					className="btn border-0 text-black bg-white dark:bg-black dark:text-white gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.75}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
						/>
					</svg>
					Boost
				</button>{' '}
				<button
					onClick={() => props.likePost()}
					className="btn border-0 text-black bg-white dark:bg-black dark:text-white gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
						/>
					</svg>
					Reply
				</button>{' '}
			</div>
		</div>
	);
}
