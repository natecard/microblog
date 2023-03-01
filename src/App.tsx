import React, {useEffect, useState, createContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {supabase} from './supabaseClient';
import SignIn from './Auth/SignIn';
import {post, userInfo} from './Components/Interfaces';
import Header from './Components/Header';
import SignOutButton from './Auth/SignOutUser';
import Timeline from './Components/Timeline';
import Landing from './Auth/SignIn';
import Footer from './Components/Footer';

export const Context = createContext<any>([]);

export default function App() {
	const [post, setPost] = useState<post[]>([]);
	const [content, setContent] = useState('');
	const [sessionInfo, setSessionInfo] = useState<any>([]);
	const [postsArray, setPostsArray] = useState<any[]>([]);
	const [postText, setPostText] = useState('');
	const [showTextArea, setShowTextArea] = useState(false);
	const [replyText, setReplyText] = useState('');

	const [user, setUser] = useState(
		() =>
			JSON.parse(sessionStorage.getItem('user')) || [
				{
					name: '',
					email: '',
					profilePic: '',
				},
			]
	);
	useEffect(() => {
		sessionStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	function textAreaToggle(uuid: string) {
		// uuid: string, event: any
		// find the closest div element with data-uuid attribute
		// const element = event.currentTarget.closest('div');
		// if (post.uuid === element.uuid)
		// check if div exists and uuid matches
		console.log(uuid);
		setShowTextArea((prevVal: boolean) => !prevVal);
	}
	return (
		<Context.Provider
			value={{
				user,
				setUser,
				postsArray,
				setPostsArray,
				post,
				setPost,
				postText,
				setPostText,
				sessionInfo,
				setSessionInfo,
				textAreaToggle,
				showTextArea,
				setShowTextArea,
			}}
		>
			<Header displayName={''} uuid={''} profilePic={''} email={''} />
			<Routes>
				<Route path="/" element={<SignIn />}></Route>
				<Route path="/home" element={<SignIn />}></Route>
				<Route path="/timeline" element={<Timeline />}></Route>
			</Routes>
			<Footer />
		</Context.Provider>
	);
}
