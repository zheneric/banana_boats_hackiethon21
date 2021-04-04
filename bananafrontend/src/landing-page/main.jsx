import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { AppBar, Collapse } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import example_cal from "./img/example_cal2.png";
import timeit_brand from "./img/timeit_logo.png";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaznSoNj7LuOZnaVTtxcj9r896M_4eEY0",
  authDomain: "bananaboats-7a42b.firebaseapp.com",
  projectId: "bananaboats-7a42b",
  storageBucket: "bananaboats-7a42b.appspot.com",
  messagingSenderId: "613212672185",
  appId: "1:613212672185:web:34dc7058fc37fdb3040b68",
  measurementId: "G-4Q4K5JSHE0",
};

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

// Initialize Firebase if not exists
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Poppins",
    margin: "0 auto",
  },
  homePageRoot: {
    backgroundColor: "#091232",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    display: "flex",
    paddingLeft: "6rem",
    paddingRight: "6rem",
  },
  appbar: {
    background: "none",
    backgroundColor: "#091232",
    paddingLeft: "6rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  mainText: {
    color: "#FFF",
    fontSize: "4rem",
    flexGrow: "1",
    textAlign: "left",
  },
  demoPageRoot: {
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    marginTop: "2rem",
    paddingLeft: "6rem",
    paddingRight: "6rem",
    backgroundColor: "#FFF",
  },
  demoVideo: {
    textAlign: "center",
  },
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    width: "100%",
    height: "100%",
  },
  brand_logo: {
    display: "flex",
    alignItems: "center",
    width: "10%",
    height: "10%",
  },
}));

export function LandingPage() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.homePageRoot}>
        <AppBar className={classes.appbar} elevation={0}>
          <img className={classes.brand_logo} src={timeit_brand} alt="Logo" />
        </AppBar>

        <Collapse
          in={checked}
          {...(checked ? { timeout: 1500 } : {})}
          collapsedHeight={50}
        >
          <div>
            <Grid className={classes.column} container spacing={6}>
              <Grid item xs={6}>
                <h1 className={classes.mainText}>
                  Unlock your calendar's full potential today.
                </h1>
                <br></br>
                <SignInButton />
              </Grid>
              <Grid item xs={6}>
                <img
                  className={classes.image}
                  src={example_cal}
                  alt="Example"
                />
              </Grid>
            </Grid>
          </div>
        </Collapse>
      </div>
      <div className={classes.demoPageRoot}>
        <h1 style={({ color: "#000" }, { textAlign: "left" })}>
          The simple, easy and fun way to get stuff done.
        </h1>
        <h1>Put a video/image here ?</h1>
        <SignInButton />
      </div>
    </div>
  );
}
