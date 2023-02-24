import { supabase } from '../supabaseClient';
import { Context } from '../App';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
export default function SignOutUser() {
  const { user } = useContext(Context);
  async function signOutActiveUser() {
    // Sign out of Supabase.
    if (user !== null) {
      const { error } = await supabase.auth.signOut();
      console.log('logged out');
    } else {
      console.log('No one is signed in!');
    }
  }
  return (
    <button
      onClick={signOutActiveUser}
      type="button"
      className="btn normal-case"
    >
      <Link to="/Home"> Sign Out</Link>
    </button>
  );
}
