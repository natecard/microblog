import {useEffect, useState, createContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {post} from './src/Components/Interfaces';
import Header from './src/Components/Header'
import Footer from './src/Components/Footer'
import Timeline from './src/Components/Timeline';
import SignIn from './src/Auth/SignIn';
import { supabase } from './supabaseClient';

export const Context = createContext<any>([]);

export default function App() {
	const [post, setPost] = useState<post[]>([]);
	const [replies, setReplies] = useState<post[]>([]);
	const [postsArray, setPostsArray] = useState<any[]>([]);
	const [repliesArray, setRepliesArray] = useState<any[]>([]);
	const [postText, setPostText] = useState('');
	const [replyText, setReplyText] = useState('');
	const [user, setUser] = useState(() => {
		const item = sessionStorage.getItem('user');
		return item ? JSON.parse(item) : [{name: '', email: '', profilePic: ''}];
	});
	useEffect(() => {
		sessionStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	async function fetchReplies() {
		let {data: replies, error} = await supabase
			.from('replies')
			.select('*')
			.order('likes', {ascending: false});
		if (replies) {
			setRepliesArray(
				replies.map(item => {
					return {
						author: item.author,
						uuid: item.uuid,
						profilePic: item.profilePic,
						content: item.content,
						likes: item.likes,
						timestamp: item.timestamp,
						repliedTo: item.replied_to,
					};
				})
			);
		} else {
			error;
			console.error(error);
		}
	}
	async function fetchPosts() {
		const {data, error} = await supabase
			.from('posts')
			.select('*')
			.order('timestamp', {ascending: false});
		if (data) {
			setPostsArray(data);
		}
	}
	useEffect(() =>{
		fetchPosts()
		fetchReplies()
	},[])
	
	return (
		<Context.Provider
			value={{
				user,
				setUser,
				postsArray,
				setPostsArray,
				repliesArray,
				setRepliesArray,
				post,
				setPost,
				postText,
				setPostText,
				replies,
				setReplies,
				replyText,
				setReplyText,
				fetchPosts,
				fetchReplies,
			}}
		>
			<Header displayName={''} profilePic={''} email={''} />
			<Routes>
				<Route path="/" element={<SignIn/>}></Route>
				<Route path="/timeline" element={<Timeline/>}></Route>
			</Routes>
		</Context.Provider>
	);
}
