import React, {ReactEventHandler, useContext, useEffect, useState} from 'react';
import {post, replies, userInfo} from './Interfaces';
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
		postsArray,
		postText,
		setPostText,
		replies,
		setReplies,
		repliesArray,
		setRepliesArray,
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
		replies: replies[];
		setReplies: any;
		repliesArray: any[];
		setRepliesArray: any;
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
			// const {
			// data: {content_array},
			// } = data;
			setRepliesArray(
				data.flatMap((reply: any) =>
					reply.content_array.flatMap((item: replies) => ({
						author: item.author,
						uuid: item.uuid,
						profilePic: item.profilePic,
						content: item.content,
						likes: item.likes,
						timestamp: item.timestamp,
						repliedTo: reply.replied_to,
					}))
				)
			);
		}
	}
	useEffect(() => {
		fetchReplies();
	}, [replies]);

	useEffect(() => {
		setReplies(
			postsArray
				// .filter(
				// 	post =>
				// 		repliesArray.filter(reply => reply.repliedTo == post.uuid).length >
				// 		0
				// )
				.map(post => ({
					post,
					replies: repliesArray.filter(reply => reply.repliedTo == post.uuid),
				}))
		);
	}, [postsArray]);
	console.log(replies);

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
					{replies.map(({post, replies}) => (
						<div key={post.uuid}>
							<MicroBlog
								post={post}
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
								replies={replies}
								handleReplyChange={() => handleReplyChange(e.target.value)}
							/>
							{replies.map(reply => (
								<Reply
									reply={reply}
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
									handleReplyChange={() => handleReplyChange(e.target.value)}
								/>
							))}
						</div>
					))}{' '}
				</div>
			</div>
		</div>
	);
}
