import React from "react";

import { MainPage } from "./main-page";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyBaznSoNj7LuOZnaVTtxcj9r896M_4eEY0",
  authDomain: "bananaboats-7a42b.firebaseapp.com",
  projectId: "bananaboats-7a42b",
  storageBucket: "bananaboats-7a42b.appspot.com",
  messagingSenderId: "613212672185",
  appId: "1:613212672185:web:34dc7058fc37fdb3040b68",
  measurementId: "G-4Q4K5JSHE0",
};

// Initialize Firebase if not exists
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();

function SignInButton() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
}

function SignOutButton() {
  return (
    <Button variant="contained" color="primary" onClick={() => auth.signOut()}>
      Sign Out
    </Button>
  );
}

function App() {
  const [user, loading] = useAuthState(auth);

  // Loading
  if (loading) {
    return (
      <div className="App">
        <CssBaseline />
        <div className="LoadingScreen">
          <CircularProgress />
        </div>
      </div>
    );
  }

  // User is logged in
  if (user) {
    return (
      <div className="App">
        <CssBaseline />
        <div>
          <p>UId: {user.uid}</p>
        </div>

        <SignOutButton />
        <hr />
        <MainPage firebase={firebase} />
      </div>
    );
  }

  // User is not logged in
  return (
    <div className="App">
      <CssBaseline />
      <SignInButton />
      <p>This is where the Landing page will go :)</p>
    </div>
  );
}

export default App;
