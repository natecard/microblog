import React, {ReactEventHandler, useContext, useEffect} from 'react';
import {post, userInfo} from './Interfaces';
import {Context} from '../App';
import MicroBlog from './MicroBlog';
import {supabase} from '../supabaseClient';
import SignOutUser from '../Auth/SignOutUser';
import {nanoid} from 'nanoid';

export default function Timeline() {
	const {
		user,
		post,
		setPostsArray,
		boostPost,
		postsArray,
		handlePostChange,
		setPostText,
		postText,
	} = useContext(Context) as {
		user: userInfo[];
		post: post[];
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
		console.error(error);
		if (data) {
			setPostText('');
		}
	}
	async function likePost(uuid: string, likes) {
		// event.preventDefault();
		const {data, error} = await supabase.rpc('increment', {
			likes: likes + 1,
		});
		if (error) console.error(error);
	}

	useEffect(() => {
		async function fetchPosts() {
			const {data, error} = await supabase
				.from('posts')
				.select('*')
				.order('timestamp', {ascending: false});
			if (data) {
				setPostsArray(data);
			}
		}
		fetchPosts();
	}, []);

	return (
		<div className="flex px-2 md:px-32 flex-col justify-center w-screen dark:text-white text-black">
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
						autoComplete="off"
					/>

					<button onClick={e => savePost(e)} className="">
						Send
					</button>
				</div>
			</form>
			<div id="post-card" className="flex-col flex items-center text-2xl pt-5">
				<h1>{`Hi, ${user.displayName} check out what is happening...`}</h1>
				<div className="flex flex-col lg:w-[50rem] ">
					{postsArray.map(post => {
						return (
							<MicroBlog
								key={post.uuid}
								likePost={() => likePost(post.uuid, post.likes)}
								uuid={post.uuid}
								author={post.author}
								profilePic={post.profilePic}
								content={post.content}
								likes={0}
								timestamp={post.timestamp}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
