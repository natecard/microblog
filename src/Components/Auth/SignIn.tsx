import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithRedirect,
} from 'firebase/auth';
import { useContext } from 'react';
import { Context } from '../../App';
import { auth } from '../../firebase';
// import { userInfo } from '../Interfaces';

export function SignIn() {
  const { user, setUser } = useContext(Context);
  const provider = new GoogleAuthProvider();
  const googleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signInWithRedirect(auth, provider)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const anonSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in!
      const uid = user.uid;
    }
    console.log(user);
  });
  setUser(auth.currentUser);
  return (
    <div>
      <button onClick={googleSignIn} type="button" className="btn normal-case">
        Sign In With Google
      </button>
      <button onClick={anonSignIn} type="button" className="btn normal-case">
        Sign In With Google
      </button>
    </div>
  );
}