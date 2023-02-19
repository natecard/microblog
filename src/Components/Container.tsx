import React, { useContext } from 'react';

import { microblog, user } from './Interfaces';
import { Context, db } from '../App';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import MicroBlog from './MicroBlog';
export default function Container(props: user) {
  const { username, setUsername } = useContext(Context);
  const userRef = collection(db, `cases/${username.uid}`);
  addDoc(userRef, { message: 'New post about such and such' });

  onSnapshot(userRef, (snapshot) => {
    const microblogs = snapshot.docs.map((d) => d.data());
    const uiList = microblogs.map((microblog) => {
      return <MicroBlog microblog={microblog} />;
    });
  });

  return <div></div>;
}
