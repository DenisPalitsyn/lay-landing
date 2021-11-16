import React, {useEffect, useState} from 'react';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router";
import {Button} from "@mui/material";

const SignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const [unauth, setUauth] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        } else {
            onAuthStateChanged(auth, (userData) => {
                if (userData) {
                    setUser(true);
                } else {
                    setUauth(true);
                }
            });
        }
    }, [user, navigate, auth]);

    const signIn = async () => {
        await signInWithPopup(auth, provider);
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h1>Admin Lay-landing</h1>
            {unauth && <p>
                <Button variant="outlined" onClick={signIn}>Sign in</Button>
            </p>}
        </div>
    )
}

export default SignIn;