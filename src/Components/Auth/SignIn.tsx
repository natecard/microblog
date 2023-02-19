import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithRedirect,
  linkWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { useContext } from 'react';
import { Context } from '../../App';
import { MicroBlogger, auth } from '../../App';
import { user } from '../Interfaces';

export default function SignIn(props: user) {
  const { user, setUser } = useContext(Context);
  const provider = new GoogleAuthProvider();
  const googleSignIn = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, provider)
      .then(() => {
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  // linkWithRedirect(auth.currentUser, provider)
  //   .then(() => {
  //     setUser(auth.currentUser);
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

  getRedirectResult(auth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        // Accounts successfully linked.
        setUser(result.user);
        // ...
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  const anonSignIn = (e) => {
    e.preventDefault();
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      setUser(user.uid);
      console.log(user.photoURL);
    } else {
      //User is signed out
    }
  });
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
  }

  return (
    <div>
      <form action="">
        <input type="text" name="displayName" id="" value={user.displayName} />
        <button onClick={(e) => anonSignIn(e)} className="btn-primary">
          Sign In As Guest
        </button>{' '}
        <button onClick={(e) => googleSignIn(e)} className="btn-primary">
          Sign In With Google
        </button>{' '}
      </form>
    </div>
  );
}
