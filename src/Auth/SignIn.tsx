import {useContext, useEffect} from 'react';
import {AuthUi, supabase} from '../../supabaseClient';
import {Context} from '../../App';
import {useNavigate} from 'react-router-dom';
import Footer from '../Components/Footer';

export default function SignIn() {
	const {user, setUser} = useContext(Context);
	let navigate = useNavigate();
	supabase.auth.onAuthStateChange((event, session) => {
		if (event == 'SIGNED_IN') {
			// console.log(session);
			navigate('/timeline');
		} else {
			navigate('/');
		}
	});

	async function fetchUserData() {
		const {data, error} = await supabase.auth.getUser();
		if (data && data.user && data.user.user_metadata) {
			const {
				user: {
					user_metadata: {picture, name, sub, email},
				},
			} = data;
			console.log(data);
			setUser({
				displayName: name,
				profilePic: picture,
				uid: sub,
				email: email,
			});
		} else {
			error;
			console.error(error);
		}
	}
	useEffect(() => {
		fetchUserData();
	}, [user]);
	useEffect(() => {
		fetchUserData();
	},[]);

	return (
		<div className=" dark:text-white p-8 md:px-36 md:py-12 lg:px-72 lg:py-40 xl:px-96 xl:py-72  min-h-screen dark:bg-black">
			<p className='text-xl'>If you don't want to create an account you can click on the Subforuma
				header to view the timeline</p>
			<h1 className="text-2xl pb-5">Welcome to Subforuma</h1>
			<p className="md:text-base">
				The microblogging site that lets you share your musings, ideas, and
				personal thoughts with a community of like-minded people. Subforuma is
				more than just a social network - it's a platform for content creation
				and expression.
			</p>
			
			<p className="text-xl py-5">With Subforuma, you can:</p>
			<ul className="list-outside md:text-base list-disc">
				<li>
					Write short posts without titles (known as microposts) that can
					include text, and in the future images, audio, or video.
				</li>
				<li>
					What makes Subforuma unique is that you see all the posts from other
					users in a single stream without any filters or algorithms.
				</li>
				<li>Engage with the entire audience through replies and likes.</li>
				<li>Subforuma is easy to use and accessible from any device.</li>
			</ul>
			<br />
			<p className="text-lg">
				Whether you want to share a quick tip, a funny story, or a deep insight,
				Subforuma is the place for you. Join today and start microblogging!{' '}
				<br />
			</p>
				
			{user.uid !== '' ? (
				<></>
			) : (
				<div className="pt-5 pb-32">
					<AuthUi
						supabaseClient={supabase}
						providers={['google']}
						magicLink={true}
					/>
				</div>
			)}
			<Footer/>
		</div>
	);
}
