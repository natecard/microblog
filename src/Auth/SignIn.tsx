import React, {useContext, useEffect} from 'react';
import {AuthUi, supabase} from '../supabaseClient';
import SignOutUser from './SignOutUser';
import {Context} from '../App';
import {useNavigate} from 'react-router-dom';

export default function SignIn() {
	const {user, setUser} = useContext(Context);
	let navigate = useNavigate();
	supabase.auth.onAuthStateChange((event, session) => {
		if (event == 'SIGNED_IN') {
			console.log(session);
			navigate('/timeline');
		} else {
			navigate('/home');
		}
	});

	useEffect(() => {
		async function fetchUserData() {
			try {
				const data = await supabase.auth.getUser();
				const {
					data: {
						user: {
							user_metadata: {picture, name, sub, email},
						},
					},
				} = data;
				setUser({
					displayName: name,
					profilePic: picture,
					uid: sub,
					email: email,
				});
			} catch (error) {
				console.error(error);
			}
		}
		fetchUserData();
		// navigate('/timeline');
	}, [user]);
	return (
		<div className="dark:text-white p-8 md:px-36 md:py-24 lg:px-72 lg:py-40 xl:px-96 xl:py-72 h-screen dark:bg-black">
			{user.displayName == (null || undefined) ? (
				<div>
					<AuthUi
						supabaseClient={supabase}
						providers={['google']}
						magicLink={true}
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
