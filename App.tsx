import {useEffect, useState, createContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {post, replies} from './src/Components/Interfaces';
import Header from './src/Components/Header'
import Footer from './src/Components/Footer'
import Timeline from './src/Components/Timeline';
import SignIn from './src/Auth/SignIn';
import { supabase } from './supabaseClient';

export const Context = createContext<any>([]);

export default function App() {
	const [post, setPost] = useState<post[]>([]);
	const [replies, setReplies] = useState<replies[]>([]);
	const [postsArray, setPostsArray] = useState<any[]>([]);
	const [repliesArray, setRepliesArray] = useState<any[]>([]);
	const [postText, setPostText] = useState('');
	const [replyText, setReplyText] = useState('');
	
	async function fetchPosts() {
		let {data, error} = await supabase
			.from('posts')
			.select('*')
			.order('timestamp', {ascending: false});
		if (data) {
			setPostsArray(data);
		} else {
			error;
			console.error(error)
		}
	}
		async function fetchReplies() {
		let {data, error} = await supabase
			.from('replies')
			.select('*')
			.order('likes', {ascending: false});
		if (data) {
			setRepliesArray(data);
		} else {
			error
			console.error(error);
			
	}
}
	function renderReplies(){
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
	}
	useEffect(() =>{
		fetchPosts()
		renderReplies()
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
				renderReplies,
			}}
		>
			<Header displayName={''} profilePic={''} email={''} uuid={''} />
			<Routes>
				<Route path="/" element={<SignIn/>}></Route>
				<Route path="/timeline" element={<Timeline/>}></Route>
			</Routes>
		</Context.Provider>
	);
}