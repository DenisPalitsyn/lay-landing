import React from "react";
import { initializeApp } from "firebase/app";
import Dashboard from "./dashboard";
import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./signIn";
import {getAuth} from "firebase/auth";
import {CssBaseline} from "@mui/material";

const firebaseConfig = {
    apiKey: "AIzaSyBEydYkY5flVQV3Kje2m2sm30pJfkjQ6I4",
    authDomain: "lay-landing-d1882.firebaseapp.com",
    projectId: "lay-landing-d1882",
    storageBucket: "lay-landing-d1882.appspot.com",
    messagingSenderId: "755164148606",
    appId: "1:755164148606:web:0763d2a24a2b3f011cb92f"
};

initializeApp(firebaseConfig);

function App() {
    return (
        <>
            <CssBaseline />
            <Routes>
                <Route exact path="/" element={<SignIn/>}/>
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                }/>
                <Route
                    path="*"
                    element={
                        <main style={{padding: "1rem"}}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </>
    );
}

export default App;

const PrivateRoute = ({children}) => getAuth().currentUser ? children : <Navigate to="/"/>;