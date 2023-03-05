import React, {useContext, useState, useEffect} from 'react';
import {replies, userInfo} from './Interfaces';
import {Context} from '../App';
import {supabase} from '../supabaseClient';
import {nanoid} from 'nanoid';

export default function Reply(props: replies) {
	const {replyText, setReplyText, user} = useContext(Context) as {
		replyText: string;
		setReplyText: Function;
		user: userInfo;
	};
	const [showTextArea, setShowTextArea] = useState(false);
	const [alreadyClicked, setAlreadyClicked] = useState(() => {
		const item = sessionStorage.getItem(`${props.uuid}`);
		return item ? JSON.parse(item) : false;
	});
	useEffect(() => {
		sessionStorage.setItem(`${props.uuid}`, JSON.stringify(alreadyClicked));
	}, [alreadyClicked]);

	function likePostButton(event: React.MouseEvent<HTMLButtonElement>) {
		likePost(props.uuid);
		setAlreadyClicked((prevVal: boolean) => !prevVal);
	}
	async function replyToPost(event: any) {
		event.preventDefault();
		const {data, error} = await supabase.from('replies').insert([
			{
				reply: props.uuid,
				content: replyText,
				uuid: nanoid(),
				author: user.displayName,
				likes: 0,
				profilePic: user.profilePic,
			},
		]);
		setReplyText('');
		textAreaToggle();
		props.fetchPosts();
		props.fetchReplies();
		console.error(error);
	}
	async function likePost(uuid: string) {
		if (alreadyClicked == false) {
			const {error} = await supabase.rpc('vote_replies', {
				quote_id: uuid,
				increment_num: 1,
			});
			props.fetchReplies();
			if (error) console.error(error);
		} else {
			const {error} = await supabase.rpc('vote_replies', {
				quote_id: uuid,
				increment_num: -1,
			});
			props.fetchReplies();
			if (error) console.error(error);
		}
	}
	function textAreaToggle() {
		setShowTextArea((prevVal: boolean) => !prevVal);
	}
	return (
		<div className="flex flex-col justify-center">
			<div
				className="grid	grid-cols-3	md:max-h-96	lg:px-16 md:w-[40rem] md:mx-4	rounded-md border-solid border shadow-md dark:shadow-white/70 bg-white text-black dark:bg-black dark:text-white"
				id={props.uuid}
			>
				<div className="flex pl-4 pt-2 items-center justify-start col-start-1 md:col-start-1 col-span-3 row-start-1 row-span-1 flex-row">
					<img
						className=" items-center rounded-full h-10 md:h-12 lg:h-14"
						src={props.profilePic}
					/>
					<h2 className="col-span-2 pl-3 md:text-3xl font-semibold">
						{props.author}
					</h2>
				</div>
				<p className="row-start-2 row-span-2 p-2 col-start-1 pl-3 col-span-3 text-left flex font-medium text-xl md:font-light md:text-2xl lg:font-light lg:text-3xl">
					{props.content}
				</p>
				<div
					id={props.uuid}
					className="row-start-4 col-span-3 flex place-content-evenly pb-1 items-center col-start-1"
				>
					<button
						onClick={likePostButton}
						className="flex flex-row uppercase rounded-md p-2 text-sm font-semibold items-center text-black md:text-xl lg:text-2xl bg-white hover:scale-110 dark:bg-black dark:text-white gap-2"
					>
						{' '}
						{props.likes}
						{alreadyClicked ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14 stroke-red-500 fill-red-500"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14 fill-none stroke-current"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						)}
						Like
					</button>

					<button
						onClick={() => textAreaToggle()}
						className="flex flex-row uppercase rounded-md p-2 text-sm font-semibold items-center text-black md:text-xl lg:text-2xl bg-white dark:bg-black hover:animate-pulse dark:text-white gap-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1}
							stroke="currentColor"
							className="w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
							/>
						</svg>
						Reply
					</button>
				</div>
			</div>
			{showTextArea ? (
				<div className="flex col-span-3 pb-3">
					<h1>Reply:</h1>
					<textarea
						className=" md:w-1/2 w-5/6 m-1 rounded-md scroll-m-1 dark:bg-black dark:border-white border dark:text-white text-black"
						value={replyText}
						onChange={event => setReplyText(event.target.value)}
					/>
					<button
						onClick={() => replyToPost(event)}
						className="flex flex-row uppercase rounded-md p-2 text-sm font-semibold items-center text-black md:text-xl lg:text-2xl bg-white dark:bg-black hover:animate-pulse dark:text-white gap-2"
					>
						Submit
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
