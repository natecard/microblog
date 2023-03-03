import React, {ReactEventHandler, useContext, useEffect, useState} from 'react';
import {post, userInfo} from './Interfaces';
import {Context} from '../App';
import MicroBlog from './MicroBlog';
import {supabase} from '../supabaseClient';
import SignOutUser from '../Auth/SignOutUser';
import {nanoid} from 'nanoid';
import Reply from './Reply';

export default function Timeline() {
	const {
		user,
		post,
		setPostsArray,
		boostPost,
		postsArray,
		handlePostChange,
		postText,
		setPostText,
		replies,
		setReplies,
		replyText,
		setReplyText,
	} = useContext(Context) as {
		user: userInfo[];
		post: post[];
		boostPost: Function;
		postsArray: any[];
		setPostsArray: any;
		postText: string;
		setPostText: any;
		handlePostChange: Function;
		replyText: string;
		setReplyText: any;
		replies: post[];
		setReplies: any;
		alreadyClicked: boolean;
		setAlreadyClicked: any;
	};

	async function fetchPosts() {
		const {data, error} = await supabase
			.from('posts')
			.select('*')
			.order('timestamp', {ascending: false});
		if (data) {
			setPostsArray(data);
		}
	}

	async function fetchReplies() {
		const {data, error} = await supabase.rpc('group_replies', {});
		if (error) {
			console.error(error);
		} else {
			setReplies(data); // set data state variable to posts array
		}
	}

	// }, []);
	async function savePost(event: any) {
		event.preventDefault();
		const {data, error} = await supabase.from('posts').insert([
			{
				content: postText,
				uuid: nanoid(),
				author: user.displayName,
				likes: 0,
				profilePic: user.profilePic,
			},
		]);
		fetchPosts();
		console.error(error);
		setPostText('');
	}
	useEffect(() => {
		fetchPosts();
		fetchReplies();
	}, []);

	return (
		<div className="flex px-2 md:px-32 flex-col justify-center w-screen dark:text-white text-black">
			{user.displayName !== undefined || null ? (
				<div>
					<form>
						<div className="flex mt-3 items-center flex-col">
							<label className="" htmlFor="post">
								Make post
							</label>
							<textarea
								onChange={event => setPostText(event.target.value)}
								className="md:w-1/2 w-5/6 dark:bg-black dark:border-white border dark:text-white text-black"
								id="post"
								value={postText}
								autoComplete="on"
							/>
							<button onClick={e => savePost(e)} className="">
								Send
							</button>
						</div>
					</form>
					<h1>{`Hi, ${user.displayName} check out what is happening...`}</h1>
				</div>
			) : (
				<></>
			)}
			<div id="post-card" className="flex-col flex items-center text-2xl pt-5">
				<div className="flex flex-col lg:w-[50rem] ">
					{postsArray.map(post => (
						<MicroBlog
							key={post.uuid}
							replyToPost={() => replyToPost(event)}
							fetchPosts={() => fetchPosts()}
							uuid={post.uuid}
							author={post.author}
							profilePic={post.profilePic}
							content={post.content}
							likes={post.likes}
							timestamp={post.timestamp}
							replyText={replyText}
							handleReplyChange={() => handleReplyChange(e.target.value)}
						/>
					))}{' '}
					{replies.length < 1 ? (
						<div className="replies">
							{replies.map(reply => (
								<Reply
									key={reply.uuid}
									replyToPost={() => replyToPost(event)}
									fetchPosts={() => fetchPosts()}
									uuid={reply.uuid}
									author={reply.author}
									profilePic={reply.profilePic}
									content={reply.content}
									likes={reply.likes}
									timestamp={reply.timestamp}
									replyText={replyText}
									likePost={function (): void {
										throw new Error('Function not implemented.');
									}}
									textAreaToggle={function (): void {
										throw new Error('Function not implemented.');
									}}
								/>
							))}
						</div>
					) : (
						<></>
					)}
					{/* {/* </div> */}
					{/* {postsArray.map(post => {
						return (
							<MicroBlog
								key={post.uuid}
								replyToPost={() => replyToPost(event)}
								fetchPosts={() => fetchPosts()}
								uuid={post.uuid}
								author={post.author}
								profilePic={post.profilePic}
								content={post.content}
								likes={post.likes}
								timestamp={post.timestamp}
								replyText={replyText}
								handleReplyChange={() => handleReplyChange(e.target.value)}
							/>
						);
					})} */}
				</div>
			</div>
		</div>
	);
}
