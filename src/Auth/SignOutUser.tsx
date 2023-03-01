import {supabase} from '../supabaseClient';
import {Context} from '../App';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
export default function SignOutUser() {
	const {user, setUser} = useContext(Context);
	async function signOutActiveUser() {
		// Sign out of Supabase.
		if (user !== null || undefined) {
			console.log('logged out');
			sessionStorage.clear();
			console.log('sessionStorage cleared');
			localStorage.removeItem('user');
			const {error} = await supabase.auth.signOut();
		} else {
			console.log('No one is signed in!');
		}
	}
	return (
		<button
			onClick={signOutActiveUser}
			type="button"
			className="btn dark:bg-black dark:text-white text-black bg-white normal-case"
		>
			<Link to="/">Log Out</Link>
		</button>
	);
}
