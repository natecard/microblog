import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function signOutUser() {
  async function signOutActiveUser() {
    // Sign out of Firebase.
    signOut(auth);
  }
  return (
    <button
      onClick={signOutActiveUser}
      type="button"
      className="btn normal-case"
    >
      Sign Out
    </button>
  );
}
