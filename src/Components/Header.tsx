import {useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {userInfo} from './Interfaces';
import {Context} from '../../App';
import SignOutUser from '../Auth/SignOutUser';

export default function Header(props: userInfo) {
	const {user} = useContext(Context);

	return (
		<div
			className="
		navbar 
		min-w-fit
		bg-base-100
		dark:bg-black
		dark:text-white
		sticky
		top-0
		flex
		justify-items-stretch
		shadow-md
		dark:shadow-white/40"
		>
			<div className="flex-1">
				{location.pathname === '/' ? (
					<Link to="/timeline">
						<p className="btn btn-ghost uppercase text-xl md:text-3xl lg:text-5xl">
							subforuma
						</p>
					</Link>
				) : (
					<Link to="/">
						<p className="btn btn-ghost uppercase text-xl md:text-3xl lg:text-5xl">
							subforuma
						</p>
					</Link>
				)}
			</div>
			{user.uuid == '' ? (
				<Link to="/">
					<button className="p-3 box-content uppercase">Sign In</button>
				</Link>
			) : (
				<div className="flex flex-row">
					<div className="md:block hidden gap-2">
						<div>
							<input
								type="text"
								placeholder="Search"
								className="input md:mx-9 lg:mx-14 dark:bg-black dark:text-white dark:border-white border text-black  input-bordered"
							/>
						</div>
					</div>
					<div className="align-baseline flex flex-row dark:bg-black dark:text-white text-black">
						{user.uuid ? (
							<img
								alt="user profile picture"
								className="w-10 h-10 rounded-full"
								src={user.profilePic}
							/>
						) : (
							<Link to='/'>
							<button>
								Sign In
							</button>
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
