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
          <a className="btn btn-ghost uppercase text-2xl">subforuma</a>
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
                  <a className="btn btn-ghost uppercase text-2xl">Sign In</a>
                </Link>
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={() => supabase.auth.signOut()}>
              <Link to="/">
                <a>Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
