import {supabase} from '../../supabaseClient';
import {Context} from '../../App';
import {useContext} from 'react';
import {Link} from 'react-router-dom';
export default function SignOutUser() {
	const {user, setUser} = useContext(Context);
	async function signOutActiveUser() {
		// Sign out of Supabase.
		if (user !== null || undefined) {
			const {error} = await supabase.auth.signOut();
			console.log('logged out');
			setUser({displayName: '', profilePic: '', uid: '', email: ''});
		} else {
			console.log('No one is signed in!');
		}
	}
	return (
		<button
			onClick={signOutActiveUser}
			type="button"
			className="p-3 rounded-md dark:bg-black dark:text-white text-black bg-white uppercase"
		>
			<Link to="/">Log Out</Link>
		</button>
	);
}
