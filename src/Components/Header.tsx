import React, {useContext, useEffect} from 'react';
import {Link, Path} from 'react-router-dom';
import {userInfo} from './Interfaces';
import {Context} from '../App';
import {supabase} from '../supabaseClient';
import SignOutUser from '../Auth/SignOutUser';

export default function Header(props: userInfo) {
	const {user, setUser} = useContext(Context);

	return (
		<div
			className="navbar 
		md:w-full
		w-fill
		bg-base-100
		dark:bg-black
		dark:text-white
		sticky
		top-0 
		drop-shadow-md"
		>
			<div className="flex-1">
				<Link to="/Timeline">
					<p className="btn btn-ghost uppercase text-lg md:text-2xl lg:text-4xl">
						subforuma
					</p>
				</Link>
			</div>
			<div className="">
				<div className="flex-none gap-2">
					<div className="form-control">
						<input
							type="text"
							placeholder="Search"
							className="input mx-1 md:mx-9 lg:mx-14 input-bordered"
						/>
					</div>
				</div>
				<div className="dropdown dark:bg-black dark:text-white text-black dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							{user !== null || undefined ? (
								<img src={user.profilePic} />
							) : (
								<Link to="/">
									<p className="btn btn-ghost uppercase text-2xl">Sign In</p>
								</Link>
							)}
						</div>
					</label>
					<ul
						tabIndex={0}
						className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 dark:bg-black rounded-box w-52"
					>
						<li>
							<p className="justify-between">
								Profile
								<span className="badge">New</span>
							</p>
						</li>
						<li>
							<p>Settings</p>
						</li>
						<li>
							<SignOutUser />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
