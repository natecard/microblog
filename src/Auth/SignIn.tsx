import React, { useContext, useEffect } from 'react';
import { AuthUi, authTheme, supabase } from '../supabaseClient';
import SignOutUser from './SignOutUser';
import { Context } from '../App';

export default function SignIn() {
  const { user, sessionInfo, setUser, setSessionInfo } = useContext(Context);
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') console.log(session);
  });

  useEffect(() => {
    fetchUserData();
  }, []);
  async function fetchUserData() {
    try {
      const data = await supabase.auth.getUser();
      const {
        data: {
          user: {
            user_metadata: { picture, name, sub, email },
          },
        },
      } = data;
      setUser({
        displayName: name,
        profilePic: picture,
        uid: sub,
        email: email,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      {user.displayName == (undefined || null) ? (
        <div>
          <AuthUi
            supabaseClient={supabase}
            appearance={authTheme}
            providers={['google']}
            magicLink={true}
          />
          <SignOutUser />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
