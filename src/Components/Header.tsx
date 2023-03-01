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
				<Link to="/timeline">
					<p className="btn btn-ghost uppercase text-xl md:text-3xl lg:text-5xl">
						subforuma
					</p>
				</Link>
			</div>
			{user !== null ? (
				<div className="">
					<div className="flex-none md:block hidden gap-2">
						<div className=" form-control">
							<input
								type="text"
								placeholder="Search"
								className="input md:mx-9 lg:mx-14 dark:bg-black dark:text-white dark:border-white border text-black  input-bordered"
							/>
						</div>
					</div>

					<div className="dropdown dark:bg-black dark:text-white text-black dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img src={user.profilePic} />
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
			) : (
				<Link to="/">Sign In</Link>
			)}
		</div>
	);
}
