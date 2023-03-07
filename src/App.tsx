import React, {useEffect, useState, createContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {supabase} from './supabaseClient';
import SignIn from './Auth/SignIn';
import {post, userInfo} from './Components/Interfaces';
import Header from './Components/Header';
import SignOutButton from './Auth/SignOutUser';
import Timeline from './Components/Timeline';
import Footer from './Components/Footer';

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
			}}
		>
			<Header displayName={''} profilePic={''} email={''} />
			<Routes>
				<Route path="/microblog/" element={<SignIn />}></Route>
				<Route path="/microblog/home" element={<SignIn />}></Route>
				<Route path="/microblog/timeline" element={<Timeline />}></Route>
			</Routes>
			<Footer />
		</Context.Provider>
	);
}
