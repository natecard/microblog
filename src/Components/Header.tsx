import React, { useContext, useEffect } from 'react';
import { Link, Path } from 'react-router-dom';
import { userInfo } from './Interfaces';
import { Context } from '../App';
import { supabase } from '../supabaseClient';
import SignOutUser from '../Auth/SignOutUser';

export default function Header(props: userInfo) {
  const { user, setUser } = useContext(Context);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/Timeline">
          <p className="btn btn-ghost uppercase text-2xl">subforuma</p>
        </Link>
        {user.displayName !== undefined ? (
          <h1>{`Hi, ${user.displayName}`}</h1>
        ) : (
          <></>
        )}
      </div>

      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>

        <div className="dropdown dropdown-end">
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
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
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
            <li onClick={() => supabase.auth.signOut()}>
              <Link to="/">
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
