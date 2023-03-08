import {useEffect, useState, createContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {post} from './src/Components/Interfaces';
import Header from './src/Components/Header'
import Footer from './src/Components/Footer'
import Timeline from './src/Components/Timeline';
import SignIn from './src/Auth/SignIn';
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
				<Route path="/" element={<SignIn/>}></Route>
				<Route path="/timeline" element={<Timeline/>}></Route>
			</Routes>
		</Context.Provider>
	);
}
