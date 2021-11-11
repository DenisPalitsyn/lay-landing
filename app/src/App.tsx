import React, {useState} from 'react';

import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, addDoc, collection } from "firebase/firestore";
import Landing from "./pages/landing";

const firebaseConfig = {
  apiKey: "AIzaSyBEydYkY5flVQV3Kje2m2sm30pJfkjQ6I4",
  authDomain: "lay-landing-d1882.firebaseapp.com",
  projectId: "lay-landing-d1882",
  storageBucket: "lay-landing-d1882.appspot.com",
  messagingSenderId: "755164148606",
  appId: "1:755164148606:web:0763d2a24a2b3f011cb92f"
};

const app = initializeApp(firebaseConfig);

export type StatusType = '' | 'error' | 'loading' | 'success';

function App() {
  const firestore = getFirestore();
  const functions = getFunctions(app);
  const sendByEmail = httpsCallable(functions, 'sendByEmail');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<StatusType>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  }

  const resetStatus = () => {
    setStatus('');
  }

  const onSubmit = async () => {
    if (!email) {
      return;
    }
    setStatus('loading');

    const usersCollection = collection(firestore, 'users');

    try {
      await addDoc(usersCollection,{
        email,
        date: new Date().getTime()
      });
      await sendByEmail({email});
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <Landing
        onSubmit={onSubmit}
        email={email}
        onChange={onChange}
        status={status}
        resetStatus={resetStatus}
      />
    </>
  );
}

export default App;
